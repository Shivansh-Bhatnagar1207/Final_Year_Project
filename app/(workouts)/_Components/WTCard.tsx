import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type WeightLiftingCardProps = {
  name: string;
  image: any;
  reps : number;
  caloriesPerSet: number;
};

export default function WeightLiftingCard({
  name,
  image,
  reps,
  caloriesPerSet,
}: WeightLiftingCardProps) {
  const [setsCompleted, setSetsCompleted] = useState(0);

  const totalCalories = setsCompleted * caloriesPerSet;

  const handleCompleteSet = () => {
    setSetsCompleted((prev) => prev + 1);
  };

  const handleReset = () => {
    setSetsCompleted(0);
  };

  return (
    <View className="w-[85%] mx-auto my-4 p-2 bg-white rounded-3xl overflow-hidden shadow">
      <Image
        source={image}
        className="w-full h-60 mx-auto"
        resizeMode="contain"
      />
      <View className="p-5">
        <Text className="text-lg font-semibold mb-2">{name} x {reps}</Text>

        <View className="bg-secondary rounded-3xl px-4 py-2 mb-4">
          <Text className="text-white font-semibold">
            Sets Completed: {setsCompleted}
          </Text>
          <Text className="text-white font-semibold">
            Calories Burned: {totalCalories.toFixed(1)} kcal
          </Text>
          <Text className="text-white font-semibold">
            Calories per Set: {caloriesPerSet} kcal
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={handleCompleteSet}>
            <View
              className="bg-secondary rounded-full justify-center items-center"
              style={{ width: 60, height: 60 }}
            >
              <Ionicons
                name="checkmark-done-circle-outline"
                size={40}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReset}>
            <View
              className="bg-red-500 rounded-full justify-center items-center"
              style={{ width: 60, height: 60 }}
            >
              <Ionicons name="refresh-circle-outline" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
