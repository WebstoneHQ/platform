import type { Prisma } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";

import PrismaClient from "$lib/db/prisma";
import { isValidateWebhook } from "$lib/validate-paddle-webhooks";

const db = new PrismaClient();

export const post: RequestHandler = async ({ request }) => {
  console.time("process-webhook-billing-preorder");
  try {
    const bodyFormData = await request.formData();
    if (!isValidateWebhook(bodyFormData)) {
      throw new Error("Invalid webhook signature.");
    }

    const data = {
      customer_email: String(bodyFormData.get("customer_email")),
      customer_name: String(bodyFormData.get("customer_name")),
      event_time: new Date(`${String(bodyFormData.get("event_time"))} UTC`),
      marketing_consent: String(bodyFormData.get("marketing_consent")) === "1",
      p_country: String(bodyFormData.get("p_country")),
      p_coupon_savings: String(bodyFormData.get("p_coupon_savings")),
      p_coupon: String(bodyFormData.get("p_coupon")),
      p_currency: String(bodyFormData.get("p_currency")),
      p_earnings: JSON.parse(
        String(bodyFormData.get("p_earnings"))
      ) as Prisma.JsonArray,
      p_order_id: String(bodyFormData.get("p_order_id")),
      p_paddle_fee: String(bodyFormData.get("p_paddle_fee")),
      p_price: String(bodyFormData.get("p_price")),
      p_product_id: Number(bodyFormData.get("p_product_id")),
      p_quantity: Number(bodyFormData.get("p_quantity")),
      p_sale_gross: String(bodyFormData.get("p_sale_gross")),
      p_tax_amount: String(bodyFormData.get("p_tax_amount")),
      p_used_price_override: Boolean(bodyFormData.get("p_used_price_override")),
      passthrough: JSON.parse(
        String(bodyFormData.get("passthrough"))
      ) as Prisma.JsonArray,
      transaction_id: String(bodyFormData.get("transaction_id")),
    };
    await db.billing.create({
      data,
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
    };
  } finally {
    console.timeEnd("process-webhook-billing-preorder");
  }
};
