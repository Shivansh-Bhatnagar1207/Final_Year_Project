import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Meditation() {
  return (
    <SafeAreaView className="h-screen bg-bgnd">
      <ScrollView>
        <View className="w-[90vw] mx-auto mt-10 mb-24 border-y-secondary border-x-bgnd py-2 border">
          <Text className="text-justify text-gray-600 text-base italic">
            Meditation is a powerful tool for calming the mind and cultivating
            inner peace. By focusing on the present moment or a particular
            object of attention, meditation helps reduce stress, anxiety, and
            negative thought patterns. It improves concentration, emotional
            regulation, and self-awareness. With consistent practice, meditation
            promotes relaxation, enhances mental clarity, and nurtures a sense
            of balance and well-being. It's a transformative practice for
            fostering mindfulness and emotional harmony.
          </Text>
        </View>
        <View>
          <Image
            source={require("@/assets/images/meditation/meditation.gif")}
            className="w-[85%] h-80 mx-auto"
            resizeMode="contain"
          />
        </View>
        <View className="">
          <Text className="text-center font-semibold italic">
            Deep Breath for 10 mins {"\n"} Go with the flow
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
