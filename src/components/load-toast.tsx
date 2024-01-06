"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export const LoadToast = () => {
  useEffect(() => {
    setTimeout(() => {
      toast.error("This is a demo store, no purchases will be made");
    }, 500);
    setTimeout(() => {
      toast.error("Checkout functionality not yet added");
    }, 2000);
  }, []);
  return <></>;
};
