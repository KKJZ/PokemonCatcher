import React from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard.js";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
import {
    applySelectedName,
    applyNoName,
    changingSelectedName,
    resetSelected,
} from "../../services/pokemonSlice";

function NamePokemon(props) {
    const { pokemonName, name } = useSelector(
        (state) => state.pokemon.selected
    );
    const dispatch = useDispatch();
    const { history } = props;
    const classes = NameStyles();
    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);

    if (pokemonName === "") {
        history.push("/");
    }
    const handleClose = () => {
        dispatch(applyNoName());
        dispatch(resetSelected());
    };
    const handleChange = (e) => {
        dispatch(changingSelectedName(e.target.value));
    };
    const handleSubmit = () => {
        dispatch(applySelectedName());
        dispatch(resetSelected());
    };

    return (
        <>
            {error ? (
                <h2>Oh no there was an error</h2>
            ) : isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <h1 className={classes.heading}>Name Your Pokemon</h1>
                    <PokemonCard
                        data={data}
                        name={name}
                        handleChange={handleChange}
                        handleClose={handleClose}
                        handleSubmit={handleSubmit}
                        type="NEW"
                    />
                </>
            )}
        </>
    );
}

const NameStyles = makeStyles({
    media: { height: "30vh", backgroundSize: "contain" },
    heading: {
        textTransform: "capitalize",
    },
    type: {
        textAlign: "center",
        textTransform: "capitalize",
    },
});

export default NamePokemon;
