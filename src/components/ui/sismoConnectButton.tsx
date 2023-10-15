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
    if (res.status === 200) {
      const signInResult = await res.json();
      setLoading(false);
      handleLogin(signInResult);
    }
  };

  const handleLogin = (signInResult: any) => {
    setUserLoggedIn(true);
    const { vaultId, jwt, newUser } = signInResult;
    console.log(signInResult, "signInResult BRÄ");
    router.push(`/dashboard/?vaultId=${vaultId}&jwt=${jwt}&newUser=${newUser}`);
  };
  return (
    <SismoConnectButton
      config={{
        appId: "0x1224f1ca77f3c19432034f998bcac8bb" || "",
      }}
      auths={[{ authType: AuthType.VAULT }]}
      claims={claims}
      onResponse={async (response: SismoConnectResponse) => {
        console.log("Getting response... BRÄ ");
        await verifySismoProofBackend(response);
      }}
    />
  );
}
