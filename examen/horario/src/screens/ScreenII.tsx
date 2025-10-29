import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventContext from '../context/EventContext';

export const ScreenII = () => {
  const { addEvent } = useContext(EventContext);
  const navigation: any = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const onSave = () => {
    if (!title.trim()) return;
    addEvent({ title: title.trim(), description: description.trim(), date: date.trim() });
    setTitle('');
    setDescription('');
    setDate('');
    navigation.navigate('Inicio');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Agregar evento</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
        />
        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 },
  form: { marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 12 },
  saveButton: { backgroundColor: '#ff6b9d', padding: 14, borderRadius: 8, alignItems: 'center' },
  saveText: { color: 'white', fontWeight: '600' },
});