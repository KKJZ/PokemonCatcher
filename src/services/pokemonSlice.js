import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: { name: "", pokemonName: "", partyId: 0 },
    party: [],
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        // Adding pokemonName
        addPokemonName(state, action) {
            state.selected.pokemonName = action.payload;
        },
        // Removing pokemonName
        removePokemonName(state) {
            state.selected.pokemonName = "";
        },
        //For typing the new name
        changingSelectedName(state, action) {
            state.selected.name = action.payload;
        },
        //Appling the name and adding to the party
        applySelectedName(state) {
            state.party.push(state.selected);
        },
        //If you close with no name
        //Appling the name and adding to the party
        applyNoName(state) {
            state.selected.name = "";
            state.party.push(state.selected);
        },
        resetSelected(state) {
            state.selected = {
                name: "",
                pokemonName: "",
                partyId: state.party.length,
            };
        },
        //Grab old name for new name update
        updateParty(state, action) {
            state.party.forEach((member, i) => {
                if (state.party[i].partyId === action.payload) {
                    return (state.selected = state.party[i]);
                }
            });
        },
        updatePartyName(state, action) {
            state.party.forEach((member, i) => {
                if (state.party[i].partyId === action.payload) {
                    return (state.party[i].name = state.selected.name);
                }
            });
        },
    },
});

export const {
    addPokemonName,
    removePokemonName,
    changingSelectedName,
    applySelectedName,
    applyNoName,
    resetSelected,
    updateParty,
    updatePartyName,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
