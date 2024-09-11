import React, { useEffect } from "react";
import Login from "../views/Login";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const LoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return <Login />;
};

export default LoginPage;

