import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ExerciseCardProps = {
  name: string;
  image: any;
  burnRate: number; // kcal per minute
};

export default function ExerciseCard({
  name,
  image,
  burnRate,
}: ExerciseCardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const caloriesBurned = (seconds / 60) * burnRate;

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <View className="w-[85%] mx-auto my-5 p-2 bg-white rounded-3xl overflow-hidden shadow">
      <Image
        source={image}
        className="w-full h-60 mx-auto"
        resizeMode="contain"
      />
      <View className="p-5">
        <Text className="text-lg font-semibold px-2 mb-2">{name}</Text>

        <View className="flex-row justify-between items-center">
          <View className="bg-secondary rounded-3xl px-4 py-2">
            {seconds > 0 ? (
              <>
                <Text className="text-white font-semibold">
                  Time: {formatTime()}
                </Text>
                <Text className="text-white font-semibold">
                  Calories: {caloriesBurned.toFixed(1)} kcal
                </Text>
              </>
            ) : (
              <Text className="text-white font-semibold">
                Burn Rate: {burnRate} kcal/min
              </Text>
            )}
          </View>

          <View className="flex-row items-center  gap-2">
            <TouchableOpacity onPress={() => setIsRunning((prev) => !prev)}>
              <View
                className="bg-secondary rounded-full justify-center items-center "
                style={{ width: 40, height: 40 }}
              >
                <Ionicons
                  name={
                    isRunning ? "pause-circle-outline" : "play-circle-outline"
                  }
                  size={30}
                  color="white"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleStop}>
              <View
                className="bg-red-500 rounded-full justify-center items-center"
                style={{ width: 40, height: 40 }}
              >
                <Ionicons name="stop-circle-outline" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
