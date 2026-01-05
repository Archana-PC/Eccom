import React, { useEffect, useState } from "react";
import CategoryRibbon from "./CategoryRibbon";
import { useLazyGetCategoriesQuery } from "../../../services/catalog/catalogApi";

const CategoryRibbonContainer = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const [trigger, { isFetching }] = useLazyGetCategoriesQuery();

  const loadPage = async (nextPage, reset = false) => {
    const res = await trigger({ page: nextPage, page_size: 10 }).unwrap();

    setItems((prev) => {
      const merged = reset ? res.results : [...prev, ...res.results];
      // remove duplicates by id/slug (safe)
      const map = new Map();
      merged.forEach((c) => map.set(c.id || c.slug, c));
      return Array.from(map.values());
    });

    setPage(nextPage);
    setHasNext(Boolean(res.next));
  };

  useEffect(() => {
    loadPage(1, true); // initial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CategoryRibbon
      categories={items}
      isPaging={isFetching}
      hasNextPage={hasNext}
      onLoadNextPage={() => loadPage(page + 1)}
    />
  );
};

export default CategoryRibbonContainer;
