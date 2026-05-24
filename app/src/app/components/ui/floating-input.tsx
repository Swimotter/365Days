import Image from "next/image";

type FloatingInputProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  image?: string;
  required?: boolean;
  className?: string;
};

export default function FloatingInput({
  id,
  name,
  label,
  type = "text",
  image,
  required = false,
  className,
}: FloatingInputProps) {
  return (
    <label
      htmlFor={id}
      className={`
        cursor-text
        flex flex-row
        ring-inset
        rounded-md
        ring-blue-500

        hover:not-focus-within:ring-1
        focus-within:ring-2

        transition-all duration-200
        ${className}
      `}
    >
      {image && (
        <Image
          src={image}
          alt={label}
          width={24}
          height={24}
          className="ml-2"
        />
      )}
      <div className="relative w-full">
        <input
          className="
            peer
            w-full
            px-4 pb-1 pt-5
            outline-none
          "
          type={type}
          id={id}
          name={name}
          placeholder=""
          required={required}
        ></input>
        <span
          className="
            absolute left-4 top-3
            text-gray-600
            pointer-events-none

            transition-all duration-200

            peer-focus:top-1
            peer-focus:left-3
            peer-focus:text-sm

            peer-[:not(:placeholder-shown)]:top-1
            peer-[:not(:placeholder-shown)]:left-3
            peer-[:not(:placeholder-shown)]:text-sm
          "
        >
          {label}
        </span>
      </div>
    </label>
  );
}
