import { publicIpv4 } from "public-ip";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config()

const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const DOMAIN_NAME = process.env.DOMAIN_NAME
const SUBDOMAIN = process.env.SUBDOMAIN

async function run() {
    const url = `https://api.vercel.com/v2/domains/${DOMAIN_NAME}/records`
    const public_ip = await publicIpv4()

    console.log("got public ip: " + public_ip)

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${VERCEL_TOKEN}`
        },
        body: JSON.stringify({
            name: SUBDOMAIN,
            type: "A",
            value: public_ip,
            ttl: 60
        })
    }
    
    const result = await fetch(url, options)
    
    console.log(result.status, await result.json())    
}

await run()
