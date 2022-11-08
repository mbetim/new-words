import { useField } from "formik";
import React, { useId, useMemo } from "react";

interface FormikSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string | React.ReactNode;
  name: string;
  options: { value: string; label: string; group?: string }[];
  classes?: {
    container?: string;
    select?: string;
  };
}

const CustomOptGroup: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  if (!!label) {
    return (
      <optgroup key={label} label={label}>
        {children}
      </optgroup>
    );
  }

  return <>{children}</>;
};

export const FormikSelect: React.FC<FormikSelectProps> = ({
  label,
  options,
  classes,
  ...props
}) => {
  const reactInputId = useId();
  const inputId = useMemo(() => props.id || reactInputId, [props.id, reactInputId]);
  const [field, meta] = useField(props);

  const optionsGroup = useMemo(() => {
    const optionsGroupMap: Record<string, { value: string; label: string }[]> = {};

    for (const option of options) {
      const optionGroupName = option.group || "";

      if (!optionsGroupMap[optionGroupName]) optionsGroupMap[optionGroupName] = [];

      optionsGroupMap[optionGroupName]?.push({ value: option.value, label: option.label });
    }

    return optionsGroupMap;
  }, [options]);

  return (
    <div className={classes?.container}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {props.required && " *"}
        </label>
      )}

      <select
        {...field}
        {...props}
        id={inputId}
        onChange={(e) => {
          field.onChange(e);
          props.onChange && props.onChange(e);
        }}
        className="mt-1 w-full rounded border border-gray-400 bg-transparent px-2 py-1 shadow-sm transition-colors focus:border-gray-300 focus:outline-none focus:ring-0 sm:text-sm"
      >
        {Object.entries(optionsGroup).map(([groupName, groups]) => (
          <CustomOptGroup key={groupName} label={groupName}>
            {groups.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomOptGroup>
        ))}
      </select>

      {meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};
