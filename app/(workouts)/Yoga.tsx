import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const yogaPoses = [
  {
    id: 1,
    name: "Downward Dog",
    duration: 30,
    description: "Strengthens arms, shoulders, and stretches hamstrings.",
    image: require("@/assets/images/WT/g1.gif"),
  },
  {
    id: 2,
    name: "Child’s Pose",
    duration: 30,
    description: "Relaxes back and neck, calms the mind.",
    image: require("@/assets/images/WT/g1.gif"),
  },
  {
    id: 3,
    name: "Warrior II",
    duration: 30,
    description: "Strengthens legs and improves balance.",
    image: require("@/assets/images/WT/g1.gif"),
  },
  {
    id: 4,
    name: "Tree Pose",
    duration: 30,
    description: "Improves balance and stability in the legs.",
    image: require("@/assets/images/WT/g1.gif"),
  },
  {
    id: 5,
    name: "Bridge Pose",
    duration: 30,
    description: "Stretches chest, neck, and spine; strengthens back.",
    image: require("@/assets/images/WT/g1.gif"),
  },
];

const totalCaloriesBurned = 20;

export default function Yoga() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(yogaPoses[0].duration);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (hasStarted && !isCompleted) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 1) {
            clearInterval(interval!);
            goToNextPose();
            return yogaPoses[currentIndex + 1]?.duration || 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [hasStarted, currentIndex, isCompleted]);

  const goToNextPose = () => {
    if (currentIndex + 1 < yogaPoses.length) {
      setCurrentIndex((prev) => prev + 1);
      setRemainingTime(yogaPoses[currentIndex + 1].duration);
    } else {
      setIsCompleted(true);
    }
  };

  const skipPose = () => {
    goToNextPose();
  };

  const restartModule = () => {
    setCurrentIndex(0);
    setRemainingTime(yogaPoses[0].duration);
    setIsCompleted(false);
    setHasStarted(false);
  };

  if (hasStarted) {
    if (isCompleted) {
      return (
        <SafeAreaView className="flex-1 justify-center items-center bg-bgnd">
          <Ionicons name="checkmark-circle-outline" size={100} color="green" />
          <Text className="text-2xl font-bold mt-4">
            Yoga Session Completed!
          </Text>
          <Text className="text-lg mt-2">
            🧘‍♀️ You burned {totalCaloriesBurned} kcal!
          </Text>
          <TouchableOpacity
            onPress={restartModule}
            className="bg-secondary mt-6 px-4 py-2 rounded-2xl"
          >
            <Text className="text-white text-lg">Restart Yoga Module</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    const currentPose = yogaPoses[currentIndex];

    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bgnd p-4">
        <Text className="text-lg text-gray-600 mb-2">
          Pose {currentIndex + 1} of {yogaPoses.length}
        </Text>
        <Text className="text-2xl font-bold mb-2">{currentPose.name}</Text>
        <Image
          source={currentPose.image}
          className="w-[80%] h-60 rounded-xl mb-4"
          resizeMode="contain"
        />
        <Text className="text-center text-base italic text-gray-700 mb-4">
          {currentPose.description}
        </Text>

        <View className="flex-row items-center space-x-2 mb-6">
          <Ionicons name="time-outline" size={30} color="#333" />
          <Text className="text-3xl font-bold">{remainingTime}s</Text>
        </View>

        <TouchableOpacity
          onPress={skipPose}
          className="bg-red-500 px-4 py-2 rounded-2xl"
        >
          <Text className="text-white text-lg">Skip Pose</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen bg-bgnd">
      <ScrollView>
        <View className="w-[90vw] mx-auto mt-10 mb-24 border-y-secondary border-y border-x-0 py-2 border">
          <Text className="text-justify text-gray-600 text-base italic">
            Yoga offers numerous benefits for both the mind and body. It helps
            improve flexibility, strength, and posture while promoting better
            balance and coordination. Regular practice can reduce stress,
            enhance mental clarity, and support emotional well-being through
            mindful breathing and relaxation techniques. Additionally, yoga is
            known to boost energy levels, improve sleep quality, and support
            overall physical and mental health. It's a holistic practice that
            nurtures harmony within.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setHasStarted(true)}
          className="bg-secondary my-10 mx-auto px-6 py-3 rounded-2xl"
        >
          <View className="flex-row items-center space-x-2">
            <Ionicons name="play-circle-outline" size={30} color="white" />
            <Text className="text-white text-lg">Start Yoga Module</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
