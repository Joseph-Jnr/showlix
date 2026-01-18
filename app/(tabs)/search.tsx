import { MovieCard, SearchBar } from "@/components";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useTheme } from "@/theme/ThemeProvider";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<TextInput>(null);

  const { background, foreground } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }, []),
  );

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-between mt-20">
              <Image
                source={icons.logo}
                className="w-16 h-16 mb-10 mx-auto"
                resizeMode="contain"
              />
            </View>

            <View className="my-5">
              <SearchBar
                inputRef={searchInputRef}
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl font-bold" style={{ color: foreground }}>
                Search results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#0000ff" className="my-3" />
          ) : error ? (
            <Text className="text-red-500 px-5 my-3">
              Error: {error?.message}
            </Text>
          ) : (
            <View className="mt-10 px-5">
              {searchQuery.trim() ? (
                <View className="flex flex-col gap-2">
                  <Image
                    source={images.noResult}
                    className="w-32 h-32 mx-auto"
                  />
                  <Text className="text-center text-gray-500">
                    No movies found
                  </Text>
                </View>
              ) : (
                <View className="flex flex-col gap-2">
                  <Image source={images.search} className="w-32 h-32 mx-auto" />
                  <Text className="text-center text-gray-500">
                    Start typing to search
                  </Text>
                </View>
              )}
            </View>
          )
        }
      />
    </View>
  );
};

export default Search;
