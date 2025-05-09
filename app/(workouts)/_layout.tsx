import { WorkoutProvider } from "@/Hooks/WorkoutContext";
import { Stack } from "expo-router";

export default function Workoutlayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FF9D3D",
          },
          headerTintColor: "white",
        }}
      ></Stack>
    </>
  );
}
