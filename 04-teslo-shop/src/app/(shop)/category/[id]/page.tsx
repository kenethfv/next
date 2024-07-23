import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}



export default function CategoryPage({ params }: Props) {

  const { id } = params;
  const products = seedProducts.filter( product => product.gender === id )

  const labels: Record<Category, string> = {
    kid: 'para niños',
    women: 'para mujeres',
    men: 'para hombres',
    unisex: 'para todos'
  }

  // if ( id === 'kid' ) {
  //   notFound()
  // }

  return (
    <>
    <Title 
    title={ `Articulos de ${ labels[id] }` }
    subtitle="Todos los productos"
    classname="mb-2"
    />
    <ProductGrid 
      products={ products }
    />

    </>
  );
}