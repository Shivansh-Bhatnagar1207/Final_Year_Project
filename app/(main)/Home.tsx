import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabase";
import { Link, router } from "expo-router";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, UserResponse } from "@supabase/supabase-js";
import { Pedometer } from "expo-sensors";
import { Linking } from "react-native";

type Profile = {
  goal: string;
  height: number;
  weight: number;
};

export default function Home() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  const [user, setUser] = useState<UserResponse | null>();
  const [id, setId] = useState<string | null>();
  const [bmi, setBmi] = useState<string>("0.00");
  const { width } = Dimensions.get("window");
  const CARD_WIDTH = width * 0.9;
  const SLIDE_COUNT = 3;

  // Shared value for scroll tracking
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  useEffect(() => {
    Pedometer.isAvailableAsync().then(setIsAvailable);

    const subscription = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    async function getSessionId() {
      const user = await supabase.auth.getUser();
      setId(user.data.user?.id);
      setUser(user);
    }
    getSessionId();
  }, []);

  function openwebsite(link: string) {
    Linking.openURL(link);
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user || !id) return; // Make sure user and id are available

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          throw error;
        }

        setProfileData(data);

        if (data?.height && data?.weight) {
          const heightInMeters = data.height / 100; // Convert height from cm to meters
          const calculatedBmi = data.weight / (heightInMeters * heightInMeters); // BMI formula
          setBmi(calculatedBmi.toFixed(2));
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user && id) {
      fetchProfileData();
    }
  }, [user, id]); // Re-run fetchProfileData whenever user or id changes

  // BMI calculation
  const calculateBmi = useCallback((profile: Profile) => {
    if (profile.height && profile.weight) {
      const heightInMeters = profile.height / 100; // Convert height from cm to meters
      const calculatedBmi = profile.weight / (heightInMeters * heightInMeters); // BMI formula
      setBmi(calculatedBmi.toFixed(2)); // Set BMI with 2 decimals
    }
  }, []);

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
  if (!profileData || !bmi) {
    return (
      <SafeAreaView className="bg-bgnd h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-bgnd h-full">
      <ScrollView>
        <>
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
                  {profileData?.height ? `${profileData.height} cm` : "N/A"}
                </Text>
                <Text className="text-base p-2">
                  <Text className="font-semibold">Weight: </Text>
                  {profileData?.weight ? `${profileData.weight} kg` : "N/A"}
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

            {/* Discover Section with Smooth Slider */}
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
                {/* Slide 1 */}
                <CardSlide title="Small changes, big results!" />
                {/* Slide 2 */}
                <CardSlide title="Monitor your cycle with ease" />
                {/* Slide 3 */}
                <CardSlide title="Track your daily calorie intake" />
              </Animated.ScrollView>
            </View>
            <View className="flex-row justify-center h-52 w-[85%]    mx-auto rounded-3xl overflow-hidden mt-5">
              <Image
                source={require("@/assets/images/stepImage.jpg")}
                className="h-80 "
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
            <ImageBackground
              source={require("@/assets/images/background.jpg")}
              className="flex-row justify-center my-5 border-primary border mx-auto rounded-full bg-secondary overflow-hidden"
            >
              <View className="h-20 w-30 px-5 flex items-center justify-center">
                <Text className="font-bold text-lg text-white ">0.00</Text>
                <Text className=" font-bold text-lg text-white">KCAL</Text>
              </View>
              <View className="h-20 w-30 px-5 flex items-center justify-center">
                <Text className="font-bold text-lg text-white ">0</Text>
                <Text className="font-bold text-lg text-white">WORKOUTS</Text>
              </View>
              <View className="h-20 w-30 px-5 flex items-center justify-center">
                <Text className="font-bold text-lg text-white">0</Text>
                <Text className="font-bold text-lg text-white">MINUTES</Text>
              </View>
            </ImageBackground>

            {/* Actions */}
            <View className="flex-row mx-auto  mb-10 gap-4 h-60">
              <View className="flex justify-between">
                <TouchableOpacity
                  onPress={() =>
                    openwebsite(
                      "https://www.calculator.net/calorie-calculator.html"
                    )
                  }
                >
                  <ImageBackground
                    source={require("@/assets/images/btnbg.jpg")}
                    className="flex items-center justify-center w-44 h-24 rounded-3xl border-primary border overflow-hidden"
                    resizeMode="cover"
                  >
                    <Text className="font-semibold text-orange-500 bg-white/75">
                      Get Intake{" "}
                      <MaterialCommunityIcons
                        name="food-outline"
                        size={20}
                        color={"#f97316"}
                      />
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <ActionButton
                  onPress={() =>
                    openwebsite(
                      "https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/"
                    )
                  }
                  title="Hydration"
                  icon="water-outline"
                />
              </View>
              <ImageBackground
                source={require("@/assets/images/hero.jpg")}
                className="w-56 h-full bg-white rounded-3xl overflow-hidden border border-primary"
                resizeMode="cover"
              />
            </View>
          </View>
        </>
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
