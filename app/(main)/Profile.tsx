import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState<string | null>();
  const [id, setId] = useState<string | null>();
  const [profile, setProfile] = useState<string | null>();
  useEffect(() => {
    async function test() {
      const user = await supabase.auth.getUser();
      setId(user.data.user?.id);
      setUser(user);
    }
    test();
  }, []);

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

        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user && id) {
      fetchProfileData();
    }
  }, [user, id]); // Re-run fetchProfileData whenever user or id changes
  if (!profile) {
    return (
      <SafeAreaView className="bg-bgnd h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-bgnd h-full">
      <ScrollView>
        <View className="py-10">
          <Image
            source={require("@/assets/images/fitness.png")}
            className="w-full h-[84px] "
            resizeMode="cover"
          />
          <Text className="font-bold text-2xl text-center mt-10">
            Profile Information
          </Text>

          <View className=" gap-4 items-center mt-10">
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="text-center font-bold text-lg">
                Name : <Text className="font-normal">{profile.full_name}</Text>
              </Text>
            </View>
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="text-center font-bold text-lg">
                Phone : <Text className="font-normal">{profile.phone}</Text>
              </Text>
            </View>
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="text-center font-bold text-lg">
                Height : <Text className="font-normal">{profile.height} M</Text>
              </Text>
            </View>
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="font-bold text-center">
                Weight :{" "}
                <Text className="font-normal">{profile.weight} KG</Text>
              </Text>
            </View>
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="text-center font-bold text-lg">
                Gender : <Text className="font-normal">{profile.gender}</Text>
              </Text>
            </View>
            <View className="h-16 w-[80%] bg-white border justify-center rounded-3xl">
              <Text className="text-center font-bold text-lg">
                Goal : <Text className="font-normal">{profile.goal}</Text>
              </Text>
            </View>
          </View>
          <View className="w-[90%] mx-auto">
            {/* <Btn title="Sign Out" handlePress={handleLogout} /> */}
            <TouchableOpacity className="bg-orange-500 h-16bg-orange-500 mt-10 rounded-xl min-h-[52px] items-center justify-center">
              <Text
                className="text-2xl text-white font-bold p-2"
                onPress={async () => await supabase.auth.signOut()}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
