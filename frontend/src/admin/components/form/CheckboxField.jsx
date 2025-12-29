const CheckboxField = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    {label}
  </label>
);

export default CheckboxField;
