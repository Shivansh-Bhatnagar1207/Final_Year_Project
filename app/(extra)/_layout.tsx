import { Stack } from "expo-router";

export default function Extralayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF9D3D",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Step" />
    </Stack>
  );
}
