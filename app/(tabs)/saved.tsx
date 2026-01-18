import { MovieCard } from "@/components";
import { useSavedMovies } from "@/store";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

const Saved = () => {
  const router = useRouter();
  const { background, foreground, textLight } = useTheme();
  const { savedMovies } = useSavedMovies();

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <View className="flex-row items-center justify-between px-5 py-4 mt-16">
        <Text className="text-[28px] font-bold" style={{ color: foreground }}>
          Watch later
        </Text>
      </View>

      {/* Saved movies */}
      {savedMovies.length === 0 ? (
        <Text
          className="text-center mt-20 text-base"
          style={{ color: textLight }}
        >
          No saved movies yet
        </Text>
      ) : (
        <FlatList
          data={savedMovies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          className="mt-2 pb-32"
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 20,
          }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
          renderItem={({ item }) => <MovieCard {...item} />}
        />
      )}
    </View>
  );
};

export default Saved;
