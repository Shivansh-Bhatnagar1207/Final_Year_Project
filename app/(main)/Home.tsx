import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [id, setId] = useState<string | null>();
  useEffect(() => {
    async function test() {
      const user = await supabase.auth.getUser();
      setId(user.data.user?.id);
    }
    test();
  }, []);
  if (!id) {
    router.replace("/(auth)/SignIn");
  }
  return (
    <View>
      <Text>home</Text>
      <Button
        title={"Signout"}
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace("/");
        }}
      />
      <Button
        title={"layout"}
        onPress={async () => {
          await supabase.auth.signOut();
          router.replace("/_sitemap");
        }}
      />
    </View>
  );
}
