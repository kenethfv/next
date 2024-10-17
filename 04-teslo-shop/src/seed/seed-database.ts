import { initialData } from "./seed";
import { countries } from './seed-countries'
import prisma from "../lib/prisma";

interface Abc {
  aasd: String;
}

async function main() {
  //Borrar registros de la base de datos
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  // Users
  await prisma.user.createMany({ data: users });

  // Countries
  await prisma.country.createMany({ data: countries });

  //Categorias
  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  //Productos

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); // ,string=shirt, strgin=category>

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLowerCase()],
      },
    });

    // Images
    const imagesdata = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({ data: imagesdata });
  });
  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
