import { Tabs } from "expo-router";
import { StatusBar, View } from "react-native";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
export default function _Mainlayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF9D3D",
        },
        headerTintColor: "white",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FEEE91",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "black" },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome5 name="home" color={color} size={20} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Workout"
        options={{
          headerTitle: "Plans",
          headerTitleAlign: "left",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dumbbell" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
