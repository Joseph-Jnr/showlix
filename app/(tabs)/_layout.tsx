import { images } from "@/constants/images";
import { useTheme } from "@/theme/ThemeProvider";
import { Tabs } from "expo-router";
import { Home2, Save2, SearchNormal1, User } from "iconsax-react-nativejs";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
  iconColor: string;
}

const TabIcon = ({ focused, icon: Icon, title, iconColor }: TabIconProps) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[80px] min-h-12 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Icon color="#151312" size={20} />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Icon color={iconColor} size={20} />
    </View>
  );
};

const TabLayout = () => {
  const { tabBarBackground, icon } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: tabBarBackground,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 54,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          paddingHorizontal: 6,
          borderColor: tabBarBackground,
          shadowColor: "#00000077",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconColor={icon}
              focused={focused}
              icon={Home2}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconColor={icon}
              focused={focused}
              icon={SearchNormal1}
              title="Search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconColor={icon}
              focused={focused}
              icon={Save2}
              title="Saved"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconColor={icon}
              focused={focused}
              icon={User}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
