// import React from 'react';
// import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
// // StackNavigationProp é usado para tipar a prop 'navigation' quando se usa um Stack Navigator
// import { StackNavigationProp } from '@react-navigation/stack'; 

// // Definindo os tipos para a navegação.
// // Se você estiver usando Expo Router, ele geralmente infere as rotas,
// // mas é bom ter a tipagem explícita.
// type RootStackParamList = {
//   Home: undefined;       // Sua tela inicial
//   ListaLivros: undefined; // Esta tela
// };

// // Define o tipo da propriedade 'navigation' específica para esta tela
// type ListaLivrosScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'ListaLivros'
// >;

// // Define as propriedades que o componente ListaLivrosScreen receberá
// type ListaLivrosScreenProps = {
//   navigation: ListaLivrosScreenNavigationProp;
// };

// // Componente funcional ListaLivrosScreen
// const ListaLivrosScreen: React.FC<ListaLivrosScreenProps> = ({ navigation }) => {
//   // Função para voltar para a tela anterior na pilha de navegação
//   const handleGoBack = () => {
//     navigation.goBack(); // 'goBack()' retorna para a tela anterior
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Configura a barra de status */}
//       <StatusBar backgroundColor="#333D3B" barStyle="light-content" />
//       <View style={styles.content}>
//         <Text style={styles.title}>Minha Lista de Livros</Text>
//         <Text style={styles.subtitle}>Aqui você poderá ver seus livros favoritos!</Text>

//         {/* Botão para voltar à tela anterior */}
//         <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
//           <Text style={styles.backButtonText}>Voltar para Home</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Definição dos estilos
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#333D3B', // Cor de fundo diferente para diferenciar da tela inicial
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center', // Centraliza o conteúdo verticalmente
//     alignItems: 'center',    // Centraliza o conteúdo horizontalmente
//     paddingHorizontal: 20,   // Espaçamento horizontal
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FFFFFF', // Cor do título
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#F4A18C', // Cor do subtítulo (da sua paleta)
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   backButton: {
//     backgroundColor: '#EA7E66', // Cor do botão (da sua paleta)
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 20, // Cantos arredondados
//     marginTop: 20,
//   },
//   backButtonText: {
//     color: '#FFFFFF', // Cor do texto do botão
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ListaLivrosScreen; // Exporta o componente
