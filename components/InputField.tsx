import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: 'text' | 'number';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, type = 'text', placeholder, onChange, description, required }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
};

export default InputField;
