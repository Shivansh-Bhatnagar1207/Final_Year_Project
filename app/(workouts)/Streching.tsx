import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkout } from "@/Hooks/WorkoutContext";

const stretches = [
  {
    id: 1,
    name: "Hamstring Stretch",
    duration: 30,
    description: "Stretches hamstrings and lower back.",
    image: require("@/assets/images/streaching/hamstring.gif"),
  },
  {
    id: 2,
    name: "Shoulder Stretch",
    duration: 30,
    description: "Improves shoulder flexibility.",
    image: require("@/assets/images/streaching/a2.gif"),
  },
  {
    id: 3,
    name: "Quad Stretch",
    duration: 30,
    description: "Stretches quadriceps and hip flexors.",
    image: require("@/assets/images/streaching/a3.gif"),
  },
  {
    id: 4,
    name: "Calf Stretch",
    duration: 30,
    description: "Stretches calf muscles.",
    image: require("@/assets/images/streaching/a4.gif"),
  },
  {
    id: 5,
    name: "Lower Back Stretch",
    duration: 30,
    description: "Relieves tension in lower back.",
    image: require("@/assets/images/streaching/a5.gif"),
  },
];

const totalCaloriesBurned = 10;

export default function StretchingPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(stretches[0].duration);
  const [isCompleted, setIsCompleted] = useState(false);

  const { addWorkout } = useWorkout(); // ✅ access context here

  // Calculate total duration in minutes
  const totalDurationMinutes = Math.round(
    stretches.reduce((sum, stretch) => sum + stretch.duration, 0) / 60
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (hasStarted && !isCompleted) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 1) {
            clearInterval(interval!);
            goToNextStretch();
            return stretches[currentIndex + 1]?.duration || 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval!);
  }, [hasStarted, currentIndex, isCompleted]);

  // ✅ Add workout to context when completed
  useEffect(() => {
    if (isCompleted && hasStarted) {
      addWorkout({
        name: "Stretching",
        duration: totalDurationMinutes,
        calories: totalCaloriesBurned,
        timestamp: new Date(),
      });
    }
  }, [isCompleted]);

  const goToNextStretch = () => {
    if (currentIndex + 1 < stretches.length) {
      setCurrentIndex((prev) => prev + 1);
      setRemainingTime(stretches[currentIndex + 1].duration);
    } else {
      setIsCompleted(true);
    }
  };

  const skipStretch = () => {
    goToNextStretch();
  };

  const restartModule = () => {
    setCurrentIndex(0);
    setRemainingTime(stretches[0].duration);
    setIsCompleted(false);
    setHasStarted(false);
  };

  if (hasStarted) {
    if (isCompleted) {
      return (
        <SafeAreaView className="flex-1 justify-center items-center bg-bgnd">
          <Ionicons name="checkmark-circle-outline" size={100} color="green" />
          <Text className="text-2xl font-bold mt-4">Module Completed!</Text>
          <Text className="text-lg mt-2">
            🎉 You burned {totalCaloriesBurned} kcal!
          </Text>
          <TouchableOpacity
            onPress={restartModule}
            className="bg-secondary mt-6 px-4 py-2 rounded-2xl"
          >
            <Text className="text-white text-lg">Restart Module</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    const currentStretch = stretches[currentIndex];

    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bgnd p-4">
        <Text className="text-lg text-gray-600 mb-2">
          Stretch {currentIndex + 1} of {stretches.length}
        </Text>
        <Text className="text-2xl font-bold mb-2">{currentStretch.name}</Text>
        <Image
          source={currentStretch.image}
          className="w-[80%] h-60 rounded-xl mb-4"
          resizeMode="contain"
        />
        <Text className="text-center text-base italic text-gray-700 mb-4">
          {currentStretch.description}
        </Text>

        <View className="flex-row items-center space-x-2 mb-6">
          <Ionicons name="time-outline" size={30} color="#333" />
          <Text className="text-3xl font-bold">{remainingTime}s</Text>
        </View>

        <TouchableOpacity
          onPress={skipStretch}
          className="bg-red-500 px-4 py-2 rounded-2xl"
        >
          <Text className="text-white text-lg">Skip Stretch</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-screen bg-bgnd">
      <ScrollView>
        <View className="w-[90vw] mx-auto mt-10 border-y-secondary border-x-bgnd py-2 border">
          <Text className="text-justify text-gray-600 text-base italic">
            Stretching plays a vital role in maintaining flexibility and range
            of motion in the joints. Regular stretching reduces muscle
            tightness, prevents injuries, and aids in recovery after workouts.
            It also promotes better posture and relaxation by alleviating
            tension in the muscles. As a gentle and soothing practice,
            stretching enhances blood circulation, relieves stress, and supports
            overall mobility, making it an essential component of a balanced
            fitness routine.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setHasStarted(true)}
          className="bg-secondary my-10 mx-auto px-6 py-3 rounded-2xl"
        >
          <View className="flex-row items-center space-x-2">
            <Ionicons name="play-circle-outline" size={30} color="white" />
            <Text className="text-white text-lg">Start Stretching Module</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
