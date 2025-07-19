import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import Loader from "../components/Loader/Loader";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; token: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("petstore_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (email: string, token: string) => {
    const userObj = { email, token };
    setUser(userObj);
    localStorage.setItem("petstore_user", JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("petstore_user");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
