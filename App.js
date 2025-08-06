import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import AgendamentoScreen from './screens/AgendamentoScreen';
import AgendamentosMarcadosScreen from './screens/AgendamentosMarcadosScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const AGENDAMENTOS_KEY = '@agendamentos';

export default function App() {
  const [agendamentos, setAgendamentos] = useState([]);

  // Carregar agendamentos ao iniciar
  useEffect(() => {
    const loadAgendamentos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(AGENDAMENTOS_KEY);
        if (jsonValue !== null) {
          setAgendamentos(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Erro ao carregar agendamentos', e);
      }
    };

    loadAgendamentos();
  }, []);

  // Salvar agendamentos sempre que mudarem
  useEffect(() => {
    const saveAgendamentos = async () => {
      try {
        await AsyncStorage.setItem(AGENDAMENTOS_KEY, JSON.stringify(agendamentos));
      } catch (e) {
        console.error('Erro ao salvar agendamentos', e);
      }
    };

    saveAgendamentos();
  }, [agendamentos]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4a7c59' },
          headerTintColor: '#fff',
          headerTitleStyle: { 
            fontWeight: 'bold', 
            textAlign: 'center',  
            flex: 1 
          },
          headerTitleAlign: 'center',
        }}
        initialRouteName="Menu"
      >
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ 
            title: 'Menu Principal',
            headerTitleStyle: {
              fontWeight: 'bold',
              textAlign: 'center',
            }
          }} 
        />
        <Stack.Screen 
          name="Agendamento"
          options={({ route }) => ({ 
            title: route.params?.agendamento ? 'Editar Agendamento' : 'Novo Agendamento'
          })}
        >
          {(props) => (
            <AgendamentoScreen
              {...props}
              agendamentos={agendamentos}
              setAgendamentos={setAgendamentos}
            />
          )}
        </Stack.Screen>
        <Stack.Screen 
          name="AgendamentosMarcados"
          options={{ title: 'Agendamentos' }}
        >
          {(props) => (
            <AgendamentosMarcadosScreen
              {...props}
              agendamentos={agendamentos}
              setAgendamentos={setAgendamentos}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}