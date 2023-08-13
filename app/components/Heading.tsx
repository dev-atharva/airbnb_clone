"use client";
interface Headingprops {
  title: string;
  sub_title: string;
  center?: boolean;
}

const Heading: React.FC<Headingprops> = ({ title, sub_title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <div className="text-2xl font-bold">
        {title}
        <div className="font-light text-neutral-500 text-xl mt-2">
          {sub_title}
        </div>
      </div>
    </div>
  );
};

export default Heading;
