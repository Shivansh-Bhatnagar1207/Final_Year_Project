import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase"; // your configured supabase client
import { Session, User } from "@supabase/supabase-js";
import "@/global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const segments = useSegments();
  useEffect(()=>{
    async function getSession() {
      const {data,error} = await supabase.auth.getSession();
      if(data){
        setSession(data.session);
      }
    }
    getSession();
  },[])
  
  

  //* Navigation guard
  useEffect(() => {

    const inAuthGroup = segments[0] === "(auth)";
    const isLoggedIn = !!session?.user;

    if (isLoggedIn && inAuthGroup) {
      router.replace("/(main)/Home");
    } else if (!isLoggedIn && !inAuthGroup) {
      router.replace("/");
    }
  }, [session]);
  
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
