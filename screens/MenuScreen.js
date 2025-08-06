import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/fundomenu.jpg')}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonAgendar]}
          onPress={() => navigation.navigate('Agendamento')}
        >
          <Text style={styles.buttonText}>Agendar Serviço</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonVisualizar]}
          onPress={() => navigation.navigate('AgendamentosMarcados')}
        >
          <Text style={styles.buttonText}>Ver Agendamentos</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '96%',
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    transform: [{ scale: 1 }],
  },
  buttonAgendar: {
    backgroundColor: '#4a7c59',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  buttonVisualizar: {
    backgroundColor: '#3a5a78',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});