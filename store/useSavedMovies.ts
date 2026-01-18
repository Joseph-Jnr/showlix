import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SavedMovie {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
}

interface SavedMoviesState {
  savedMovies: SavedMovie[];
  addMovie: (movie: SavedMovie) => void;
  removeMovie: (id: number) => void;
  isSaved: (id: number) => boolean;
}

export const useSavedMovies = create<SavedMoviesState>()(
  persist(
    (set, get) => ({
      savedMovies: [],

      addMovie: (movie) =>
        set((state) => {
          if (state.savedMovies.some((m) => m.id === movie.id)) {
            return state;
          }
          return { savedMovies: [...state.savedMovies, movie] };
        }),

      removeMovie: (id) =>
        set((state) => ({
          savedMovies: state.savedMovies.filter((m) => m.id !== id),
        })),

      isSaved: (id) => get().savedMovies.some((m) => m.id === id),
    }),
    {
      name: "saved-movies-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
