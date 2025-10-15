"use client";
import api from "@/utils/api";
import { getDeviceHeaders } from "@/utils/device";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  role: string | null; // null if not assigned
  is_active: boolean;
  is_verified: boolean;
  created_at: number; // timestamp in milliseconds
  updated_at: number; // timestamp in milliseconds
  last_login: number | null; // timestamp or null
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuth();
  }, []);

  async function getAuth() {
    const headers = await getDeviceHeaders();

    const response = await api.get("/auth", {
      headers: {
        ...headers,
      },
    });
    if (response.status === 200) {
      setUser(response.data.user);
    } else {
      setUser(null);
    }
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
