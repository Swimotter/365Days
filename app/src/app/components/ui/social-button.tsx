import Image from "next/image";

type SocialButtonProps = {
  image: string;
  name: string;
  onClick: () => void;
};

export default function SocialButton({
  image,
  name,
  onClick,
}: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row px-4 py-2 border rounded-md cursor-pointer w-full justify-center"
    >
      <Image
        src={image}
        alt={`${name} logo`}
        width={24}
        height={24}
        className="mr-2"
      />
      Continue with {name}
    </button>
  );
}
