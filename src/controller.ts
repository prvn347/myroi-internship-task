import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const calculateEMI = (P: number, R: number, N: number) => {
  const r = R / 12 / 100;
  return (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
};

export const calculateEmi = async (req: Request, res: Response) => {
  try {
    const {
      loan_amount,
      interest_rate,
      loan_tenure_months,
      prepayment_amount = 0,
    } = req.body;

    const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);
    if (!loan_amount || !interest_rate || !loan_tenure_months) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    let remaining_balance = loan_amount;
    let monthWisePayments = [];

    for (let month = 1; month <= loan_tenure_months; month++) {
      const interestPaid = remaining_balance * (interest_rate / 12 / 100);
      const principalPaid = emi - interestPaid;

      remaining_balance -= principalPaid;

      if (prepayment_amount && month === 1) {
        remaining_balance -= prepayment_amount;
      }

      monthWisePayments.push({
        month,
        emiPaid: emi,
        interestPaid,
        principalPaid,
        prepayment: month === 1 ? prepayment_amount : 0,
        remainingBalance: remaining_balance > 0 ? remaining_balance : 0,
      });

      if (remaining_balance <= 0) break;
    }

    const emiRecord = await prisma.emi.create({
      data: {
        loan_amount,
        interest_rate,
        loan_tenure_months,
        emi,
        prepayment_amount,
        remaining_balance,
      },
    });

    res.status(201).json({
      loanAmount: loan_amount,
      interestRate: interest_rate,
      loanTenureMonths: loan_tenure_months,
      emi,
      prepayment: prepayment_amount,
      monthWisePayments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to calculate EMI" });
  }
};

export const getEmis = async (req: Request, res: Response) => {
  try {
    const emis = await prisma.emi.findMany();
    res.status(201).json(emis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get EMIs" });
  }
};

export const getEmiById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const emi = await prisma.emi.findUnique({
      where: { id: Number(id) },
    });

    if (!emi) return res.status(404).json({ error: "EMI record not found" });

    res.status(201).json(emi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to get EMI` });
  }
};
