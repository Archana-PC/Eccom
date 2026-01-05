import { useParams } from "react-router-dom";
import ProductGrid from "../components/ui/ProductCard/ProductGrid";
import { useGetProductsByStyleSlugQuery } from "../services/catalog/catalogApi";
export default function StyleProducts() {
  const { slug } = useParams();
  const { data, isLoading } = useGetProductsByStyleSlugQuery(slug);

  // if paginated: data.results, else data
  const products = data?.results ?? data ?? [];

  return (
    <div className="min-h-screen bg-neutral-50">
      <ProductGrid title="STYLE PRODUCTS" products={products} loading={isLoading} />
    </div>
  );
}
