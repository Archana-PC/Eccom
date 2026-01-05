import { useMemo, useState } from "react";
import SelectField from "./SelectField";

const cx = (...c) => c.filter(Boolean).join(" ");

const MultiSelectChipsField = ({
  label,
  options = [],              // [{value,label}]
  values = [],               // selected values array
  onChange,                  // (newValues) => void
  required,
  error,
  max = 999,
  addLabel = "Add",
  placeholder = "Select",
}) => {
  const [pick, setPick] = useState("");

  const optionMap = useMemo(() => {
    const m = new Map();
    options.forEach((o) => m.set(String(o.value), o.label));
    return m;
  }, [options]);

  const canAddMore = (values?.length || 0) < max;

  const add = () => {
    if (!pick) return;
    if (!canAddMore) return;

    const v = String(pick);
    const next = Array.from(new Set([...(values || []), v]));
    onChange(next);

    setPick("");
  };

  const remove = (val) => {
    const v = String(val);
    onChange((values || []).filter((x) => String(x) !== v));
  };

  // build dropdown options with placeholder at top
  const selectOptions = useMemo(() => {
    const base = [{ value: "", label: placeholder }];
    return base.concat(options);
  }, [options, placeholder]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <SelectField
            label={label}
            name={label}
            value={pick}
            onChange={(e) => setPick(e.target.value)}
            options={selectOptions}
            required={required}
            error={error}
          />
        </div>

        <button
          type="button"
          onClick={add}
          disabled={!pick || !canAddMore}
          className={cx(
            "h-10 px-4 rounded-lg border text-sm font-medium",
            (!pick || !canAddMore) ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"
          )}
        >
          {addLabel}
        </button>
      </div>

      {/* chips */}
      <div className="flex flex-wrap gap-2">
        {(values || []).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => remove(v)}
            className="text-sm px-3 py-1 rounded-full border bg-slate-50 hover:bg-slate-100"
            title="Remove"
          >
            {optionMap.get(String(v)) || v} ✕
          </button>
        ))}
      </div>

      {max !== 999 && (
        <p className="text-xs text-slate-500">
          Selected {values?.length || 0}/{max}
        </p>
      )}
    </div>
  );
};

export default MultiSelectChipsField;
