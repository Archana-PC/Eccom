import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import AdminButton from "../../components/ui/AdminButton";

import ProductForm from "./ProductForm";

// ✅ use by-id query (detail)
import {
  useGetAdminProductByIdQuery,
  useUpdateAdminProductMutation,
} from "../../services/catalog/catalogApi";

import {
  useGetFabricsQuery,
  useGetMaterialsQuery,
  useGetStylesQuery,
} from "../../services/catalog/adminAttributesApi";
import { useGetCollectionsQuery } from "../../services/catalog/adminCollectionApi";

// ✅ your existing sections (adjust paths if needed)
import VariantsSection from "./VariantsSection";
import ImagesSection from "./ImagesSection";
import { useGetAdminCategoriesQuery } from "../../services/catalog/adminCategoryApi";
import { PERMISSIONS } from "../../constants/permissions";
import { useGetApprovalByEntityQuery, useSubmitApprovalMutation } from "../../services/approvalApi";

const normalize = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ detail API call
  const { data: productRes, isLoading: prodLoading, isError: prodErr } =
    useGetAdminProductByIdQuery(id, { skip: !id });

  // ✅ if API returns {data: {...}} handle it
  const product = productRes?.data ?? productRes;
  const productId = product?.id || id;

  // ✅ approval status for this product
const { data: approvalRes, isFetching: approvalLoading } =
  useGetApprovalByEntityQuery(
    { entity_type: "product", entity_id: productId },
    { skip: !productId }
  );

const approval = approvalRes?.data ?? approvalRes ?? null;

// ✅ submit approval
const [submitApproval, { isLoading: submittingApproval }] =
  useSubmitApprovalMutation();

const onSubmitForApproval = async () => {
  try {
    await submitApproval({
      entity_type: "product",
      entity_id: productId,
      workflow_code: "PRODUCT_DEV", // ✅ your workflow.code in DB
    }).unwrap();
  } catch (e) {}
};


  const { data: categories, isLoading: catLoading } = useGetAdminCategoriesQuery();
  const { data: fabrics, isLoading: fabLoading } = useGetFabricsQuery();
  const { data: materials, isLoading: matLoading } = useGetMaterialsQuery();
  const { data: styles, isLoading: styleLoading } = useGetStylesQuery();
  const { data: collections, isLoading: colLoading } = useGetCollectionsQuery();

  const [updateProduct, { isLoading, isError, error }] =
    useUpdateAdminProductMutation();

  const loading =
    isLoading ||
    prodLoading ||
    catLoading ||
    fabLoading ||
    matLoading ||
    styleLoading ||
    colLoading;

  const handleUpdate = async (formData) => {
    try {
      await updateProduct({ id: productId, body: formData }).unwrap();
      navigate("/admin/products");
    } catch (e) {}
  };

  if (prodLoading) return <div className="p-4">Loading...</div>;
  if (prodErr || !productId) return <div className="p-4">Product not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <PageHeader title="Edit Product" />

        <div className="max-w-6xl">
  <div className="bg-white border rounded-xl p-5 flex items-start justify-between gap-4">
    <div>
      <div className="text-base font-semibold">Approval</div>

      {approvalLoading ? (
        <div className="text-sm text-gray-600 mt-1">Loading approval status...</div>
      ) : !approval ? (
        <div className="text-sm text-gray-600 mt-1">Draft (Not submitted yet)</div>
      ) : (
        <div className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Status:</span> {approval.status} &nbsp;•&nbsp;
          <span className="font-medium">Step:</span> {approval.step_name} &nbsp;•&nbsp;
          <span className="font-medium">Pending With:</span> {approval.required_role}
        </div>
      )}
    </div>

    {/* ✅ Show submit button only when not submitted */}
    {!approvalLoading && !approval && (
      <Permission allow={PERMISSIONS.PRODUCT.CHANGE}>
        <AdminButton onClick={onSubmitForApproval} disabled={submittingApproval}>
          {submittingApproval ? "Submitting..." : "Submit for Approval"}
        </AdminButton>
      </Permission>
    )}

    {/* ✅ If submitted, give quick link to approval detail page */}
    {!approvalLoading && approval && (
      <AdminButton
        variant="secondary"
        onClick={() => navigate(`/admin/approvals/${approval.id}`)}
      >
        View Approval
      </AdminButton>
    )}
  </div>
</div>


        {/* Optional quick actions */}
        <div className="flex gap-2">
          <AdminButton
            type="button"
            variant="outline"
            onClick={() =>
              document
                .getElementById("variants-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            + Add Variant
          </AdminButton>

          <AdminButton
            type="button"
            variant="outline"
            onClick={() =>
              document
                .getElementById("images-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            + Add Image
          </AdminButton>
        </div>
      </div>

      {/* ✅ Product Form */}
      <Permission 
      allow={PERMISSIONS.PRODUCT.CHANGE}
      action="change" entity="product">
        <div className="max-w-6xl">
          <ProductForm
            key={productId} // ✅ forces form to re-init if id changes
            categories={normalize(categories)}
            fabrics={normalize(fabrics)}
            materials={normalize(materials)}
            styles={normalize(styles)}
            collections={normalize(collections)}
            initialValues={product} // ✅ now previous data will fill
            submitLabel="Update Product"
            loading={loading}
            apiError={isError ? error : null}
            onSubmit={handleUpdate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>

      {/* ✅ Variants Section (edit-only) */}
      <div id="variants-section" className="max-w-6xl">
        <Permission 
        allow={PERMISSIONS.VARIANT.CHANGE}
        action="view" entity="productvariant">
          <VariantsSection productId={productId} />
        </Permission>
      </div>

      {/* ✅ Images Section (edit-only) */}
      <div id="images-section" className="max-w-6xl">
        <Permission 
        allow={PERMISSIONS.IM}
        action="view" entity="productimage">
          <ImagesSection productId={productId} />
        </Permission>
      </div>
    </div>
  );
};

export default EditProductPage;
