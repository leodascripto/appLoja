// src/screens/profile/OrdersScreen.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Modelo de dados para pedidos
interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

// Dados de exemplo para pedidos
const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    date: '15/05/2025',
    status: 'delivered',
    total: 3299.98,
    items: 2
  },
  {
    id: 'ORD123455',
    date: '02/05/2025',
    status: 'shipped',
    total: 899.99,
    items: 1
  },
  {
    id: 'ORD123454',
    date: '20/04/2025',
    status: 'delivered',
    total: 1799.99,
    items: 1
  },
  {
    id: 'ORD123453',
    date: '10/03/2025',
    status: 'cancelled',
    total: 349.99,
    items: 1
  }
];

const OrdersScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '#FFA000';
      case 'processing':
        return '#1976D2';
      case 'shipped':
        return '#7B1FA2';
      case 'delivered':
        return '#43A047';
      case 'cancelled':
        return '#E53935';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconhecido';
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderItem} activeOpacity={0.7}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Pedido #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <View style={styles.orderInfo}>
        <Text style={styles.orderTotal}>R$ {item.total.toFixed(2)}</Text>
        <Text style={styles.orderItems}>{item.items} {item.items > 1 ? 'itens' : 'item'}</Text>
      </View>
      
      <View style={styles.orderFooter}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
          <MaterialCommunityIcons name="chevron-right" size={16} color="#555" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyOrders = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="shopping-outline" size={60} color="#ccc" />
      <Text style={styles.emptyTitle}>Sem pedidos recentes</Text>
      <Text style={styles.emptySubtitle}>Você ainda não fez nenhum pedido</Text>
      <TouchableOpacity style={styles.shopButton}>
        <Text style={styles.shopButtonText}>Explorar Produtos</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Endereços</Text>
        <View style={styles.placeholder} />
      </View>
      
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyAddresses}
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddAddress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Endereço</Text>
      </TouchableOpacity>
      
      {/* Modal para adicionar/editar endereço */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {currentAddress ? 'Editar Endereço' : 'Novo Endereço'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formContainer}>
              {/* Aqui viriam os inputs para o endereço */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome do Endereço</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Ex: Casa, Trabalho"
                  value={currentAddress?.name}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>CEP</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  value={currentAddress?.zipCode}
                />
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Rua</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Rua, Avenida, etc"
                    value={currentAddress?.street}
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Número</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Nº"
                    keyboardType="numeric"
                    value={currentAddress?.number}
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Complemento (opcional)</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Apto, Bloco, etc"
                  value={currentAddress?.complement}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Bairro</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Seu bairro"
                  value={currentAddress?.district}
                />
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Cidade</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Sua cidade"
                    value={currentAddress?.city}
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Estado</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="UF"
                    maxLength={2}
                    autoCapitalize="characters"
                    value={currentAddress?.state}
                  />
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                // Aqui viria a lógica para salvar o endereço
                setModalVisible(false);
                Alert.alert(
                  'Sucesso',
                  currentAddress 
                    ? 'Endereço atualizado com sucesso!' 
                    : 'Endereço adicionado com sucesso!'
                );
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
  addressItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressName: {
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
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addressLine: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
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

export default AddressesScreen;