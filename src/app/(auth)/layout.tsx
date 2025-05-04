"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?.id && user?.token) {
      router.replace("/");
    }
  }, [user?.id, user?.token, router]);

  return children;
};

export default AuthLayout;
