import React from 'react';

interface InputSelectProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  description?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({ label, name, value, options, onChange, description }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
};

export default InputSelect;
