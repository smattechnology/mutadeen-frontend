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
import { Loader2, Eye, EyeOff } from "lucide-react";

interface RegisterSectionProps {
  onNavigate: (section: AuthSection) => void;
  params: URLSearchParams;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({ onNavigate }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    default?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof error = {};

    if (!name) newErrors.name = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email address.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setError({});

    try {
      // Replace this with your API call
      await new Promise((res) => setTimeout(res, 1500));
      console.log("Registered successfully:", { name, email, password });
    } catch (err) {
      setError({ default: "Failed to register. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">
          Register
        </CardTitle>
        <CardDescription className="text-center">
          Create a new account
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error.default && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error.default}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={
                error.name ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
          </div>

          {/* Email Field */}
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

          {/* Password Field */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={
                  error.password ? "border-red-500 focus:border-red-500" : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Signing up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterSection;
