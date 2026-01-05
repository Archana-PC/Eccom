import React from "react";
const cx = (...c) => c.filter(Boolean).join(" ");

const PageHeader = ({
  title,
  subtitle = "",
  badge = "",
  actions,
  className = "",
  compact = true,      // ✅ default compact
  showDivider = false, // ✅ divider off by default (removes extra gap)
}) => {
  return (
    <div className={cx(compact ? "mb-2" : "mb-4", className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
              {title}
            </h1>

            {badge ? (
              <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
                {badge}
              </span>
            ) : null}
          </div>

          {subtitle ? (
            <p className="text-sm text-slate-600 leading-5">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {actions}
          </div>
        ) : null}
      </div>

      {showDivider ? <div className="mt-2 h-px bg-slate-200/80" /> : null}
    </div>
  );
};

export default PageHeader;
