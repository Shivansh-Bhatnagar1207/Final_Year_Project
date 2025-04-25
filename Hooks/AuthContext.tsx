import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const AuthContext = createContext(null);

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export function AuthProvider({ children }: Props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );

      return () => listener.subscription.unsubscribe();
    }, []);
  });

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
