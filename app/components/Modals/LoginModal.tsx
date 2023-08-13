"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Inputs";
import { toast } from "react-hot-toast";
import Button from "../Buttons";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registermodal = useRegisterModal();
  const loginmodal = useLoginModal();
  const [loading, Setisloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    Setisloading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      Setisloading(false);
      if (callback?.ok) {
        toast.success("Logged in ");
        router.refresh();
        loginmodal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginmodal.onClose();
    registermodal.onOpen();
  }, [loginmodal, registermodal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" sub_title="Login to you account" />
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
          <div>First time using Airbnb?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline "
          >
            Create and account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={loginmodal.isOpen}
      title="Login"
      actionLabel="Continue"
      onclose={loginmodal.onClose}
      onSubmit={handleSubmit(onsubmit)}
      body={bodyContent}
      footer={footercontent}
    />
  );
};

export default LoginModal;
