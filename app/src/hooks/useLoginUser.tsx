import { useReducer, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RequestLogin } from "../interfaces/userInterfaces";
import { pandorApi } from "../api/pandoraApi";
import { API_CONFIG } from "../config/apiConfig";

export interface LoginData{
    email: string;
    password: string;
}

export interface UseLoginUser {
    isLoading:          boolean;
    state:              LoginData;
    handleLogin:        () => void;
    handleInputChange:  ( fieldName: keyof LoginData, value: string ) => void;
    request:            RequestLogin | null;
}

export const useLoginUser = (): UseLoginUser => {

    const initialState: LoginData = {
        email: "",
        password: ""
    }

    type Action = { type: "handleInputChange", payload: { fieldName: keyof LoginData, value: string }; }

    const dataReducer = (state: LoginData, action: Action) => {
        switch( action.type ){
            case "handleInputChange": {
                return{
                    ...state,
                    [ action.payload.fieldName ] : action.payload.value
                }
            }
        }
    }

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const [ state, dispatch ] = useReducer( dataReducer, initialState );

    const [ request, setRequest ] = useState<RequestLogin | null>(null);

    const { signIn, changeFavoriteImage, changeUsername, changeEmail } = useContext( AuthContext );

    const apiURl: string = API_CONFIG.LOGIN_URL;

    const handleInputChange = ( fieldName: keyof LoginData, value: string ) => {
        dispatch({ type: "handleInputChange", payload: { fieldName, value } });
    }

    const handleLogin = async () => {
        setIsLoading(true);
        const dataBody = {
            email: state.email,
            password: state.password
        } 
        try{
            const response = await pandorApi.post<RequestLogin>(apiURl, dataBody);
            if( response.data !== false ) {
                signIn();
                changeUsername( response.data.username );
                changeEmail( response.data.email );
                changeFavoriteImage( response.data.image );
                setRequest(response.data);
            } else {
                setRequest(false);
            }
        }catch(error){
            console.log( error );
            setRequest(false);
        }
        setIsLoading(false);
    }

    return { isLoading, state, handleLogin, handleInputChange, request };

}
