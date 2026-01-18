import { useTheme } from "@/theme/ThemeProvider";
import { SearchNormal1 } from "iconsax-react-nativejs";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface SearchBarProps {
  onPress?: () => void;
  placeholder: string;
  onChangeText?: (text: string) => void;
  value?: string;
  inputRef?: React.Ref<TextInput>;
}

const SearchBar = ({
  onPress,
  placeholder,
  onChangeText,
  value,
  inputRef,
}: SearchBarProps) => {
  const { foreground, icon, bgCard } = useTheme();

  const clearInput = () => {
    onChangeText?.("");
  };

  return (
    <View
      className="flex flex-row items-center justify-between rounded-full px-5 py-4"
      style={{ backgroundColor: bgCard }}
    >
      <SearchNormal1 color="#ab8bff" size={20} />
      <TextInput
        ref={inputRef}
        onFocus={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2"
        style={{ color: foreground }}
      />

      {!!value && (
        <Pressable
          className="w-10 h-10 flex flex-row items-center justify-center rounded"
          onPress={clearInput}
        >
          <Text className="text-lg" style={{ color: icon }}>
            ✕
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
