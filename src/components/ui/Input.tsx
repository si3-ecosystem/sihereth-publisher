import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ label, type, name, value, onChange }: InputFieldProps) => (
  <div>
    <label htmlFor={name} className="block mb-1 text-xs font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="bg-gray-100 border border-gray-300 text-xs rounded-lg w-full p-2.5"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default InputField;
