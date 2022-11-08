import { useField } from "formik";
import React, { useId, useMemo } from "react";

interface FormikTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export const FormikTextField: React.FC<FormikTextFieldProps> = ({ label, ...props }) => {
  const reactInputId = useId();
  const inputId = useMemo(() => props.id || reactInputId, [props.id, reactInputId]);
  const [field, meta] = useField(props);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {props.required && " *"}
        </label>
      )}

      <input
        {...field}
        {...props}
        id={inputId}
        className="mt-1 w-full rounded border border-gray-400 bg-transparent px-2 py-1 shadow-sm transition-colors focus:border-gray-300 focus:outline-none focus:ring-0 sm:text-sm"
      />

      {meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};
