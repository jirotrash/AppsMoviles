import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface UseImagePicker {
  imagen64: string;
  pickImage: () => Promise<string | null>;
}

export const useImagePicker = (): UseImagePicker => {

    const [imagen64, setImagen64] = useState<string>("");

    const pickImage = async (): Promise<string | null> => {
        try {
            // Solicitar permisos
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permisos requeridos",
                    "Se requieren permisos para acceder a la galería de fotos",
                    [{ text: "OK" }]
                );
                return null;
            }

            // Abrir selector de imágenes
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
                base64: true,
            });

            if (!result.canceled && result.assets[0].base64) {
                const base64Image = result.assets[0].base64;
                setImagen64(base64Image);
                return base64Image;
            }

            return null;
        } catch (error) {
            Alert.alert('Error', 'No se pudo seleccionar la imagen');
            return null;
        }
    };

    return { imagen64, pickImage };

};
