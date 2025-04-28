import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/feature-card";
import { Heart, CreditCard, Coffee, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";

const DonationPage = () => {
  const navigate = useNavigate();
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  const handleDonate = (amount: number) => {
    navigate("/payment", { state: { amount } });
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-12 px-4 flex-grow">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support Tooltopia</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your donations help us maintain and improve Tooltopia, keeping it free and accessible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={Heart}
          title="Community Support"
          description="Your donation helps maintain our servers and infrastructure."
        />
        <FeatureCard
          icon={Coffee}
          title="Buy Us Coffee"
          description="Support our developers who work hard to bring you new features."
        />
        <FeatureCard
          icon={Gift}
          title="Enable Innovation"
          description="Help us develop new tools and improve existing ones."
        />
      </div>

      <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Choose Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[5, 10, 25, 50].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-16 text-lg"
              onClick={() => handleDonate(amount)}
            >
              ${amount}
            </Button>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full md:w-auto px-8"
            onClick={() => setShowCustomAmount(true)}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Custom Amount
          </Button>
        </div>

        {showCustomAmount && (
          <div className="mt-6">
            <div className="relative max-w-xs mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-7"
                placeholder="Enter amount"
                step="0.01"
              />
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">{error}</p>
            )}
            <Button
              className="mt-4 mx-auto block"
              onClick={() => handleDonate(parseFloat(customAmount))}
              disabled={!!error || !customAmount}
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;