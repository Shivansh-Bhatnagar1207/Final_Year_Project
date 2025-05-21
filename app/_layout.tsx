import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // your configured supabase client
import { Session } from "@supabase/supabase-js";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/Hooks/AuthContext";
import { WorkoutProvider } from "@/Hooks/WorkoutContext";

export default function RootLayout() {
  return (
    <WorkoutProvider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
      <StatusBar backgroundColor={"#323232"} barStyle={"light-content"} />
    </WorkoutProvider>
  );
}
