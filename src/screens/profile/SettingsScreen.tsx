// src/screens/profile/SettingsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Switch,
  ScrollView,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation';

// Usuário mock
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  notifications: {
    promotions: boolean;
    orderUpdates: boolean;
    newProducts: boolean;
  };
}

const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '(11) 98765-4321',
    notifications: {
      promotions: true,
      orderUpdates: true,
      newProducts: false,
    }
  });
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const navigateToHome = () => {
    navigation.navigate('Main');
  };
  
  const handleToggleNotification = (type: keyof UserProfile['notifications']) => {
    setUserProfile({
      ...userProfile,
      notifications: {
        ...userProfile.notifications,
        [type]: !userProfile.notifications[type]
      }
    });
  };
  
  const handleEditProfile = (field: 'name' | 'email' | 'phone') => {
    setEditField(field);
    setEditValue(userProfile[field]);
    setEditModalVisible(true);
  };
  
  const handleSaveEdit = () => {
    if (editField) {
      setUserProfile({
        ...userProfile,
        [editField]: editValue
      });
      
      setEditModalVisible(false);
      setEditField(null);
      setEditValue('');
    }
  };
  
  const handleChangePassword = () => {
    Alert.alert(
      'Alterar Senha',
      'Um link para redefinição de senha será enviado para o seu e-mail.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Enviar Link',
          onPress: () => {
            Alert.alert('E-mail enviado', 'Verifique sua caixa de entrada e siga as instruções.');
          },
        },
      ]
    );
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir Conta',
          onPress: () => {
            Alert.alert('Conta excluída com sucesso.');
            navigateToHome();
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Nome</Text>
              <Text style={styles.settingValue}>{userProfile.name}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditProfile('name')}
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>E-mail</Text>
              <Text style={styles.settingValue}>{userProfile.email}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditProfile('email')}
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Telefone</Text>
              <Text style={styles.settingValue}>{userProfile.phone}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => handleEditProfile('phone')}
            >
              <MaterialCommunityIcons name="pencil" size={16} color="#555" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.actionButtonText}>Alterar Senha</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Promoções e Ofertas</Text>
              <Text style={styles.settingDescription}>
                Receba notificações sobre promoções exclusivas
              </Text>
            </View>
            <Switch
              value={userProfile.notifications.promotions}
              onValueChange={() => handleToggleNotification('promotions')}
              trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Atualizações de Pedidos</Text>
              <Text style={styles.settingDescription}>
                Acompanhe o status dos seus pedidos
              </Text>
            </View>
            <Switch
              value={userProfile.notifications.orderUpdates}
              onValueChange={() => handleToggleNotification('orderUpdates')}
              trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Novos Produtos</Text>
              <Text style={styles.settingDescription}>
                Seja notificado quando novos produtos chegarem
              </Text>
            </View>
            <Switch
              value={userProfile.notifications.newProducts}
              onValueChange={() => handleToggleNotification('newProducts')}
              trackColor={{ false: '#e0e0e0', true: '#4CAF50' }}
              thumbColor="#fff"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.dangerButtonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
      
      {/* Modal para edição de campo */}
      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editField === 'name' && 'Editar Nome'}
                {editField === 'email' && 'Editar E-mail'}
                {editField === 'phone' && 'Editar Telefone'}
              </Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              keyboardType={editField === 'email' ? 'email-address' : editField === 'phone' ? 'phone-pad' : 'default'}
              autoCapitalize={editField === 'name' ? 'words' : 'none'}
            />
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveEdit}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  settingDescription: {
    fontSize: 13,
    color: '#777',
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E53935',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SettingsScreen;