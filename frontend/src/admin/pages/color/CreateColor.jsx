import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import { useCreateColorMutation } from "../../services/catalog/adminAttributesApi";
import ColorForm from "./ColorForm";

const CreateColor = () => {
  const navigate = useNavigate();

  const [createColor, { isLoading, isError, error }] = useCreateColorMutation();

  const handleCreate = async (payload) => {
    try {
      await createColor(payload).unwrap();
      navigate("/admin/colors", { state: { created: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Color" />

      {/* ✅ Permission mandatory */}
      <Permission action="add" entity="color">
        <div className="max-w-2xl">
          <ColorForm
            submitLabel="Create Color"
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

export default CreateColor;
