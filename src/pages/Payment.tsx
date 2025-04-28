import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, ArrowLeft } from "lucide-react";

interface LocationState {
  amount?: number;
}

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [customAmount, setCustomAmount] = useState(state?.amount?.toString() || "");
  const [error, setError] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setCustomAmount(value);
      setError("");
      return;
    }
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      setError("Please enter a valid number");
      return;
    }
    if (amount > 1000) {
      setError("Amount cannot exceed $1,000");
      return;
    }
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    setCustomAmount(value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);
    if (!amount || amount <= 0 || amount > 1000) {
      setError("Please enter a valid amount between $0 and $1,000");
      return;
    }
    // TODO: Implement actual payment processing
    console.log(`Processing payment for $${amount}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container py-16 px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Donation</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2">
                Donation Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={customAmount}
                  onChange={handleAmountChange}
                  className="pl-7"
                  placeholder="Enter amount"
                />
              </div>
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Payment Details</h3>
                <Input
                  type="text"
                  placeholder="Card number"
                  className="mb-3"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="text" placeholder="MM/YY" />
                  <Input type="text" placeholder="CVC" />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!!error || !customAmount}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Complete Donation
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;