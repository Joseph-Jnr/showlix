import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface Props {
  text1?: string;
  text2?: string;
  onPress?: () => void;
}

const CustomToast = ({ text1, text2, onPress }: Props) => {
  const { background, foreground, textLight } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 20,
        marginHorizontal: 12,
        backgroundColor: background,
        borderRadius: 999,
        paddingVertical: 14,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <View className="flex-row items-center gap-x-2">
        {/* <SaveAdd size={20} color={foreground} /> */}

        {text1 && (
          <Text
            style={{
              color: foreground,
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            {text1}
          </Text>
        )}

        {text2 && (
          <Text
            style={{
              color: textLight,
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {text2}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CustomToast;
