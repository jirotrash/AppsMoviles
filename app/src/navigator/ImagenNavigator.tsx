import { createStackNavigator } from "@react-navigation/stack";
import { HomeImagen } from "../screens/imagenes/HomeImagen";
import { FormImagen } from "../screens/imagenes/FormImagen";
import { ImagenPreview } from "../screens/imagenes/ImagenPreview";
import { FormImagenData } from "../hooks/useImagenForm";

export type ImagenStackParams = {
    HomeImagen: undefined;
    FormImagen: { imagen?: FormImagenData } | undefined;
    ImagenPreview: { imagen: FormImagenData; imageField?: string };
}

const Stack = createStackNavigator<ImagenStackParams>();

export const ImagenNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                    backgroundColor: '#6200EE',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Stack.Screen 
                name="HomeImagen" 
                component={HomeImagen}
                options={{
                    title: 'Mis Imágenes',
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="FormImagen" 
                component={FormImagen}
                options={{
                    title: 'Gestionar Imagen',
                }}
            />
            <Stack.Screen 
                name="ImagenPreview" 
                component={ImagenPreview}
                options={{
                    title: 'Vista Previa',
                    headerShown: false, // Sin header para vista completa
                }}
            />
        </Stack.Navigator>
    );
};