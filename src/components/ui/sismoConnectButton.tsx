"use client";

// react page
import {
  SismoConnectButton,
  SismoConnectConfig,
  AuthType,
  ClaimType,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SismoButton() {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const verifySismoProofBackend = async (
    sismoResponse: SismoConnectResponse
  ) => {
    console.log("Verifying proooof");
    const res = await fetch("http://localhost:3050/auth", {
      method: "POST",
      body: JSON.stringify(sismoResponse),
    });
    if (res.status === 200) {
      const { vaultId } = await res.json();
      handleLogin();
    }
  };

  const handleLogin = () => {
    console.log("Got here??");
    setUserLoggedIn(true);
    router.push("/dashboard");
  };
  return (
    <SismoConnectButton
      config={{
        appId: process.env.NEXT_SISMO_CONNECT_APP_ID || "",
        vault: {
          impersonate: ["nansen.eth", "jebus.eth"],
        },
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={[
        {
          groupId: "0xf002554351fe264d75f59e7fba89c2e6",
          claimType: ClaimType.GTE,
          value: 1,
          isOptional: true,
          isSelectableByUser: true,
        },
      ]}
      onResponse={async (response: SismoConnectResponse) => {
        console.log("Getting response...");
        await verifySismoProofBackend(response);
      }}
    />
  );
}
