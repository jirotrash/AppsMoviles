import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// creamos la interface
interface ContadorState {
    value: number;
}

// inicialisamos la variable
const initialState: ContadorState = {
    value: 0,
};

// se crea la funcion que recibe el objeto ({})
const contadorSlice = createSlice({
    // parametros necesarios, nombre, initialstate y el reducer que incrementa y decrementa
    name: "contador",
    initialState,
    reducers: {
        // state es el estado actual y aumenta en uno
        incrementar: (state) => {
            state.value++;
        },
        // state es el estado actual y decrementa en uno
        decrementar: (state) => {
            state.value--;
        },
        // state es el estado actual y modifica utilizando un parametro de tipo numero
        incrementarPorVarios: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        decrementarPorVarios: (state, action: PayloadAction<number>) => {
            state.value -= action.payload;
        },
        resetear: (state) => {
            state.value = initialState.value;
        }
    }
});

// exportamos todas las funciones del slice
export const { incrementar, decrementar, incrementarPorVarios, decrementarPorVarios, resetear } = contadorSlice.actions;
// exportamos el reducer
export default contadorSlice.reducer;