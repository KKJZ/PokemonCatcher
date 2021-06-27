import React from "react";
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Button,
    Grid,
    makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useGetPokemonByNameQuery } from "../../services/pokemon";
import { useDispatch } from "react-redux";
import { updateParty } from "../../services/pokemonSlice";

function PartyPokemonList(props) {
    const { name, pokemonName, id, history } = props;
    const dispatch = useDispatch();
    const classes = PartyStyles();

    const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);

    const handleNameSelection = () => {
        console.log(id);
        dispatch(updateParty(id));
        history.push("/pokemon-profile");
    };

    return (
        <>
            {error ? (
                <h2>Oh no there was an error</h2>
            ) : isLoading ? (
                <h3>Loading Party List...</h3>
            ) : (
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            {name === "" ? `${pokemonName}` : `${name}`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container className={classes.wrapper}>
                            <Grid item xs={12}>
                                {name === "" ? null : (
                                    <Typography className={classes.subheading}>
                                        Normally {pokemonName}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {data.sprites === undefined ? (
                                    <h2>Image unavaible...</h2>
                                ) : (
                                    <img
                                        className={classes.image}
                                        src={data.sprites.front_default}
                                        alt={pokemonName}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {/* Clicking catch the pokemon will take you to /name-pokemon */}
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={handleNameSelection}
                                >
                                    {name === "" ? `${pokemonName}` : `${name}`}
                                    's Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
}

const PartyStyles = makeStyles({
    wrapper: {
        textAlign: "center",
        overflowY: "scroll",
    },
    button: {
        marginBottom: "10px",
    },
    image: {
        width: "10vw",
    },
    heading: {
        textAlign: "center",
        textTransform: "capitalize",
    },
    subheading: {
        textAlign: "center",
        textTransform: "capitalize",
    },
});
export default PartyPokemonList;
