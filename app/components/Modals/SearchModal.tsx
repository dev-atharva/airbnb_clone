"use client";

import qs from "query-string";
import usesearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchmodal = usesearchModal();

  const [step, setstep] = useState(STEPS.LOCATION);
  const [location, setlocation] = useState<CountrySelectValue>();
  const [guestCount, setguestCount] = useState(1);
  const [roomCount, setroomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, Setdaterange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setstep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setstep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentquery = {};
    if (params) {
      currentquery = qs.parse(params.toString());
    }
    const updatedquery: any = {
      ...currentquery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedquery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedquery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      { url: "/", query: updatedquery },
      { skipNull: true }
    );
    setstep(STEPS.LOCATION);
    searchmodal.onClose();
    router.push(url);
  }, [
    router,
    step,
    searchmodal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    onNext,
  ]);
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let BodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go ? "
        sub_title="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setlocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    BodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go ? "
          sub_title="Make sure everyone is free"
        />
        <Calender
          value={dateRange}
          onChange={(value) => Setdaterange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    BodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="More information"
          sub_title="Find your perfect place!"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming ?"
          value={guestCount}
          onChange={(value) => setguestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need ?"
          value={roomCount}
          onChange={(value) => setroomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need ?"
          value={bathroomCount}
          onChange={(value) => setbathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchmodal.isOpen}
      onclose={searchmodal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={BodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
};

export default SearchModal;
