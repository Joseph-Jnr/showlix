import { MovieCard, SearchBar } from "@/components";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useTheme } from "@/theme/ThemeProvider";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { background, foreground } = useTheme();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <Image source={images.bg} className="absolute w-full z-0" />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        className="mt-2 pb-32"
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 20,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
          paddingTop: 120,
        }}
        ListHeaderComponent={
          <>
            <Image source={icons.logo} className="w-12 h-10 mb-10 mx-auto" />

            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <Text
              className="text-lg font-bold mt-5 mb-3"
              style={{ color: foreground }}
            >
              Latest Movies
            </Text>
          </>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
        ListEmptyComponent={
          moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError ? (
            <Text className="text-red-500">Error: {moviesError?.message}</Text>
          ) : null
        }
      />
    </View>
  );
}
