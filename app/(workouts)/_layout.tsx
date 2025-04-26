import { Stack } from "expo-router";

export default function Workoutlayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF9D3D",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Cardio" />
      <Stack.Screen name="Meditation" />
      <Stack.Screen name="Streching" />
      <Stack.Screen name="Weight_Training" />
      <Stack.Screen name="Yoga" />
      <Stack.Screen name="Zumba" />
    </Stack>
  );
}
