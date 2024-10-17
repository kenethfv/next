// Importa las acciones de autenticación
import { authenticate, login } from './auth/signIn';
import { logOut } from './auth/signOut';
import { registerUser } from './auth/register';

// Importa los otros módulos de productos
import { getProductBySlug } from './product/get-product-by-slug';
import { getPaginatedProductsWithImages } from './product/product-pagination';
import { getStockBySlug } from './product/get-stock-by-slug';

// Exporta explícitamente cada función
export { authenticate, login, logOut, registerUser };
export { getProductBySlug, getPaginatedProductsWithImages, getStockBySlug };
