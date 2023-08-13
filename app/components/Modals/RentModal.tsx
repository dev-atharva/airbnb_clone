"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Inputs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentmodal = useRentModal();
  const [isloading, setisloading] = useState(false);
  const [step, Setstep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      tile: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );
  const setCustomvalue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    Setstep((value) => value - 1);
  };
  const onNext = () => {
    Setstep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setisloading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Added the listing");
        router.refresh();
        reset();
        Setstep(STEPS.CATEGORY);
        rentmodal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setisloading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryactionlabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodycontent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of hese best describes your place"
        sub_title="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomvalue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          sub_title="How guests find you?"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomvalue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          sub_title="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests will you allow?"
          value={guestCount}
          onChange={(value) => setCustomvalue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomvalue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomvalue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add photos of your place"
          sub_title="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomvalue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          sub_title="Short and sweet works best"
        />
        <Input
          id="title"
          label="Title"
          disabled={isloading}
          register={register}
          errors={errors}
          required
          type="text"
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isloading}
          register={register}
          errors={errors}
          required
          type="text"
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set your price"
          sub_title="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isloading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={rentmodal.isOpen}
      onclose={rentmodal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryactionlabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodycontent}
    />
  );
};

export default RentModal;
