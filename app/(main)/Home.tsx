import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Linking,
} from "react-native";
import * as Progress from "react-native-progress";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pedometer } from "expo-sensors";
import { useWorkout } from "@/Hooks/WorkoutContext";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type Profile = {
  goal: string;
  height: number;
  weight: number;
  FirstLogin: boolean;
};

export default function Home() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [steps, setSteps] = useState(0);
  const [redirecting, setRedirecting] = useState(false);
  const [bmi, setBmi] = useState<string>("0.00");

  const [userId, setUserId] = useState<string | null>(null);
  const { width } = Dimensions.get("window");
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const router = useRouter();
  const { totalCalories, totalWorkouts, totalMinutes } = useWorkout();

  // 1. Setup Pedometer
  useEffect(() => {
    let subscription: any;
    Pedometer.isAvailableAsync().then((available) => {
      if (available) {
        subscription = Pedometer.watchStepCount((result) => {
          setSteps(result.steps);
        });
      }
    });
    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // 2. Get logged-in user's ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    };
    fetchUser();
  }, []);

  // 3. Fetch profile data and calculate BMI
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) throw error;

        setProfileData(data);
        if (data.height && data.weight) {
          const heightInMeters = data.height / 100;
          const calculatedBmi = data.weight / (heightInMeters * heightInMeters);
          setBmi(calculatedBmi.toFixed(2));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [userId]);

  // 4. Redirect if first login
  useEffect(() => {
    if (profileData?.FirstLogin && !redirecting) {
      setRedirecting(true);
      router.replace("/(auth)/User");
    }
  }, [profileData?.FirstLogin, redirecting]);

  // 5. BMI Category logic
  const getBmiCategory = () => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5)
      return { category: "Underweight", color: "text-red-500" };
    if (bmiValue >= 18.5 && bmiValue < 24.9)
      return { category: "Normal weight", color: "text-green-500" };
    if (bmiValue >= 25 && bmiValue < 29.9)
      return { category: "Overweight", color: "text-orange-500" };
    return { category: "Obesity", color: "text-black" };
  };

  const { category, color } = getBmiCategory();

  if (!profileData || redirecting) {
    return (
      <SafeAreaView className="bg-bgnd h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-bgnd h-full">
      <ScrollView>
        <View>
          {/* Logo */}
          <Image
            source={require("@/assets/images/fitness.png")}
            className="w-full h-[84px] mt-5"
            resizeMode="cover"
          />

          {/* BMI Section */}
          <View className="py-5 bg-white w-[95vw] my-10 mx-auto px-5 rounded-3xl border border-primary">
            <View className="flex-row justify-between">
              <Text className="text-base p-2">
                <Text className="font-semibold">Height: </Text>
                {profileData?.height ?? "N/A"} cm
              </Text>
              <Text className="text-base p-2">
                <Text className="font-semibold">Weight: </Text>
                {profileData?.weight ?? "N/A"} kg
              </Text>
            </View>
            <Text className="text-center my-2">Your BMI is:</Text>
            <Text className={`text-center ${color} text-4xl font-extrabold`}>
              {bmi}
            </Text>
            <Text className="text-center">
              According to this, you are{" "}
              <Text className={`${color}`}>{category}</Text>
            </Text>
            <View className="flex-row mt-5">
              <View className="h-5 w-[25%] bg-red-500"></View>
              <View className="h-5 w-[25%] bg-green-500"></View>
              <View className="h-5 w-[25%] bg-orange-500"></View>
              <View className="h-5 w-[25%] bg-black"></View>
            </View>
            <View className="flex-row">
              <View className="h-10 w-[25%] ">
                <Text className="text-center">Under Weight</Text>
              </View>
              <View className="h-10 w-[25%] ">
                <Text className="text-center">Normal</Text>
              </View>
              <View className="h-10 w-[25%] ">
                <Text className="text-center">Over Weight</Text>
              </View>
              <View className="h-10 w-[25%] ">
                <Text className="text-center">Obesity</Text>
              </View>
            </View>
          </View>

          {/* Discover Section */}
          <View className="mb-2">
            <Text className="px-5 text-3xl font-bold text-accent">
              Discover <Text className="text-2xl">🧭</Text>
            </Text>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              className="mt-5"
            >
              <CardSlide title="Small changes, big results!" />
              <CardSlide title="Monitor your cycle with ease" />
              <CardSlide title="Track your daily calorie intake" />
            </Animated.ScrollView>
          </View>

          {/* Steps Section */}
          <View className="flex-row justify-center h-52 w-[85%] mx-auto rounded-3xl overflow-hidden mt-5">
            <Image
              source={require("@/assets/images/stepImage.jpg")}
              className="h-80"
              resizeMode="contain"
            />
          </View>
          <View className="px-5 py-2 w-[75%] rounded-b-3xl mx-auto flex-row justify-between items-center border border-t-0 border-secondary bg-white ">
            <Text className=" text-accent font-bold text-2xl text-center">
              Steps
            </Text>
            <Text className=" text-accent font-bold text-2xl text-center">
              {steps}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CardSlide = ({ title }: { title: string }) => (
  <View
    style={{
      width: Dimensions.get("window").width * 0.9,
      marginHorizontal: 10,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: "white",
    }}
  >
    <ImageBackground
      source={require("@/assets/images/confetti3.jpg")}
      className="flex-1 justify-center px-5 h-32 w-full"
      resizeMode="cover"
    >
      <Text className="text-xl text-white font-bold">{title}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        className="bg-secondary h-8 w-28 rounded-full mt-2"
      >
        <Text className="text-white text-lg text-center font-semibold">
          Track Now
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

const ActionButton = ({
  onPress,
  title,
  icon,
}: {
  onPress: () => void;
  title: string;
  icon: string;
}) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      source={require("@/assets/images/btnbg.jpg")}
      className="flex items-center justify-center w-44 h-24 rounded-3xl border-primary border overflow-hidden"
      resizeMode="cover"
    >
      <Text className="font-semibold text-orange-500">
        {title} <Ionicons name={icon} size={20} color={"#f97316"} />
      </Text>
    </ImageBackground>
  </TouchableOpacity>
);
