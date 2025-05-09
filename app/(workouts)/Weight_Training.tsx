import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WTCard from "./_Components/WTCard";
export default function Weight_Training() {
  const WT = [
    {
      name: "Bicep Curls",
      reps: 10,
      image: require("@/assets/images/WT/g1.gif"),
      caloriesPerSet: 15,
    },
    {
      name: "OverHead Tricep Extentions",
      reps: 10,
      image: require("@/assets/images/WT/g2.gif"),
      caloriesPerSet: 8,
    },
    {
      name: "Weighted Squats",
      reps: 10,
      image: require("@/assets/images/WT/g3.gif"),
      caloriesPerSet: 12,
    },
    {
      name: "Inclined Bench Press",
      reps: 10,
      image: require("@/assets/images/WT/g4.gif"),
      caloriesPerSet: 12,
    },
    {
      name: "Lat Pulldown",
      reps: 10,
      image: require("@/assets/images/WT/g5.gif"),
      caloriesPerSet: 12,
    },
    {
      name: "Shoulder Press",
      reps: 10,
      image: require("@/assets/images/WT/g6.gif"),
      caloriesPerSet: 12,
    },
  ];
  return (
    <SafeAreaView className="h-screen bg-bgnd">
      <ScrollView>
        <View className="w-[90vw] mx-auto mt-10    border-y-secondary border-x-bgnd py-2 border">
          <Text className="text-justify text-gray-600 text-base italic">
            Weight training builds strength, enhances muscle tone, and increases
            metabolic efficiency. Lifting weights or using resistance exercises
            supports joint health and improves bone density, reducing the risk
            of osteoporosis. It can also aid in achieving fitness goals by
            sculpting the body and boosting overall physical performance. Beyond
            the physical benefits, weight training fosters a sense of
            accomplishment, increases energy levels, and supports mental
            toughness and confidence.
          </Text>
        </View>
        <View className="py-10">
          {WT.map((exercise, idx) => (
            <WTCard key={idx} {...exercise} />
          ))}
        </View>
        <View className="h-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
