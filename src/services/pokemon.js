import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const offset = Math.floor(Math.random() * 100);

// Define a service using a base URL and expected endpoints
export const pokemonNameApi = createApi({
    reducerPath: "pokemonNameApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
    }),
});

export const pokemonListApi = createApi({
    reducerPath: "pokemonListApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (builder) => ({
        getPokemonList: builder.query({
            query: () => `pokemon?limit=10&offset=${offset}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonNameApi;
export const { useGetPokemonListQuery } = pokemonListApi;
