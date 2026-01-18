import { useTheme } from "@/theme/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useSegments } from "expo-router";
import { Home2, Save2, SearchNormal1, User } from "iconsax-react-nativejs";
import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const TAB_COUNT = 4;
const H_PADDING = 20;
const TAB_BAR_HORIZONTAL_PADDING = 10;
const TAB_BAR_WIDTH = width - H_PADDING * 2 - TAB_BAR_HORIZONTAL_PADDING;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

const ROUTE_INDEX: Record<string, number> = {
  index: 0,
  search: 1,
  saved: 2,
  profile: 3,
};

interface TabIconProps {
  focused: boolean;
  icon: any;
  title: string;
  iconColor: string;
}

const TabIcon = ({ focused, icon: Icon, title, iconColor }: TabIconProps) => {
  if (focused) {
    return (
      <View className="flex flex-row w-full flex-1 min-w-[80px] min-h-12 mt-4 justify-center items-center">
        <Icon color="#eef2f6" size={20} />
        <Text className="text-[#eef2f6] text-base font-semibold ml-2">
          {title}
        </Text>
      </View>
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
  const segments = useSegments();

  const translateX = useSharedValue(0);

  useEffect(() => {
    const current = segments[segments.length - 1];
    const index = ROUTE_INDEX[current] ?? 0;

    translateX.value = withSpring(index * TAB_WIDTH, {
      damping: 18,
      stiffness: 160,
      mass: 0.9,
    });
  }, [segments]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: TAB_WIDTH,
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
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarBackground: () => (
          <View className="absolute inset-0 flex-row items-center">
            <Animated.View
              style={[
                {
                  width: TAB_WIDTH,
                  height: 48,
                  marginLeft: 4,
                  borderRadius: 999,
                  overflow: "hidden",
                },
                indicatorStyle,
              ]}
            >
              <LinearGradient
                colors={["#de2626ff", "#d2211aff", "#8B0000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                }}
              />
            </Animated.View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Home2}
              title="Home"
              iconColor={icon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={SearchNormal1}
              title="Search"
              iconColor={icon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Save2}
              title="Saved"
              iconColor={icon}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={User}
              title="Profile"
              iconColor={icon}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
