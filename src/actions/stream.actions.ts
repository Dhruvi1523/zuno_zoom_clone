"use server"
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";


const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;


export const tokenProvider = async () => {
    const user = await currentUser();

    if (!apiKey) throw new Error("api key is misssing");

    if (!secret) throw new Error("api secret is misssing");

    if (!user) throw new Error("user is misssing");

    const client = new StreamClient(apiKey, secret);

    const expirationTime = 60*60 ;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = client.generateUserToken({ user_id : user?.id , validity_in_seconds : expirationTime, iat : issuedAt})
    return token
}


