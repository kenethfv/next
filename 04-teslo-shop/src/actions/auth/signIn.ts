"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión",
    };
  }
};
