import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventContext from '../context/EventContext';

export const ScreenI = () => {
    const { events } = useContext(EventContext);
    const navigation: any = useNavigation();

    const goToDetail = (id: string) => {
        // Navegar al tab Detalle y pasar el id al stack interno
        navigation.navigate('Detalle', { screen: 'Galeria2Main', params: { id } });
    };

    const goToAdd = () => {
        navigation.navigate('Agregar', { screen: 'Galeria1Main' });
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Eventos</Text>

            {events.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>No hay eventos. Agrega uno usando el botón +</Text>
                </View>
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => goToDetail(item.id)}>
                            <View>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDate}>{item.date}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={goToAdd}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: '#666', fontSize: 16, textAlign: 'center', paddingHorizontal: 40 },
    item: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 8, marginVertical: 8 },
    itemTitle: { fontSize: 16, fontWeight: '600' },
    itemDate: { color: '#666', marginTop: 4 },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#ff6b9d',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    fabText: { color: 'white', fontSize: 28, lineHeight: 28 },
});

