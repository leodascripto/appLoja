
// src/screens/profile/PaymentMethodsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList,
  Modal,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Modelo de dados para métodos de pagamento
interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'pix';
  cardNumber?: string;
  cardHolder?: string;
  cardExpiry?: string;
  isDefault: boolean;
}

// Dados de exemplo para métodos de pagamento
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    cardNumber: '•••• •••• •••• 1234',
    cardHolder: 'ANA SILVA',
    cardExpiry: '12/27',
    isDefault: true,
  },
  {
    id: '2',
    type: 'debit',
    cardNumber: '•••• •••• •••• 5678',
    cardHolder: 'ANA SILVA',
    cardExpiry: '09/26',
    isDefault: false,
  },
  {
    id: '3',
    type: 'pix',
    isDefault: false,
  },
];

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<'credit' | 'debit' | 'pix'>('credit');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddPaymentMethod = () => {
    setModalVisible(true);
  };

  const handleDeletePaymentMethod = (id: string) => {
    Alert.alert(
      'Remover Método de Pagamento',
      'Tem certeza que deseja remover este método de pagamento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(pm => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const renderPaymentMethodItem = ({ item }: { item: PaymentMethod }) => (
    <View style={styles.paymentItem}>
      <View style={styles.paymentHeader}>
        <View style={styles.typeContainer}>
          {item.type === 'credit' && (
            <MaterialCommunityIcons name="credit-card" size={24} color="#333" />
          )}
          {item.type === 'debit' && (
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="#333" />
          )}
          {item.type === 'pix' && (
            <MaterialCommunityIcons name="currency-brl" size={24} color="#333" />
          )}
          
          <View style={styles.typeInfo}>
            <Text style={styles.typeText}>
              {item.type === 'credit' && 'Cartão de Crédito'}
              {item.type === 'debit' && 'Cartão de Débito'}
              {item.type === 'pix' && 'PIX'}
            </Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Padrão</Text>
              </View>
            )}
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeletePaymentMethod(item.id)}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={16} color="#555" />
        </TouchableOpacity>
      </View>
      
      {(item.type === 'credit' || item.type === 'debit') && (
        <View style={styles.cardInfo}>
          <Text style={styles.cardNumber}>{item.cardNumber}</Text>
          <Text style={styles.cardDetails}>{item.cardHolder} | Validade: {item.cardExpiry}</Text>
        </View>
      )}
      
      {item.type === 'pix' && (
        <Text style={styles.pixInfo}>Pagamento via PIX</Text>
      )}
      
      {!item.isDefault && (
        <TouchableOpacity 
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(item.id)}
        >
          <Text style={styles.setDefaultText}>Definir como padrão</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyPaymentMethods = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="credit-card-off" size={60} color="#ccc" />
      <Text style={styles.emptyTitle}>Nenhum método de pagamento</Text>
      <Text style={styles.emptySubtitle}>Adicione um método de pagamento para agilizar suas compras</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Métodos de Pagamento</Text>
        <View style={styles.placeholder} />
      </View>
      
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethodItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyPaymentMethods}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddPaymentMethod}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Forma de Pagamento</Text>
      </TouchableOpacity>
      
      {/* Modal para adicionar método de pagamento */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova Forma de Pagamento</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[
                  styles.typeOption,
                  selectedType === 'credit' && styles.selectedType
                ]}
                onPress={() => setSelectedType('credit')}
              >
                <MaterialCommunityIcons 
                  name="credit-card" 
                  size={24} 
                  color={selectedType === 'credit' ? '#fff' : '#333'} 
                />
                <Text 
                  style={[
                    styles.typeOptionText,
                    selectedType === 'credit' && styles.selectedTypeText
                  ]}
                >
                  Crédito
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeOption,
                  selectedType === 'debit' && styles.selectedType
                ]}
                onPress={() => setSelectedType('debit')}
              >
                <MaterialCommunityIcons 
                  name="credit-card-outline" 
                  size={24} 
                  color={selectedType === 'debit' ? '#fff' : '#333'} 
                />
                <Text 
                  style={[
                    styles.typeOptionText,
                    selectedType === 'debit' && styles.selectedTypeText
                  ]}
                >
                  Débito
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.typeOption,
                  selectedType === 'pix' && styles.selectedType
                ]}
                onPress={() => setSelectedType('pix')}
              >
                <MaterialCommunityIcons 
                  name="currency-brl" 
                  size={24} 
                  color={selectedType === 'pix' ? '#fff' : '#333'} 
                />
                <Text 
                  style={[
                    styles.typeOptionText,
                    selectedType === 'pix' && styles.selectedTypeText
                  ]}
                >
                  PIX
                </Text>
              </TouchableOpacity>
            </View>
            
            {(selectedType === 'credit' || selectedType === 'debit') && (
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Número do Cartão</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    keyboardType="numeric"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome no Cartão</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Nome como aparece no cartão"
                    autoCapitalize="characters"
                  />
                </View>
                
                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.inputLabel}>Validade</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="MM/AA"
                      keyboardType="numeric"
                    />
                  </View>
                  
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>CVV</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="000"
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>
            )}
            
            {selectedType === 'pix' && (
              <View style={styles.pixContainer}>
                <Text style={styles.pixInfoText}>
                  Para pagar com PIX, você irá escanear um QR Code durante o processo de checkout.
                </Text>
                <Image 
                  source={require('../../assets/img/pix_icon.png')} 
                  style={styles.pixIcon}
                  resizeMode="contain"
                />
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                // Aqui viria a lógica para salvar o método de pagamento
                setModalVisible(false);
                Alert.alert(
                  'Sucesso',
                  'Método de pagamento adicionado com sucesso!'
                );
                
                // Adicionando um mock do método de pagamento
                const newId = (paymentMethods.length + 1).toString();
                let newMethod: PaymentMethod;
                
                if (selectedType === 'credit' || selectedType === 'debit') {
                  newMethod = {
                    id: newId,
                    type: selectedType,
                    cardNumber: '•••• •••• •••• 9876',
                    cardHolder: 'ANA SILVA',
                    cardExpiry: '05/28',
                    isDefault: false,
                  };
                } else {
                  newMethod = {
                    id: newId,
                    type: 'pix',
                    isDefault: false,
                  };
                }
                
                setPaymentMethods([...paymentMethods, newMethod]);
              }}
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
  listContent: {
    padding: 16,
    paddingBottom: 80, // Espaço para o botão flutuante
  },
  paymentItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeInfo: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
  },
  pixInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  setDefaultText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
  },
  selectedType: {
    backgroundColor: '#333',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  selectedTypeText: {
    color: '#fff',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  pixContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pixInfoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  pixIcon: {
    width: 100,
    height: 100,
  },
  saveButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentMethodsScreen;
