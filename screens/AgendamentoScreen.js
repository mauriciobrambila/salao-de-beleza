import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet,
  Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { MaskedTextInput } from 'react-native-mask-text';

export default function AgendamentoScreen({ navigation, setAgendamentos, agendamentos, route }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [fone, setFone] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (route.params?.agendamento) {
      const { id, nome, tipo, data, hora, fone } = route.params.agendamento;
      setNome(nome);
      setTipo(tipo);
      setData(data);
      setHora(hora);
      setFone(fone || '');
      setEditId(id);
    }
  }, [route.params]);

  const handleAgendar = () => {
    if (!nome || !tipo || !data || !hora || !fone) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const novoAgendamento = {
      id: editId || uuidv4(),
      nome,
      tipo,
      data,
      hora,
      fone
    };

    if (editId) {
      setAgendamentos(prev =>
        prev.map(item => (item.id === editId ? novoAgendamento : item))
      );
      Alert.alert('Sucesso', 'Agendamento atualizado!');
    } else {
      setAgendamentos(prev => [...prev, novoAgendamento]);
      Alert.alert('Sucesso', 'Agendado com sucesso!');
    }

    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/fundo2.jpg')}
      style={styles.container}
      blurRadius={2}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>
              {editId ? 'Editar Agendamento' : ''}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do Cliente"
              placeholderTextColor="#aaa"
              value={nome}
              onChangeText={setNome}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tipo}
                style={styles.picker}
                dropdownIconColor="brown"
                onValueChange={(itemValue) => setTipo(itemValue)}
              >
                <Picker.Item
                  label="Selecione um serviço"
                  value=""
                  style={styles.pickerPlaceholder}
                  enabled={false}
                />
                {[
                  "Corte de Cabelo Masculino",
                  "Corte de Cabelo Feminino",
                  "Pintura de Cabelo",
                  "Hidratação Facial",
                  "Limpeza de Pele",
                  "Sobrancelha",
                  "Maquiagem",
                  "Massagem",
                  "Esfoliação",
                  "Depilação",
                  "Escova",
                  "Barba",
                  "Mão",
                  "Pé"
                ].map((servico) => (
                  <Picker.Item
                    key={servico}
                    label={servico}
                    value={servico}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>
            </View>

            <MaskedTextInput
              style={styles.input}
              mask="99/99/9999"
              placeholder="Data (DD/MM/AAAA)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={data}
              onChangeText={(text) => setData(text)}
            />

            <MaskedTextInput
              style={styles.input}
              mask="99:99"
              placeholder="Hora (HH:MM)"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={hora}
              onChangeText={(text) => setHora(text)}
            />

            <MaskedTextInput
              style={styles.input}
              mask="(99) 99999-9999"
              placeholder="Fone (00) 00000-0000"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={fone}
              onChangeText={setFone}
            />

            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
              <Text style={styles.buttonText}>
                {editId ? 'Salvar Alterações' : 'Agendar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelar]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: -60,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    letterSpacing: 0.4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 5,
    borderColor: '#4a7c59',
  },
  button: {
    backgroundColor: '#4a7c59',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  cancelar: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 3.2,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 5,
    borderColor: 'green',
    overflow: 'hidden',
  },
  picker: {
    height: 65,
    width: '90%',
    color: '#333',
  },
  pickerItem: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  pickerPlaceholder: {
    fontSize: 18,
    color: '#999',
    fontStyle: 'italic',
  },
});
