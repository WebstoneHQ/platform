import type { RequestHandler } from "@sveltejs/kit";

import PrismaClient from "$lib/db/prisma";
import type { Prisma } from "@prisma/client";

const db = new PrismaClient();

type GumroadLicenseVerificationResponse = {
  success: boolean;
  purchase: {
    email: string;
    purchaser_id: string;
  }
};

const PRODUCT_PERMALINK = "jsofb";

const fetchLicenseVerification = async (licenseKey: string) => {
  const gumroadResponse = await fetch("https://api.gumroad.com/v2/licenses/verify", {
    body: `product_permalink=${PRODUCT_PERMALINK}&license_key=${licenseKey}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });
  if (!gumroadResponse.ok) {
    console.error(new Error(`POST request to Gumroad failed. Response status ${gumroadResponse.status}, status text ${gumroadResponse.statusText}, text ${await gumroadResponse.text()}`))
    return null;
  }
  return await gumroadResponse.json() as GumroadLicenseVerificationResponse
}

const isValidLicense = (licenseVerificationResponse: GumroadLicenseVerificationResponse | null, email: string) => {
  if (licenseVerificationResponse?.purchase.email !== email) {
    console.error(new Error(`Email addresses do not match. Provided by user: ${email} vs received from Gumroad: ${licenseVerificationResponse?.purchase.email || "null"}`))
    return false;
  }
  return licenseVerificationResponse.success
};

export const post: RequestHandler = async ({ request }) => {
  const body = await request.formData();
  const discordUsername = body.get("discordusername")?.toString() || "";
  const email = body.get("email")?.toString() || "";
  const githubUsername = body.get("githubusername")?.toString() || "";
  const licenseKey = body.get("licensekey")?.toString() || "";

  const licenseVerificationResponse = await fetchLicenseVerification(licenseKey)
  if (!isValidLicense(licenseVerificationResponse, email)) {
    console.error(new Error(`Gumroad license verification API call failed for email ${email}, Discord user ${discordUsername} and license key ${licenseKey}`));
    return {
      status: 400,
    };
  }

  const preorderData = await db.preorder.create({
    data: {
      form_discord_username: discordUsername,
      form_email: email,
      form_github_username: githubUsername,
      form_license_key: licenseKey,
      gumroad_license_verification: licenseVerificationResponse as Prisma.InputJsonValue,
    },
  });

  return {
    status: 200,
    body: JSON.stringify({
      preorderId: preorderData.id
    })
  };
};
