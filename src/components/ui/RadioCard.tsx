import { InputHTMLAttributes, ReactNode } from 'react';

interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  icon?: ReactNode;
}

export function RadioCard({ label, description, icon, checked, className = '', ...props }: RadioCardProps) {
  return (
    <label
      className={`
        relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-150
        ${checked ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'}
        ${className}
      `}
    >
      <input
        type="radio"
        className="mt-1 w-5 h-5 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        checked={checked}
        {...props}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-600">{icon}</span>}
          <span className="font-semibold text-slate-900">{label}</span>
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
      </div>
    </label>
  );
}
