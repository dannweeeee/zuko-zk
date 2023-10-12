import { NextRequest, NextResponse } from "next/server";
import {
    AuthType,
    ClaimType,
    SismoConnect,
    SismoConnectVerifiedResult,
} from "@sismo-core/sismo-connect-server";

const sismoConnect = SismoConnect({
    config: {
        appId: process.env.NEXT_SISMO_CONNECT_APP_ID || "",
        vault: {
            impersonate: ["nansen.eth", "jebus.eth"],
        },
    },
});

export async function POST(req: NextRequest) {
    const simsoConnectResponse = await req.json() // get the zk proof
    try {
        const result: SismoConnectVerifiedResult = await sismoConnect.verify(simsoConnectResponse, { auths: [{ authType: AuthType.VAULT }] })

        const vaultId = result.getUserId(AuthType.VAULT)
        if (vaultId) {
            //check in db if the user table has exisisting user with matching vaultId
            const existingUser = true; //TODO check here
            if (existingUser) {
                //log user in
            } else {
                //create user in db with vaultId
            }
        } else {
            return NextResponse.json("Invalid Response", { status: 400 })
        }
        return NextResponse.json({ userId: vaultId }) //maybe send in additional info here like 
    } catch (error) {
        console.log(error, 'Error with verifying zk proof')
        return NextResponse.json(error, { status: 500 })

    }

}