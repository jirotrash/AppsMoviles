import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { useLoginUser } from '../../hooks/useLoginUser';
import { appTheme } from '../../themes/appTheme';

export const LoginScreen = () => {

    const { 
        isLoading, 
        state, 
        handleInputChange, 
        handleLogin,
        request
    } = useLoginUser();

    return(
        <ImageBackground 
            source={require('../../../assets/loginanimado.gif')} // Imagen de degradado más elegante
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    
                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator 
                                size="large"
                                color="#aea6c0ff"
                            />
                            <Text style={styles.loadingText}>Cargando...</Text>
                        </View>
                    )}
                    
                    {(request === false) && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>
                                Error de autenticación
                            </Text>
                            <Text style={styles.errorSubtext}>
                                Verifica tu email y contraseña
                            </Text>
                        </View>
                    )}

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={[styles.input, isLoading && styles.inputDisabled]}
                                value={state.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                placeholder='Ingresa tu email'
                                placeholderTextColor="#94A3B8"
                                keyboardType="email-address"
                                editable={!isLoading}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Contraseña</Text>
                            <TextInput
                                style={[styles.input, isLoading && styles.inputDisabled]}
                                value={state.password}
                                secureTextEntry={true}
                                onChangeText={(text) => handleInputChange('password', text)}
                                placeholder='Ingresa tu contraseña'
                                placeholderTextColor="#94A3B8"
                                editable={!isLoading}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                            onPress={handleLogin} 
                            disabled={isLoading}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.loginButtonText}>
                                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay oscuro para mejor legibilidad
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        maxWidth: 400,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    loadingContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#8B5CF6',
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorSubtext: {
        fontSize: 14,
        color: '#FECACA',
        textAlign: 'center',
        marginTop: 5,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: '#374151',
    },
    inputDisabled: {
        backgroundColor: '#F3F4F6',
        borderColor: '#D1D5DB',
        color: '#9CA3AF',
    },
    loginButton: {
        backgroundColor: '#4bc8d1ff',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonDisabled: {
        backgroundColor: '#D1D5DB',
        shadowOpacity: 0,
        elevation: 0,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
