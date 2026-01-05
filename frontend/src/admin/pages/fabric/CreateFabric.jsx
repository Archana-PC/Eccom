import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import FabricForm from "./FabricForm";
import { useCreateFabricMutation } from "../../services/catalog/adminAttributesApi";

const CreateFabric = () => {
  const navigate = useNavigate();
  const [createFabric, { isLoading, isError, error }] = useCreateFabricMutation();

  const handleCreate = async (payload) => {
    try {
      await createFabric(payload).unwrap();
      navigate("/admin/fabrics", { state: { created: true } });
    } catch {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Fabric" />

      {/* ✅ Permission mandatory */}
      <Permission action="add" entity="fabric">
        <div className="max-w-2xl">
          <FabricForm
            mode="create"
            submitLabel="Create Fabric"
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

export default CreateFabric;
