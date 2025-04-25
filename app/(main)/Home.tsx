import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [id, setId] = useState<string | null>();
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    async function test() {
      const user = await supabase.auth.getUser();
      setId(user.data.user?.id);
      setUser(user.data.user);
      // console.log(user.data);
    }
    test();
    console.log("id:" + user);
  }, []);

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
