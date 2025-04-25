import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "@/global.css";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView className="h-full bg-bgnd">
      <ScrollView>
        <View className="w-full px-4 justify-center mt-28">
          <Image
            source={require("@/assets/images/fitness.png")}
            className="w-full h-[84px] "
            resizeMode="cover"
          />
        </View>
        <View className="w-full px-4 justify-center mt-24">
          <Image
            source={require("@/assets/images/loader.gif")}
            className="w-full h-80 mx-auto "
            resizeMode="contain"
          />
        </View>
        <View className=" w-36 mx-auto mt-20">
          <Text className="text-3xl  font-bold text-center">
            Lets Do it with <Text className="text-accent">Our App</Text>
          </Text>
          <TouchableOpacity className="bg-orange-500 h-16bg-orange-500 mt-10 rounded-xl min-h-[52px] items-center justify-center">
            <Text
              className="text-2xl text-white font-bold p-2"
              onPress={() => router.push("/Home")}
            >
              Let's Begin
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
