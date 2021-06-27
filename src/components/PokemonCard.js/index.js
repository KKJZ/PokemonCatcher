import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    Grid,
    makeStyles,
} from "@material-ui/core";

function PokemonCard(props) {
    const { data, name, type, handleChange, handleClose, handleSubmit } = props;
    const classes = NameStyles();

    return (
        <Card className={classes.root}>
            <h2 className={classes.name}>{name === "" ? data.name : name}</h2>
            <h3 className={classes.heading}>
                {type === "UPDATE" && name !== ""
                    ? `Normally: ${data.name}`
                    : null}
            </h3>
            {data.sprites === undefined ? (
                <h2>Image unavaible...</h2>
            ) : (
                <CardMedia
                    className={classes.media}
                    image={data.sprites.front_default}
                    title={data.name}
                />
            )}
            <CardContent>
                <Grid container>
                    <Grid xs={12}>
                        <h2>{data.types.length > 1 ? "Types:" : "Type:"}</h2>
                    </Grid>
                    {data.types.map((type, i) => (
                        <Grid item xs={6} key={i}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className={classes.type}
                            >
                                {/* Show Pokemon Type */}
                                {type.type.name}
                            </Typography>
                        </Grid>
                    ))}
                    <Grid xs={12}>
                        <h2>
                            {data.types.length > 1 ? "Abilities:" : "Ability:"}
                        </h2>
                    </Grid>
                    {data.abilities.map((ability, i) => (
                        <Grid item xs={4} key={i}>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className={classes.type}
                            >
                                {/* Show Pokemon Type */}
                                {ability.ability.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
            <CardActions>
                {/* Input field for Pokemon Name */}
                <TextField
                    onChange={handleChange}
                    id="outlined-basic"
                    label="Name Your Pokemon"
                    variant="outlined"
                    value={name}
                />
                {/* Submit button for the name */}
                <Button onClick={handleSubmit} size="small" color="primary">
                    Submit
                </Button>
                <Button size="small" color="secondary" onClick={handleClose}>
                    Home
                </Button>
            </CardActions>
        </Card>
    );
}

const NameStyles = makeStyles({
    media: { height: "30vh", backgroundSize: "contain" },
    heading: {
        textTransform: "capitalize",
    },
    name: {
        textTransform: "capitalize",
        textAlign: "center",
    },
    type: {
        textAlign: "center",
        textTransform: "capitalize",
    },
});

export default PokemonCard;
