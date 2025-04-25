import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // your configured supabase client
import { Session, User } from "@supabase/supabase-js";
import "@/global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [init, setInit] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // Watch for auth changes
  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setInit(false);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  //* Navigation guard
  useEffect(() => {
    if (init) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isLoggedIn = !!session?.user;

    if (isLoggedIn && inAuthGroup) {
      router.replace("/(main)/Home");
    } else if (!isLoggedIn && !inAuthGroup) {
      router.replace("/");
    }
  }, [session, init]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false , animation : "none"}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar backgroundColor={"#323232"} barStyle={"light-content"} />
    </>
  );
}
