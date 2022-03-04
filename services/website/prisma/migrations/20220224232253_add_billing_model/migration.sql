-- CreateTable
CREATE TABLE "billing" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_email" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "event_time" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "marketing_consent" BOOLEAN NOT NULL,
    "p_country" TEXT NOT NULL,
    "p_coupon" TEXT,
    "p_coupon_savings" DECIMAL(65,30) NOT NULL,
    "p_currency" TEXT NOT NULL,
    "p_earnings" JSONB NOT NULL,
    "p_order_id" TEXT NOT NULL,
    "p_paddle_fee" DECIMAL(65,30) NOT NULL,
    "p_price" DECIMAL(65,30) NOT NULL,
    "p_product_id" INTEGER NOT NULL,
    "p_quantity" INTEGER NOT NULL,
    "p_sale_gross" DECIMAL(65,30) NOT NULL,
    "p_tax_amount" DECIMAL(65,30) NOT NULL,
    "p_used_price_override" BOOLEAN NOT NULL,
    "passthrough" JSONB NOT NULL,
    "transaction_id" TEXT NOT NULL,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);
