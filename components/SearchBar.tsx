import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

const SearchBar = ({
  onPress,
  placeholder,
  onChangeText,
  value,
}: SearchBarProps) => {
  const clearInput = () => {
    onChangeText?.("");
  };

  return (
    <View className="flex flex-row items-center justify-between bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onFocus={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />

      {!!value && (
        <TouchableOpacity
          className="w-10 h-10 flex flex-row items-center justify-center rounded"
          onPress={clearInput}
        >
          <Text className="text-gray-500 text-lg">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
