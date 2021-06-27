import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./components/Home";
import CatchPokemon from "./components/CatchPokemon";
import NamePokemon from "./components/NamePokemon";
import PokemonProfile from "./components/PokemonProfile";

function App() {
    const classes = appStyles();
    return (
        <div className={classes.app}>
            <Switch>
                <Route exact from="/" render={(props) => <Home {...props} />} />
                <Route
                    exact
                    from="/pokemon-profile"
                    render={(props) => <PokemonProfile {...props} />}
                />
                <Route
                    exact
                    from="/catch-pokemon"
                    render={(props) => <CatchPokemon {...props} />}
                />
                <Route
                    exact
                    from="/name-pokemon"
                    render={(props) => <NamePokemon {...props} />}
                />
            </Switch>
        </div>
    );
}

const appStyles = makeStyles({
    app: {
        display: "flex",
        minWidth: "80vw",
        maxWidth: "80vw",
        minHeight: "60vh",
        alignItems: "center",
        margin: "0 auto",
        border: "1px solid black",
        flexDirection: "column",
        paddingBottom: "10px",
    },
});

export default App;
