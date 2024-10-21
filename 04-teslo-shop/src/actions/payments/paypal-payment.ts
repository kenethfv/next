"use server";

import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransactionId: string | undefined) => {
  console.log({ paypalTransactionId });
};
