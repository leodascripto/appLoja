// src/screens/profile/HelpSupportScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert,
  Linking
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Perguntas frequentes
const faqs = [
  {
    id: '1',
    question: 'Como faço para rastrear meu pedido?',
    answer: 'Você pode rastrear seu pedido acessando a seção "Meus Pedidos" no menu do perfil. Lá você encontrará todos os seus pedidos e poderá ver o status atual de cada um deles.'
  },
  {
    id: '2',
    question: 'Qual é a política de devolução?',
    answer: 'Nossa política de devolução permite que você devolva produtos em até 7 dias após o recebimento, desde que estejam em perfeito estado e na embalagem original. Para iniciar uma devolução, acesse a seção "Meus Pedidos" e selecione a opção "Devolver" no pedido correspondente.'
  },
  {
    id: '3',
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos pagamentos via cartão de crédito, cartão de débito, PIX e boleto bancário. Você pode gerenciar seus métodos de pagamento na seção "Métodos de Pagamento" do seu perfil.'
  },
  {
    id: '4',
    question: 'Como funciona a montagem dos móveis?',
    answer: 'Oferecemos serviço de montagem para a maioria dos nossos produtos. Durante o checkout, você pode selecionar a opção de montagem mediante uma taxa adicional. A montagem é agendada após a entrega do produto.'
  },
  {
    id: '5',
    question: 'Qual é o prazo de entrega?',
    answer: 'O prazo de entrega varia de acordo com a sua localização e disponibilidade do produto. Geralmente, produtos em estoque são entregues em 3 a 7 dias úteis para capitais e regiões metropolitanas, e 7 a 15 dias úteis para outras localidades.'
  },
];

const HelpSupportScreen = () => {
  const navigation = useNavigation();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const toggleFaq = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };
  
  const handleContact = () => {
    if (!contactSubject.trim() || !contactMessage.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha o assunto e a mensagem.');
      return;
    }
    
    // Aqui seria enviada a mensagem para o suporte
    Alert.alert(
      'Mensagem Enviada',
      'Agradecemos o seu contato. Responderemos o mais breve possível.'
    );
    
    // Limpar formulário
    setContactSubject('');
    setContactMessage('');
  };
  
  const handleCall = () => {
    // Simular chamada para central de atendimento
    Linking.openURL('tel:08001234567');
  };
  
  const handleEmail = () => {
    // Abrir aplicativo de e-mail
    Linking.openURL('mailto:suporte@vinnyvitrine.com');
  };
  
  const handleChat = () => {
    Alert.alert(
      'Chat ao Vivo',
      'Esta funcionalidade estará disponível em breve. Por favor, utilize as outras formas de contato por enquanto.'
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajuda & Suporte</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formas de Contato</Text>
          
          <View style={styles.contactOptionsContainer}>
            <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
              <View style={styles.contactIconContainer}>
                <MaterialCommunityIcons name="phone" size={24} color="#333" />
              </View>
              <Text style={styles.contactOptionText}>Ligar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
              <View style={styles.contactIconContainer}>
                <MaterialCommunityIcons name="email" size={24} color="#333" />
              </View>
              <Text style={styles.contactOptionText}>E-mail</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactOption} onPress={handleChat}>
              <View style={styles.contactIconContainer}>
                <MaterialCommunityIcons name="chat" size={24} color="#333" />
              </View>
              <Text style={styles.contactOptionText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
          
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqQuestion}
                onPress={() => toggleFaq(faq.id)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <MaterialCommunityIcons 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#555" 
                />
              </TouchableOpacity>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envie sua Mensagem</Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Assunto</Text>
              <TextInput 
                style={styles.input}
                placeholder="Sobre o que você deseja falar?"
                value={contactSubject}
                onChangeText={setContactSubject}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mensagem</Text>
              <TextInput 
                style={styles.textArea}
                placeholder="Digite sua mensagem aqui..."
                value={contactMessage}
                onChangeText={setContactMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleContact}
            >
              <Text style={styles.sendButtonText}>Enviar Mensagem</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Central de Atendimento</Text>
          <Text style={styles.infoText}>0800 123 4567</Text>
          <Text style={styles.infoDetail}>Segunda a Sexta: 8h às 20h</Text>
          <Text style={styles.infoDetail}>Sábado: 9h às 15h</Text>
          
          <Text style={styles.infoTitle}>E-mail de Contato</Text>
          <Text style={styles.infoText}>suporte@vinnyvitrine.com</Text>
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
  contactOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  contactOption: {
    alignItems: 'center',
    width: '30%',
  },
  contactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactOptionText: {
    fontSize: 14,
    color: '#333',
  },
  faqItem: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  faqAnswer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    minHeight: 100,
  },
  sendButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  infoDetail: {
    fontSize: 13,
    color: '#777',
  },
});

export default HelpSupportScreen;