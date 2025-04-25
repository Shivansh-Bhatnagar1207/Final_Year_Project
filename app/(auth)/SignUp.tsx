import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Switch } from "@rneui/themed";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else {
      alert("Please Activate your account via Email");
      router.replace("/(auth)/User");
    }
  };
  return (
    <SafeAreaView className="bg-bgnd h-full">
      <ScrollView>
        <View className="w-full h-full justify-center min-h-[85vh] px-4 my-6 ">
          <Image
            source={require("@/assets/images/fitness.png")}
            className="w-full h-[84px]"
            resizeMode="cover"
          />
          <Text className="font-bold text-xl text-center">
            Register into Fitness App
          </Text>

          <View className="flex w-[80vw] mx-auto mb-2">
            <Text className="text-lg">Email</Text>
            <TextInput
              className="border border-gray-500 w-full h-10 p-2"
              placeholder="Enter Email"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View className="flex w-[80vw] mx-auto mb-2">
            <Text className="text-lg">Password</Text>
            <TextInput
              className="border border-gray-500 w-full h-10 p-2"
              placeholder="Enter Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
            />
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-700">Show Password</Text>
              <Switch
                value={showPassword}
                onValueChange={(value) => setShowPassword(value)}
                thumbColor={showPassword ? "#FFB74D" : "#D1D5DB"}
                trackColor={{ false: "#D1D5DB", true: "#FFB74D" }}
              />
            </View>
            <TouchableOpacity
              className="bg-orange-500 mt-10 rounded-xl min-h-[52px] items-center justify-center"
              onPress={handleSignup}
            >
              <Text className="text-2xl font-bold text-white">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500 font-bold">
              Already have an account?
            </Text>
            <Link href={"/(auth)/SignIn"} className="text-lg text-orange-400">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
