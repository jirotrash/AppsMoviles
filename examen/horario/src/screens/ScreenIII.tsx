import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import EventContext from '../context/EventContext';

export const ScreenIII = () => {
  const route: any = useRoute();
  const { id } = route.params || {};
  const { getEvent } = useContext(EventContext);

  const event = id ? getEvent(id) : undefined;

  if (!event) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Detalle de evento</Text>
        <Text style={styles.empty}>Evento no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.date}>{event.date}</Text>
      <Text style={styles.desc}>{event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  date: { color: '#666', marginBottom: 12 },
  desc: { fontSize: 16, lineHeight: 22 },
  empty: { color: '#666' },
});