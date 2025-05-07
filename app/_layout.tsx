import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // your configured supabase client
import { Session } from "@supabase/supabase-js";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/Hooks/AuthContext";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const segments = useSegments(); // Get the current segment of the route

  useEffect(() => {
    // Fetch the session on app startup
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
    }
    getSession();
  }, []);

  useEffect(() => {
    // Only run after session is loaded
    if (session === null) return;

    // Check the current route segment
    const inAuthGroup = segments[0] === "(auth)";
    const isLoggedIn = !!session.user;

    // If user is logged in, prevent access to (auth) group, navigate to (main)
    if (isLoggedIn && inAuthGroup) {
      router.replace("/(auth)/SignIn");
    }

    // If user is not logged in, prevent access to (main) group, navigate to (auth)
    if (!isLoggedIn && segments[0] !== "(auth)") {
      router.replace("/(main)/Home");
    }
  }, [session, segments, router]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar backgroundColor={"#323232"} barStyle={"light-content"} />
    </>
  );
}
