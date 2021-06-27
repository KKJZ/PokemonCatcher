import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
import {
    changingSelectedName,
    resetSelected,
    updatePartyName,
} from "../../services/pokemonSlice";
import PokemonCard from "../PokemonCard.js";

function PokemonProfile(props) {
    const { history } = props;
    const dispatch = useDispatch();

    const { name, pokemonName, partyId } = useSelector(
        (state) => state.pokemon.selected
    );
    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);

    if (pokemonName === "") {
        history.push("/");
    }

    const handleChange = (e) => {
        dispatch(changingSelectedName(e.target.value));
    };
    const handleClose = () => {
        dispatch(resetSelected());
        history.push("/");
    };
    const handleSubmit = () => {
        dispatch(updatePartyName(partyId));
        dispatch(resetSelected());
        history.push("/");
    };

    return (
        <>
            <h1>Pokemon Profile</h1>
            {error ? (
                <h2>Oh no there was an error</h2>
            ) : isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <PokemonCard
                    data={data}
                    name={name}
                    handleClose={handleClose}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    type="UPDATE"
                />
            )}
        </>
    );
}

export default PokemonProfile;
