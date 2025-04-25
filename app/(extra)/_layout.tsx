import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Extralayout() {
  return (
    <Stack>
      <Stack.Screen name="Step" />
    </Stack>
  );
}
