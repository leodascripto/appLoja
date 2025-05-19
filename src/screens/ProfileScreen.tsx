// src/screens/ProfileScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

// Usar tipo genérico para facilitar a navegação
type NavigationPropsType = NavigationProp<ParamListBase>;

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen: keyof RootStackParamList;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Meus Pedidos',
    icon: 'package-variant-closed',
    screen: 'Orders',
  },
  {
    id: '2',
    title: 'Endereços',
    icon: 'map-marker',
    screen: 'Addresses',
  },
  {
    id: '3',
    title: 'Métodos de Pagamento',
    icon: 'credit-card',
    screen: 'PaymentMethods',
  },
  {
    id: '4',
    title: 'Lista de Desejos',
    icon: 'heart',
    screen: 'Wishlist',
  },
  {
    id: '5',
    title: 'Configurações',
    icon: 'cog',
    screen: 'Settings',
  },
  {
    id: '6',
    title: 'Ajuda & Suporte',
    icon: 'help-circle',
    screen: 'Help',
  },
];

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationPropsType>();

  // Função para navegar para qualquer tela
  const navigateTo = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => {
            // Aqui viria a lógica de logout
            Alert.alert('Logout realizado com sucesso!');
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          {/* Usando um placeholder para o avatar */}
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={40} color="#777" />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ana Silva</Text>
            <Text style={styles.email}>ana.silva@email.com</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigateTo('Settings')}
          >
            <MaterialCommunityIcons name="pencil" size={16} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => navigateTo(item.screen)}
            >
              <View style={styles.menuIconContainer}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color="#333" />
              </View>
              
              <Text style={styles.menuTitle}>{item.title}</Text>
              
              <MaterialCommunityIcons name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  logoutText: {
    fontSize: 16,
    color: '#E53935',
    marginLeft: 16,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  }
});

export default ProfileScreen;