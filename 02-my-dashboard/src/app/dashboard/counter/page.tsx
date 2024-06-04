import { CartCounter } from '@/shopping-cart/components';

export const metadata = {
 title: 'Shopping Cart',
 description: 'Counter Page',
};

export default function CounterPage() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos de Carrito</span>
      <CartCounter value={ 20 } />
      
    </div>
  );
}