import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border-2
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500'}
            focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-colors duration-150
            disabled:bg-slate-50 disabled:cursor-not-allowed
            resize-none
            ${className}
          `}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
