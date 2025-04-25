import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/Hooks/AuthContext";
export default function User() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    async function getsession() {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      if (userId) setId(userId); // ✅ Save to state
    }
    getsession();
  }, []);
  const handleSubmit = async () => {
    if (!name || !phone || !age || !gender || !height || !weight || !goal) {
      Alert.alert("All fields are required");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        phone,
        age,
        gender,
        height,
        weight,
        goal,
      })
      .eq("id", id); // ✅ Match existing user by ID

    if (error) {
      console.error(error);
      Alert.alert("Error saving profile", error.message);
    } else {
      Alert.alert("Profile saved successfully!");
      router.push("/(main)/Home");
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full h-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={require("@/assets/images/fitness.png")}
            resizeMode="cover"
            className="w-full h-32"
          />
          <Text className="font-bold text-center text-2xl mb-4">
            User Details
          </Text>
          <View className="w-[80%] mx-auto flex gap-2">
            <Text className="text-lg font-bold">Name:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Text className="text-lg font-bold">Phone:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <Text className="text-lg font-bold">Age:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            <Text className="text-lg font-bold">Height:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Height (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <Text className="text-lg font-bold">Weight:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Text className="text-lg font-bold">Gender:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Gender"
              value={gender}
              onChangeText={setGender}
            />
            <Text className="text-lg font-bold">Goal:</Text>
            <TextInput
              className="border h-10 rounded-lg px-4"
              placeholder="Goal (e.g., lose weight)"
              value={goal}
              onChangeText={setGoal}
            />

            <TouchableOpacity
              className="bg-orange-500 h-16 mt-10 rounded-xl items-center justify-center"
              onPress={handleSubmit}
            >
              <Text className="text-2xl font-bold text-white">
                Complete Registration
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
