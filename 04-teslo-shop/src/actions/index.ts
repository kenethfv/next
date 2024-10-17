// Importa las acciones de autenticación
import { authenticate, login } from "./auth/signIn";
import { logOut } from "./auth/signOut";
import { registerUser } from "./auth/register";

// Importa los otros módulos de productos
import { getProductBySlug } from "./product/get-product-by-slug";
import { getPaginatedProductsWithImages } from "./product/product-pagination";
import { getStockBySlug } from "./product/get-stock-by-slug";

import { getCountries } from "./country/getCountries";

import { setUserAddress } from "./address/set-user-address";
import { deleteUserAddress } from "./address/delete-user-address";
import { getUserAddress } from "./address/get-user-address";



// Exporta explícitamente cada función
export { setUserAddress, deleteUserAddress, getUserAddress };
export { getCountries };
export { authenticate, login, logOut, registerUser };
export { getProductBySlug, getPaginatedProductsWithImages, getStockBySlug };
