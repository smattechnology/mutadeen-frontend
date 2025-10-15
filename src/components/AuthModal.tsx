"use client"; // Required for any direct DOM access in App Router

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AuthModalProps {
  children: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const elements = document.querySelector("#header");
    console.log(elements); // HTMLCollection of matching elements
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            {/* Add your login/signup form here */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
