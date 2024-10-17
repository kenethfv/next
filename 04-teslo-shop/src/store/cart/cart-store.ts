import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotatlItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods

      getTotatlItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.price * product.quantity + subTotal,
          0
        );

        const tax = subTotal * 0.12;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        console.log(cart);

        // 1. REvisar si el producto existe en el carrito con la talla seleccionada
        const poductInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!poductInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Si el producto existe, actualizar la cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity(product: CartProduct, quantity: number) {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct(product: CartProduct) {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
