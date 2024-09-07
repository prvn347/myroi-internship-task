-- CreateTable
CREATE TABLE "Emi" (
    "id" SERIAL NOT NULL,
    "loan_amount" DOUBLE PRECISION NOT NULL,
    "interest_rate" DOUBLE PRECISION NOT NULL,
    "loan_tenure_months" INTEGER NOT NULL,
    "emi" DOUBLE PRECISION NOT NULL,
    "prepayment_amount" DOUBLE PRECISION,
    "remaining_balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Emi_pkey" PRIMARY KEY ("id")
);
