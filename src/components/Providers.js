"use client";
import { SessionProvider } from "next-auth/react";

function Providers(props) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  );
}

export default Providers;

