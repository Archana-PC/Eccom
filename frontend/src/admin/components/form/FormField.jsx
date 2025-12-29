const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  error,
  autoComplete,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full border rounded-lg px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
