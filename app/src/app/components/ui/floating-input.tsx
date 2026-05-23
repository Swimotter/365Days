type FloatingInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
};

export default function FloatingInput({
  id,
  name,
  label,
  type = "text",
  required = false,
  className,
}: FloatingInputProps) {
  return (
    <div className={`relative w-full rounded-md ${className}`}>
      <input
        className="
          peer
          w-full
          px-4 pb-2 pt-6
          focus:border
          focus:border-blue-500"
        type={type}
        id={id}
        name={name}
        placeholder=""
        required={required}
      ></input>
      <label
        className="
          absolute left-4 top-4
          text-gray-600

          transition-all duration-200

          peer-focus:top-2
          peer-focus:left-2
          peer-focus:text-sm

          peer-[:not(:placeholder-shown)]:top-2
          peer-[:not(:placeholder-shown)]:left-2
          peer-[:not(:placeholder-shown)]:text-sm
        "
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
