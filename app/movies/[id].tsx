import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useTheme } from "@/theme/ThemeProvider";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Play, Save2 } from "iconsax-react-nativejs";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import useFetch from "../../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  labelColor?: string;
  valueColor?: string;
}

const MovieInfo = ({
  label,
  value,
  labelColor,
  valueColor,
}: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-sm font-normal" style={{ color: labelColor }}>
        {label}
      </Text>
      <Text
        className="text-base font-normal mt-2"
        style={{ color: valueColor }}
      >
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { background, foreground, textLight, backgroundCardBold } = useTheme();
  const [isSaved, setIsSaved] = useState(false);

  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));

  const saveMovie = () => {
    setIsSaved(!isSaved);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <Pressable className="absolute inset-0 items-center justify-center">
            <View className="w-18 h-18 p-2 rounded-xl bg-black/50 items-center justify-center">
              <Play size={50} color="#fff" />
            </View>
          </Pressable>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-2xl font-bold" style={{ color: foreground }}>
            {movie?.title}
          </Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-sm" style={{ color: textLight }}>
              {movie?.release_date?.split("-")[0]}
            </Text>
            <View className="w-1 h-1 bg-light-200 rounded-xl" />
            <Text className="text-sm" style={{ color: textLight }}>
              {movie?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center justify-between w-full gap-x-5">
            <View
              className="flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2"
              style={{ backgroundColor: backgroundCardBold }}
            >
              <Image source={icons.star} className="size-4" />
              <Text className="font-bold text-sm" style={{ color: foreground }}>
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>

              <Text className="text-sm" style={{ color: textLight }}>
                ({movie?.vote_count} votes)
              </Text>
            </View>

            <BlurView
              intensity={20}
              tint="systemThinMaterialLight"
              className="rounded-2xl overflow-hidden"
              style={{ paddingHorizontal: 16, paddingVertical: 8 }}
            >
              <Pressable
                onPress={saveMovie}
                className="flex-row items-center justify-center"
              >
                <Save2
                  size={20}
                  color={foreground}
                  variant={isSaved ? "Bold" : "Linear"}
                />
                <Text
                  className="font-semibold text-base ml-2"
                  style={{ color: foreground }}
                >
                  Watch later
                </Text>
              </Pressable>
            </BlurView>
          </View>

          <MovieInfo
            label="Overview"
            value={movie?.overview}
            labelColor={foreground}
            valueColor={textLight}
          />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(", ") || "N/A"
            }
            labelColor={foreground}
            valueColor={textLight}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${Math.round(movie?.budget || 0) / 1_000_000} million`}
              labelColor={foreground}
              valueColor={textLight}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue || 0) / 1_000_000}`}
              labelColor={foreground}
              valueColor={textLight}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company) => company.name)
                .join(", ") || "N/A"
            }
            labelColor={foreground}
            valueColor={textLight}
          />
        </View>
      </ScrollView>

      <Pressable
        onPress={router.back}
        className="flex flex-row items-center justify-center absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-full py-3.5 z-50"
      >
        <ArrowLeft size={20} color="#fff" />
        <Text className="text-white font-semibold text-base ml-2">Go back</Text>
      </Pressable>
    </View>
  );
};

export default MovieDetails;
