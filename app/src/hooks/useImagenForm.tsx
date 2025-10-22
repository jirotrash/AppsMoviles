import { useReducer } from "react";
import { useImagenApi } from "./useImagenApi";

export interface FormImagenData{
    id:         number;
    nombre:     string;
    imagen1:    string;
    imagen2:    string;
    imagen3:    string;
    imagen4:    string;
    imagen5:    string;
}

export interface UseImagenForm{
    state:              FormImagenData;
    handleInputChange:  ( fieldName: keyof FormImagenData, value: string | number ) => void;
    handleSubmit:       () => void;
    handleDelete:       () => void;
}

export const useImagenForm = (): UseImagenForm => {

    const { createImagen, updateImagen, deleteImagen } = useImagenApi();

    const initialForm: FormImagenData = {
        "id":       0,
        "nombre":   "",
        "imagen1":  "",
        "imagen2":  "",
        "imagen3":  "",
        "imagen4":  "",
        "imagen5":  ""
    }

    type Action = { type: "handleInputChange", payload: { fieldName: keyof FormImagenData, value: string | number } };

    const formReducer = ( state: FormImagenData, action: Action ) => {
        switch( action.type ){
            case "handleInputChange":
                return {
                    ...state,
                    [action.payload.fieldName] : action.payload.value
                }
        }
    }

    const [ state, dispatch ] = useReducer(formReducer, initialForm);

    const handleInputChange = ( fieldName: keyof FormImagenData, value: string | number ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleSubmit = () => ( state.id == 0 ) ? createImagen(state) : updateImagen(state);

    const handleDelete = () => deleteImagen(state);

    return { state, handleInputChange, handleSubmit, handleDelete };

}