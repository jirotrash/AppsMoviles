import { configureStore } from "@reduxjs/toolkit";
// no se ponen llaves por que es un default "es un componente"
import contadorReducer from "../caracteristicas/Contador";

// creamos la constante para usar el store
export const store = configureStore({
    reducer: {
        contador: contadorReducer,
    }
});

// dispatch actualiza el estado getState obtener el estado de redux
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;