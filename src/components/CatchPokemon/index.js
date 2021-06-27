import React from "react";
import { useGetPokemonListQuery } from "../../services/pokemon";
import { Grid } from "@material-ui/core";
import PokemonListItem from "./PokemonListItem";

function CatchPokemon(props) {
    const { history } = props;
    const { data, error, isLoading } = useGetPokemonListQuery();

    return (
        <>
            <h1 id="Catch-title">Catch Pokemon</h1>
            {/* Show the 10 Pokemon */}
            {error ? (
                <h2>Oh no there was an issue.</h2>
            ) : isLoading ? (
                <h2>Loading</h2>
            ) : (
                <Grid container>
                    {data.results.map((pokemon) => {
                        return (
                            <PokemonListItem
                                pokemon={pokemon}
                                history={history}
                                key={pokemon.id}
                            />
                        );
                    })}
                </Grid>
            )}
        </>
    );
}

export default CatchPokemon;
