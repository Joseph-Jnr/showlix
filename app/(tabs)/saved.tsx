import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Text, View } from "react-native";

const Saved = () => {
  const { background } = useTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <Text>Saved</Text>
    </View>
  );
};

export default Saved;
