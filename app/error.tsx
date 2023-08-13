"use client";
import { useEffect } from "react";
import EmptyState from "./components/EmptyState";
interface ErrorSteprops {
  error: Error;
}

const ErrorState: React.FC<ErrorSteprops> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return <EmptyState title="Oh no" subtitle="Something went wrong" />;
};

export default ErrorState;
