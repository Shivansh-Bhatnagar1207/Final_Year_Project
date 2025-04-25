import { View, Text } from "react-native";
import React from "react";
import { supabase } from "@/utils/supabase";
import { Button } from "@rneui/themed";
import { router } from "expo-router";

export default function Home() {
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
    </View>
  );
}
