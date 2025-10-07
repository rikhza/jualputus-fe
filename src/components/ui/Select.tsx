import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helpText, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border-2
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500'}
            focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-colors duration-150
            disabled:bg-slate-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {helpText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
