"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  description?: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  description,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedquery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedquery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedquery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center
     border-b-2 p-3 gap-2 hover:text-neutral-100 transition cursor-pointer
     ${selected ? "border-b-neutral-800" : "border-transparent"}
     ${selected ? "text-neutral-800" : "text-neutral-500"}
     `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
