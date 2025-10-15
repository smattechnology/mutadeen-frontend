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
import getDeviceInfo, {
  getBrowserName,
  getDeviceHeaders,
  getDevicePlatform,
  getDeviceType,
  getFingerprint,
} from "@/utils/device";
import axios from "axios";
import api from "@/utils/api";

interface LoginSectionProps {
  onNavigate: (section: AuthSection) => void;
  params: URLSearchParams;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    default?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof error = {};

    if (!email) newErrors.email = "Email is required.";
    else if (email.length < 3)
      newErrors.email = "Email or Username must be at least 6 characters.";

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
      const headers = await getDeviceHeaders();

      const response = await api.post(
        "/login",
        { username_or_email: email.toLowerCase(), password: password },
        {
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data);
        setError({
          default:
            err.response?.data?.detail ||
            "Invalid credentials or server error.",
        });
      } else {
        setError({ default: "Failed to login. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold">
          Login
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error.default && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error.default}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
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
                <Loader2 className="animate-spin" /> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate("forgot-password")}
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>

        <p className="text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => onNavigate("register")}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginSection;
