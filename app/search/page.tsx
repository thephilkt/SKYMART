import { SearchExperience } from "@/components/search-experience";
import { getCatalogData } from "@/lib/data/catalog";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q = "", category = "" } = await searchParams;
  const catalog = await getCatalogData();
  return <SearchExperience categories={catalog.categories} products={catalog.products} initialCategory={category} initialQuery={q} />;
}
