import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
// props are untyped here because FormEvento is used as a Tab screen
import { appTheme } from '../themes/appTheme';
import { BtnTouch } from '../components/BtnTouch';
import { useEventoForm } from '../hooks/useEventoForm';

export const FormEvento = ({ navigation, route }: any) => {
  const { state, handleInputChange, resetForm } = useEventoForm();

  useEffect(() => {
    // si viene un evento por params, poblar el formulario
    if (route.params) {
      const evento = route.params;
      handleInputChange('id_evento', evento.id_evento ?? 0);
      handleInputChange('titulo', evento.titulo ?? '');
      handleInputChange('descripcion', evento.descripcion ?? '');
      handleInputChange('fecha', evento.fecha ?? '');
      handleInputChange('hora', evento.hora ?? '');
      handleInputChange('ubicacion', evento.ubicacion ?? '');
    } else {
      resetForm();
    }
  }, []);

  const handleGuardar = () => {
    if (!state.titulo || state.titulo.trim().length === 0) {
      Alert.alert('Validación', 'El título es obligatorio');
      return;
    }

    // aquí se podría llamar al context para guardar
    console.log('Guardar evento:', state);
    Keyboard.dismiss();
    navigation.popToTop();
  };

  return (
  <ImageBackground source={require('../../assets/aaae0b97222998328326d6151a1bc198.jpg')} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Agregar Evento</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Título</Text>
              <TextInput
                style={[appTheme.textInput, styles.input]}
                placeholder="Título del evento"
                placeholderTextColor="#9a9a9a"
                value={state.titulo}
                onChangeText={(v) => handleInputChange('titulo', v)}
              />

              <Text style={styles.label}>Descripción</Text>
              <TextInput
                style={[appTheme.textInput, styles.textarea]}
                placeholder="Descripción del evento"
                placeholderTextColor="#9a9a9a"
                value={state.descripcion}
                onChangeText={(v) => handleInputChange('descripcion', v)}
                multiline
                numberOfLines={4}
              />

              <View style={styles.rowInputs}>
                <View style={styles.flexInput}>
                  <Text style={styles.labelSmall}>Fecha</Text>
                  <TextInput
                    style={[appTheme.textInput, styles.input]}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9a9a9a"
                    value={state.fecha}
                    onChangeText={(v) => handleInputChange('fecha', v)}
                  />
                </View>
                <View style={styles.timeInput}>
                  <Text style={styles.labelSmall}>Hora</Text>
                  <TextInput
                    style={[appTheme.textInput, styles.input]}
                    placeholder="HH:MM"
                    placeholderTextColor="#9a9a9a"
                    value={state.hora}
                    onChangeText={(v) => handleInputChange('hora', v)}
                  />
                </View>
              </View>

              <Text style={styles.label}>Ubicación</Text>
              <TextInput
                style={[appTheme.textInput, styles.input]}
                placeholder="Ubicación del evento"
                placeholderTextColor="#9a9a9a"
                value={state.ubicacion}
                onChangeText={(v) => handleInputChange('ubicacion', v)}
              />

              <View style={styles.buttonsRow}>
                <BtnTouch titulo="Guardar Evento" color="rgb(206, 161, 192)" action={handleGuardar} />
                <BtnTouch titulo="Cancelar" color="rgb(82, 57, 208)" action={() => navigation.popToTop()} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)'
  },
  container: { padding: 18, paddingBottom: 40, alignItems: 'center' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 14, width: '100%', maxWidth: 420 },
  /* back button removed */
  title: { fontSize: 20, fontWeight: '800', textAlign: 'center', color: '#0b2545' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 22,
    width: '92%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(177,130,131,0.12)'
  },
  label: { fontSize: 13, fontWeight: '700', color: '#6b3f3f', marginBottom: 8 },
  labelSmall: { fontSize: 12, fontWeight: '700', color: '#6b3f3f', marginBottom: 6 },
  input: { backgroundColor: '#f7f7f8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  textarea: { backgroundColor: '#f7f7f8', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, minHeight: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 6, marginBottom: 6 },
  flexInput: { flex: 1, marginRight: 10 },
  timeInput: { width: 110 },
  buttonsRow: { marginTop: 18 },
});

export default FormEvento;
