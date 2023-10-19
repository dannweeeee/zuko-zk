"use client";

import ApiService from "@/ApiService";
import { claims } from "@/sismoConstants";
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

export default function SismoButton(props: any) {
  const { loading, setLoading } = props;
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const verifySismoProofBackend = async (
    sismoResponse: SismoConnectResponse
  ) => {
    setLoading(true);
    const res = await ApiService.verifySismoProofBackend(sismoResponse);
    if (res.jwt) {
      setLoading(false);
      handleLogin(res);
    }
  };

  const handleLogin = async (signInResult: any) => {
    setUserLoggedIn(true);
    const { vaultId, jwt, newUser, user } = signInResult;
    if (newUser) {
      router.push(
        `/onboarding/?vaultId=${vaultId}&jwt=${jwt}&newUser=${newUser}`
      );
    } else {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          success: true,
          vault_id: user.vault_id,
          username: user.username,
        })
      );
      router.push(`/dashboard/home`);
    }
  };
  return (
    <SismoConnectButton
      config={{
        appId: "0x1224f1ca77f3c19432034f998bcac8bb" || "",
        /*     vault: {
          impersonate: ["dhadrien.sismo.eth", "jebus.eth"],
        }, */
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={claims}
      onResponse={async (response: SismoConnectResponse) => {
        await verifySismoProofBackend(response);
      }}
    />
  );
}
