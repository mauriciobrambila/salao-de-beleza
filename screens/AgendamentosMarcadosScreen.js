import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';

export default function AgendamentosMarcadosScreen({ navigation, agendamentos, setAgendamentos }) {

  const excluirAgendamento = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setAgendamentos(prev => prev.filter(ag => ag.id !== id));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Cliente: {item.nome}</Text>
      <Text style={styles.cardText}>Serviço: {item.tipo}</Text>
      <Text style={styles.cardText}>Data: {item.data}</Text>
      <Text style={styles.cardText}>Hora: {item.hora}</Text>
      <Text style={styles.cardText}>Fone: {item.fone}</Text>
       
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.buttonEditar}
          onPress={() => navigation.navigate('Agendamento', { agendamento: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonExcluir}
          onPress={() => excluirAgendamento(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fundo3.jpeg')}
      style={styles.container}
      blurRadius={0}
    >
      <View style={styles.overlay}>
           {agendamentos.length === 0 ? (
          <Text style={styles.noData}>Nenhum agendamento registrado.</Text>
        ) : (
          <FlatList
            data={agendamentos}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        )}
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
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
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: -5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 10, height: 10 },
    textShadowRadius: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  noData: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#4a7c59',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 3,
    color: '#333',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  buttonEditar: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 15,
    flex: 1,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonExcluir: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 15,
    flex: 1,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonVoltar: {
  backgroundColor: '#3a5a78',
  padding: 14,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 630,
  right: 130,
  zIndex: 10,
  shadowColor: 'red',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 4.65,
  elevation: 20,
  flexDirection: 'row-reverse',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
