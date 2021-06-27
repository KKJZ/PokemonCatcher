import React from "react";
import { Typography, Button, Modal, Grid, makeStyles } from "@material-ui/core";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
import { useDispatch } from "react-redux";
import { addPokemonName, removePokemonName } from "../../services/pokemonSlice";

function PokemonListItem(props) {
    const { pokemon, history, key } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const classes = ListStyles();

    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemon.name);

    const nameThePokemon = () => {
        history.push("name-pokemon");
    };

    const handleOpen = () => {
        console.log("Open!");
        dispatch(addPokemonName(pokemon.name));
        setOpen(true);
    };

    const handleClose = () => {
        dispatch(removePokemonName);
        setOpen(false);
    };

    console.log(data);

    return (
        <Grid item xs={6} key={key}>
            <div className={classes.container}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleOpen}
                >
                    {pokemon.name}
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby={`${pokemon.name} Modal`}
                    aria-describedby={`Modal for capturing ${pokemon.name}`}
                >
                    <Grid container className={classes.modalContainer}>
                        <Typography className={classes.heading}>
                            {pokemon.name}
                        </Typography>
                        {error ? (
                            <h2>Oh no there was an error</h2>
                        ) : isLoading ? (
                            <h3>Pokemon Loading...</h3>
                        ) : (
                            <>
                                <img
                                    src={data.sprites.front_default}
                                    alt={pokemon.name}
                                />
                                {/* Clicking on a pokemon in the list shows the pokemons abilities */}
                                <Grid
                                    container
                                    className={classes.abilityWrapper}
                                >
                                    <h3 className={classes.abilities}>
                                        {data.abilities.length > 1
                                            ? "Abilities"
                                            : "Ability"}
                                    </h3>
                                    {data.abilities.map((ability, i) => (
                                        <Grid
                                            item
                                            xs={4}
                                            className={classes.abilities}
                                        >
                                            {ability.ability.name}
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {/* Clicking catch the pokemon will take you to /name-pokemon */}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => nameThePokemon(pokemon.name)}
                        >
                            Catch Pokemon
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </Grid>
                </Modal>
            </div>
        </Grid>
    );
}

const ListStyles = makeStyles({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    heading: {
        fontSize: "1em",
        textTransform: "capitalize",
    },
    button: { marginBottom: "1em" },
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        maxWidth: "50vw",
        margin: "0 auto",
        position: "relative",
        top: "30vh",
        flexDirection: "column",
        padding: "15px",
    },
    abilityWrapper: {
        marginTop: "1em",
        marginBottom: "1em",
    },
    abilities: {
        textAlign: "center",
        textTransform: "capitalize",
        width: "100%",
    },
});

export default PokemonListItem;
