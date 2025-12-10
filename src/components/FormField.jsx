
import React from "react";
import "./FormField.css";

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  status, // 'valid' | 'invalid' | undefined
  autoComplete,
  inputMode,
}) {
  const className =
    "input" +
    (status === "invalid" ? " is-invalid" : "") +
    (status === "valid" ? " is-valid" : "");

  return (
    <div className="field">
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        aria-invalid={status === "invalid"}
        aria-describedby={`erro-${id}`}
        autoComplete={autoComplete}
        inputMode={inputMode}
      />
      <div id={`erro-${id}`} className="error-msg" aria-live="polite">
        {error}
      </div>
    </div>
  );
}
