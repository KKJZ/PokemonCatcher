import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import PartyPokemonList from "./PartyPokemonList";

function Home(props) {
    const { history } = props;
    const classes = HomeStyles();

    const party = useSelector((state) => state.pokemon.party);

    return (
        <>
            <h1>Home</h1>
            {/* List the Pokemon */}
            <div class={classes.wrapper}>
                {party.length > 0
                    ? party.map((member) => {
                          return (
                              <PartyPokemonList
                                  key={member.partyId}
                                  id={member.partyId}
                                  name={member.name}
                                  pokemonName={member.pokemonName}
                                  history={history}
                              />
                          );
                      })
                    : null}
            </div>
            {/* Button going to /catch-pokemon */}
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                id="Catch-Pokemon"
                onClick={() => history.push("/catch-pokemon")}
            >
                Catch pokemon
            </Button>
        </>
    );
}

const HomeStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "75%",
        height: "75vh",
        justifyContent: "space-evenly",
    },
});

export default Home;
