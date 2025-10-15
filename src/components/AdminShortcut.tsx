"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";

interface AdminShortcutProps {
  combo?: string | string[];
  route?: string;
  requirePassword?: boolean;
  password?: string;
}

/**
 * Modern AdminShortcut — secure, styled with shadcn default theme
 * ---------------------------------------------------------------
 * Opens a professional login modal when the key combo is pressed.
 * If authorized, redirects to the admin route.
 */

export default function AdminShortcut({
  combo = "Ctrl+Shift+A",
  route = "/admin",
  requirePassword = false,
  password = "",
}: AdminShortcutProps) {
  const router = useRouter();
  const pressedRef = useRef<Set<string>>(new Set());
  const [open, setOpen] = useState(false);
  const [inputPwd, setInputPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);

  function normalizeCombo(c: string | string[]): string[] {
    if (Array.isArray(c)) return c.map((s) => s.toLowerCase());
    return c.split("+").map((s) =>
      s
        .trim()
        .replace(/^ctrl$/i, "control")
        .replace(/^cmd$/i, "meta")
        .toLowerCase()
    );
  }

  const comboNormalized = normalizeCombo(combo);

  function matchesCombo(event: KeyboardEvent): boolean {
    const needControl =
      comboNormalized.includes("control") || comboNormalized.includes("ctrl");
    const needShift = comboNormalized.includes("shift");
    const needAlt = comboNormalized.includes("alt");
    const needMeta =
      comboNormalized.includes("meta") ||
      comboNormalized.includes("cmd") ||
      comboNormalized.includes("win");

    const other = comboNormalized.filter(
      (k) =>
        !["control", "ctrl", "shift", "alt", "meta", "cmd", "win"].includes(k)
    );

    if (needControl !== event.ctrlKey) return false;
    if (needShift !== event.shiftKey) return false;
    if (needAlt !== event.altKey) return false;
    if (needMeta !== event.metaKey) return false;

    if (other.length === 1) {
      return event.key.toLowerCase() === other[0].toLowerCase();
    }

    if (other.length === 0) return true;

    for (const k of other) {
      if (!pressedRef.current.has(k.toLowerCase())) return false;
    }

    return true;
  }

  function handleTrigger(): void {
    if (requirePassword) {
      setOpen(true);
      setInputPwd("");
      return;
    }

    localStorage.setItem("admin-access", Date.now().toString());
    router.push(route);
  }

  function submitPassword(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (password && inputPwd === password) {
        localStorage.setItem("admin-access", Date.now().toString());
        setOpen(false);
        router.push(route);
      } else {
        alert("Password incorrect");
      }
      setLoading(false);
    }, 800);
  }

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    function onKeyDown(e: KeyboardEvent): void {
      if (!e.key) return;
      pressedRef.current.add(e.key.toLowerCase());
      try {
        if (matchesCombo(e)) {
          e.preventDefault();
          handleTrigger();
        }
      } catch {
        // ignore
      }
    }

    function onKeyUp(e: KeyboardEvent): void {
      if (!e.key) return;

      pressedRef.current.delete(e.key.toLowerCase());
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // return () => {
    //   window.removeEventListener("keydown", onKeyDown);
    //   window.removeEventListener("keyup", onKeyUp);
    // };
  }, [comboNormalized, requirePassword, password]);

  if (typeof window === "undefined") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Admin Access
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            This section is restricted. Please enter your passphrase to
            continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitPassword} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Passphrase
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={inputPwd}
                onChange={(e) => setInputPwd(e.target.value)}
                className="pr-10"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <DialogFooter className="">
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Access Admin"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
