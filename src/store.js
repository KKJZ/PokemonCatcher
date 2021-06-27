import { configureStore } from "@reduxjs/toolkit";
import { pokemonNameApi, pokemonListApi } from "./services/pokemon";
import pokemonSlice from "./services/pokemonSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [pokemonNameApi.reducerPath]: pokemonNameApi.reducer,
        [pokemonListApi.reducerPath]: pokemonListApi.reducer,
        pokemon: pokemonSlice,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(pokemonNameApi.middleware)
            .concat(pokemonListApi.middleware),
});
