// const CheckboxField = ({ label, name, checked, onChange }) => (
//   <label className="flex items-center gap-2 text-sm">
//     <input type="checkbox" name={name} checked={checked} onChange={onChange} />
//     {label}
//   </label>
// );

// export default CheckboxField;
// components/form/CheckboxField.jsx
const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  hint,
  disabled = false,
}) => {
  return (
    <label
      className={[
        "group flex items-start gap-3 rounded-xl border p-3 transition select-none",
        disabled
          ? "opacity-60 cursor-not-allowed bg-gray-50"
          : "cursor-pointer hover:bg-gray-50",
        checked ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white",
      ].join(" ")}
    >
      <input
        type="checkbox"
        name={name}
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        className="mt-1 h-4 w-4 accent-indigo-600"
      />

      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        {hint ? <div className="text-xs text-gray-500 mt-0.5">{hint}</div> : null}
      </div>

      {checked ? (
        <span className="text-[11px] font-semibold text-indigo-700 bg-white border border-indigo-200 px-2 py-1 rounded-full">
          Selected
        </span>
      ) : null}
    </label>
  );
};

export default CheckboxField;
