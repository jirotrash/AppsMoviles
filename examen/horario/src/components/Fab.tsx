import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native';

type Props = {
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
};

export const Fab = ({ onPress, size = 56, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.fab, { width: size, height: size, borderRadius: size / 2 }, style]}
      activeOpacity={0.85}
    >
      {/* Reemplazado MaterialIcons por texto '+' para evitar dependencia de @expo/vector-icons */}
      <Text style={{ color: '#fff', fontSize: size * 0.55, lineHeight: size * 0.55 }}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#71aa5bff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 30,
    elevation: 6,
    borderColor: '#000000ff',
    borderWidth: 2,
  },
});

export default Fab;
