"use client";

import { IconType } from "react-icons";

interface Categoryinputprops {
  onClick: (value: string) => void;
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryInput: React.FC<Categoryinputprops> = ({
  onClick,
  icon: Icon,
  label,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 flex flex-col gap-3
       hover:border-black transition cursor-pointer p-4 
       ${selected ? "border-black" : "border-neutral-200"}
       `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
