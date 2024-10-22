"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(50),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(2)),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => val.toFixed(0)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
    };
  }

  const product = productParsed.data;

  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  const prismaTrx = prisma.$transaction(async (tx) => {
    let product: Product;
    const tagsArray = rest.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());
    if (id) {
      product = await tx.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          inStock: parseInt(rest.inStock, 10),
          price: parseFloat(rest.price),
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });

      console.log({ product });
    } else {
      product = await tx.product.create({
        data: {
          ...rest,
          inStock: parseInt(rest.inStock, 10),
          price: parseFloat(rest.price),
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    }

    return { product };
  });

  return {
    ok: true,
  };
};
