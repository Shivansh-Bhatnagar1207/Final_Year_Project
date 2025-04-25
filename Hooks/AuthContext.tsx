import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // Adjust your import path

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = supabase.auth.getSession();
    setSession(currentSession);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session); // Update session state on auth state change
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
