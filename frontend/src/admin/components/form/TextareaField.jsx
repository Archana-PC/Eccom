const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full border rounded-lg px-3 py-2 ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default TextareaField;
