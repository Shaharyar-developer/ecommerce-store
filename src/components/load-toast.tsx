"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export const LoadToast = () => {
  useEffect(() => {
    setTimeout(() => {
      toast.error("This is a demo store, no purchases will be made");
    }, 0);
  }, []);
  return <></>;
};
