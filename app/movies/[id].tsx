import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 text-sm font-normal">{label}</Text>
      <Text className="text-light-100 text-base font-normal mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-2xl font-bold">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <View className="w-1 h-1 bg-light-200 rounded-xl" />
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(", ") || "N/A"
            }
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${Math.round(movie?.budget || 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue || 0) / 1_000_000}`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company) => company.name)
                .join(", ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={router.back}
        className="flex flex-row items-center justify-center absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-full py-3.5 z-50"
      >
        <ArrowLeft size={20} color="#fff" />
        <Text className="text-white font-semibold text-base ml-2">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
