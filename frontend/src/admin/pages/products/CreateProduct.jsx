import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";

import ProductForm from "./ProductForm";


import {
  useGetFabricsQuery,
  useGetMaterialsQuery,
  useGetStylesQuery,
} from "../../services/catalog/adminAttributesApi";
import { useGetCollectionsQuery } from "../../services/catalog/adminCollectionApi";

import { useCreateAdminProductMutation } from "../../services/catalog/catalogApi";
import { useGetAdminCategoriesQuery } from "../../services/catalog/adminCategoryApi";
import { PERMISSIONS } from "../../constants/permissions";

const normalize = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const CreateProductPage = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading: catLoading } = useGetAdminCategoriesQuery();
  const { data: fabrics, isLoading: fabLoading } = useGetFabricsQuery();
  const { data: materials, isLoading: matLoading } = useGetMaterialsQuery();
  const { data: styles, isLoading: styleLoading } = useGetStylesQuery();
  const { data: collections, isLoading: colLoading } = useGetCollectionsQuery();
  console.log("collections", collections);

  const [createProduct, { isLoading, isError, error }] =
    useCreateAdminProductMutation();

  const loading =
    isLoading || catLoading || fabLoading || matLoading || styleLoading || colLoading;

  const handleCreate = async (formData) => {
    try {
      await createProduct(formData).unwrap();
      navigate("/admin/products");
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Product" />

      <Permission 
      allow={PERMISSIONS.PRODUCT.ADD}
      action="add" entity="product">
        <div className="max-w-6xl">
          <ProductForm
            categories={normalize(categories)}
            fabrics={normalize(fabrics)}
            materials={normalize(materials)}
            styles={normalize(styles)}
            collections={normalize(collections)}
            submitLabel="Create Product"
            loading={loading}
            apiError={isError ? error : null}
            onSubmit={handleCreate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>
    </div>
  );
};

export default CreateProductPage;

