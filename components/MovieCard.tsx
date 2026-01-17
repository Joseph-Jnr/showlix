import { icons } from "@/constants/icons";
import { useTheme } from "@/theme/ThemeProvider";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const { foreground } = useTheme();
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://res.cloudinary.com/dgyoeesf4/image/upload/v1768413813/-d9f3fb38-1174-4617-a880-d6af9530a899_tnwckh.jpg",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text
          className="text-sm font-bold mt-2"
          style={{ color: foreground }}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Rating */}
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs font-bold" style={{ color: foreground }}>
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        {/* Release Date */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-light-300 font-medium uppercase">
            Movie
          </Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
