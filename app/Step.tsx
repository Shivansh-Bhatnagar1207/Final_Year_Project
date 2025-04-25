import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function StepCounter() {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    Pedometer.isAvailableAsync().then(setIsAvailable);

    const subscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Text>
      {isAvailable
        ? `Steps: ${steps}`
        : "Pedometer not available on this device"}
    </Text>
  );
}
