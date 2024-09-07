CREATE TABLE emi_calculations (
  id SERIAL PRIMARY KEY,
  loan_amount DECIMAL,
  interest_rate DECIMAL,
  loan_tenure_months INTEGER,
  emi DECIMAL,
  prepayment_amount DECIMAL DEFAULT NULL,
  remaining_balance DECIMAL
);
