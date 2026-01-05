import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import Permission from "../../components/ui/Permission";
import { useCreateStyleMutation } from "../../services/catalog/adminAttributesApi";
import StyleForm from "./StyleForm";

const CreateStyle = () => {
  const navigate = useNavigate();

  const [createStyle, { isLoading, isError, error }] = useCreateStyleMutation();

  const handleCreate = async (payload) => {
    try {
      await createStyle(payload).unwrap();
      navigate("/admin/styles", { state: { created: true } });
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Create Style" />

      {/* ✅ Permission mandatory */}
      <Permission action="add" entity="style">
        <div className="max-w-2xl">
          <StyleForm
            submitLabel="Create Style"
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

export default CreateStyle;
