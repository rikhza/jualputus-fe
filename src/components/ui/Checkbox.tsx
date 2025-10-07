import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          ref={ref}
          className={`
            mt-1 w-5 h-5 rounded border-2 border-slate-300
            text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0
            transition-colors duration-150
            cursor-pointer
            ${className}
          `}
          {...props}
        />
        <span className="text-sm text-slate-700 group-hover:text-slate-900 select-none">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
