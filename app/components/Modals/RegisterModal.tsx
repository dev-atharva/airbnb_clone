"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Inputs";
import { toast } from "react-hot-toast";
import Button from "../Buttons";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const registermodal = useRegisterModal();
  const loginmodal = useLoginModal();
  const [loading, Setisloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    Setisloading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success!")
        registermodal.onClose();
        loginmodal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        Setisloading(false);
      });
  };
  const toggle = useCallback(() => {
    loginmodal.onOpen();
    registermodal.onClose();
  }, [loginmodal, registermodal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" sub_title="Create and account" />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        type="text"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footercontent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 mt-4 font-light text-light ">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={registermodal.isOpen}
      title="Register"
      actionLabel="Continue"
      onclose={registermodal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footercontent}
    />
  );
};

export default RegisterModal;
