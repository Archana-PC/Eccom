// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminButton from "../../components/ui/AdminButton";
// import FormField from "../../components/form/FormField";
// import CheckboxField from "../../components/form/CheckboxField";
// import TextareaField from "../../components/form/TextareaField";
// import { useCreateCollectionMutation } from "../../services/catalog/adminCollectionApi";

// const CreateCollection = () => {
//   const navigate = useNavigate();
//   const [createCollection, { isLoading }] = useCreateCollectionMutation();

//   const [form, setForm] = useState({
//     name: "",
//     code: "",
//     description: "",
//     is_active: true,
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
//     setErrors((p) => ({ ...p, [name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const next = {};
//     if (!form.name.trim()) next.name = "Collection name is required";
//     if (Object.keys(next).length) return setErrors(next);

//     try {
//       await createCollection({
//         name: form.name.trim(),
//         code: form.code.trim() || "",
//         description: form.description.trim() || "",
//         is_active: !!form.is_active,
//       }).unwrap();

//       navigate("/admin/collections", { state: { created: true } });
//     } catch (err) {
//       const api = err?.data || {};
//       setErrors({
//         name: Array.isArray(api?.name) ? api.name[0] : "",
//         code: Array.isArray(api?.code) ? api.code[0] : "",
//         description: Array.isArray(api?.description) ? api.description[0] : "",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-5xl bg-white p-6 rounded-xl shadow space-y-6">
//       <h2 className="text-xl font-semibold">Create Collection</h2>

//       <FormField label="Name" name="name" value={form.name} onChange={handleChange} required error={errors.name} />
//       <FormField label="Code" name="code" value={form.code} onChange={handleChange} placeholder="Optional" error={errors.code} />
//       <TextareaField label="Description" name="description" value={form.description} onChange={handleChange} placeholder="Optional" error={errors.description} />

//       <CheckboxField label="Active" name="is_active" checked={form.is_active} onChange={handleChange} />

//       <div className="flex justify-end">
//         <AdminButton type="submit" disabled={isLoading}>
//           {isLoading ? "Saving..." : "Create Collection"}
//         </AdminButton>
//       </div>
//     </form>
//   );
// };

// export default CreateCollection;
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import { useCreateCollectionMutation } from "../../services/catalog/adminCollectionApi";
import CollectionForm from "./CollectionForm";

const CreateCollectionPage = () => {
  const navigate = useNavigate();

  const [createCollection, { isLoading, isError, error }] = useCreateCollectionMutation();

  const handleCreate = async (payload) => {
    try {
      await createCollection(payload).unwrap();
      navigate("/admin/collections", { state: { created: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Collection" />

      {/* ✅ Permission is mandatory */}
      <Permission action="add" entity="collection">
        <div className="max-w-2xl">
          <CollectionForm
            submitLabel="Create Collection"
            loading={isLoading}
            apiError={isError ? error : null}
            onSubmit={handleCreate}
            onCancel={() => navigate(-1)}
          />
        </div>
      </Permission>
    </div>
  );
};

export default CreateCollectionPage;
