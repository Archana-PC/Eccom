import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import { useCreateMaterialMutation } from "../../services/catalog/adminAttributesApi";
import MaterialForm from "./MaterialForm";

const CreateMaterial = () => {
  const navigate = useNavigate();
  const [createMaterial, { isLoading, isError, error }] = useCreateMaterialMutation();

  const handleCreate = async (payload) => {
    try {
      await createMaterial(payload).unwrap();
      navigate("/admin/materials", { state: { created: true } });
    } catch {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Material" />

      {/* ✅ Permission mandatory */}
      <Permission action="add" entity="material">
        <div className="max-w-2xl">
          <MaterialForm
            submitLabel="Create Material"
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

export default CreateMaterial;
