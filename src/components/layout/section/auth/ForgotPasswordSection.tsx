"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { AuthSection } from "@/types";
import { Loader2 } from "lucide-react";

interface ForgotPasswordSectionProps {
  onNavigate: (section: AuthSection) => void;
  params: URLSearchParams;
}

const ForgotPasswordSection: React.FC<ForgotPasswordSectionProps> = ({
  onNavigate,
  params,
}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ email?: string; default?: string }>({});

  const validate = (): boolean => {
    const newErrors: typeof error = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError({});

    try {
      // Replace with your API call to send reset link
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Reset link sent to:", email);
    } catch (err) {
      setError({ default: "Failed to send reset link. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error.default && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error.default}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={
                error.email ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate("login")}
          className="text-sm text-primary hover:underline"
        >
          Back to Login
        </button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordSection;
