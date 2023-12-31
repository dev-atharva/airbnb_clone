"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Buttons";
interface emptystateprops {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<emptystateprops> = ({
  title = "No exact matches",
  subtitle = "Try Changing or removing filters",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} sub_title={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
