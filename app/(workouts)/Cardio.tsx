// screens/Cardio.tsx
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardioCard from "./_Components/CardioCard";

export default function Cardio() {
  const cardioExercises = [
    {
      name: "Running",
      image: require("@/assets/images/Cardio/running.gif"),
      burnRate: 15,
    },
    {
      name: "Cycling",
      image: require("@/assets/images/Cardio/cycling.gif"),
      burnRate: 8,
    },
    {
      name: "Jump Rope",
      image: require("@/assets/images/Cardio/jumpRope.gif"),
      burnRate: 12,
    },
    // Add more if needed
  ];

  return (
    <SafeAreaView className="h-screen bg-bgnd">
      <ScrollView>
        <View className="w-[90vw] mx-auto my-10 border-y-secondary border-x-bgnd py-2 border">
          <Text className="text-justify text-gray-600 text-base italic">
            Cardiovascular exercises are excellent for improving heart health
            and endurance. Engaging in activities like running, cycling, or
            swimming increases your heart rate, boosting circulation and oxygen
            delivery throughout the body. Regular cardio helps burn calories,
            supports weight management, and enhances stamina. It also releases
            endorphins, reducing stress and improving mood. Over time, it
            contributes to better sleep, a stronger immune system, and overall
            physical and mental resilience.
          </Text>
        </View>

        <View className="py-10">
          {cardioExercises.map((exercise, idx) => (
            <CardioCard key={idx} {...exercise} />
          ))}
        </View>
        <View className="h-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
