"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

import LoginSection from "@/components/layout/section/auth/LoginSection";
import RegisterSection from "@/components/layout/section/auth/RegisterSection";
import ForgotPasswordSection from "@/components/layout/section/auth/ForgotPasswordSection";
import { AuthSection } from "@/types";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sectionParam = searchParams.get("section") as AuthSection | null;
  const [selectedSection, setSelectedSection] = useState<AuthSection>(
    sectionParam || "login"
  );

  // Update section when query param changes
  useEffect(() => {
    if (sectionParam) setSelectedSection(sectionParam);
  }, [sectionParam]);

  // Navigate and update query param
  const handleNavigate = (section: AuthSection) => {
    setSelectedSection(section);
    router.push(`/auth?section=${section}`);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "login":
        return (
          <LoginSection onNavigate={handleNavigate} params={searchParams} />
        );
      case "register":
        return (
          <RegisterSection onNavigate={handleNavigate} params={searchParams} />
        );
      case "forgot-password":
        return (
          <ForgotPasswordSection
            onNavigate={handleNavigate}
            params={searchParams}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-muted/40">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSection}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="w-full max-w-sm"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
