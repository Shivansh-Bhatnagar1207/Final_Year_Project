import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
export default function _layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" />
    </Tabs>
  );
}
