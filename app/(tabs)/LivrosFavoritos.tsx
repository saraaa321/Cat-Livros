import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground, // Importando o ImageBackground
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { pegarLivrosFavoritos, removerLivroFavorito } from "./utils/storageLivros";

// PONTO 1: Reutilizando a mesma paleta de cores e imagem de fundo
const COLORS = {
  salmao: '#EA7E66',
  coralClaro: '#F4A18C',
  amareloCafe: '#F6A800',
  cinzaEscuro: '#333D3B',
  cinzaMedio: '#69716D',
  azulSereno: '#355C7D',
  branco: '#FFFFFF',
};

const imagemDeFundo = require("../../assets/images/Fundo.png"); 

const Favoritos = () => {
  const isFocused = useIsFocused();
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // PONTO 2: Adicionando o estado para a funcionalidade "Ver Mais" nesta tela também
  const [livroExpandidoId, setLivroExpandidoId] = useState<string | null>(null);

  const carregarFavoritos = async () => {
    try {
      setCarregando(true);
      const livrosSalvos = await pegarLivrosFavoritos();
      setFavoritos(livrosSalvos);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar os favoritos.");
    } finally {
      setCarregando(false);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      carregarFavoritos();
      setLivroExpandidoId(null); // Reseta a expansão ao entrar na tela
    }
  }, [isFocused]);

  const handleRemoverFavorito = async (livroId, livroTitulo) => {
    try {
      await removerLivroFavorito(livroId);
      Alert.alert("Removido!", `'${livroTitulo}' foi removido dos seus favoritos.`);
      await carregarFavoritos();
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      Alert.alert("Erro", "Não foi possível remover o livro.");
    }
  };
  
  // PONTO 3: Função para alternar a sinopse, igual à da outra tela
  const handleToggleExpandir = (livroId: string) => {
    setLivroExpandidoId(livroExpandidoId === livroId ? null : livroId);
  };

  // PONTO 4: Renderização do card do livro, agora IDÊNTICA à da outra tela
  const renderizarFavorito = (livro, index) => {
    const capa = livro.volumeInfo.imageLinks?.thumbnail
      ? { uri: livro.volumeInfo.imageLinks.thumbnail }
      : require("../../assets/images/placeholder.png");
    const autores = livro.volumeInfo.authors ? livro.volumeInfo.authors.join(", ") : "Autor desconhecido";
    
    const estaExpandido = livro.id === livroExpandidoId;
    const descricao = livro.volumeInfo.description || '';
    
    return (
      <View key={livro.id || index} style={styles.cardLivro}>
        <Text style={styles.tituloLivro}>{livro.volumeInfo.title}</Text>
        <Image source={capa} style={styles.imagemCapa} />

        <View style={styles.secaoInfo}>
            <Text style={styles.subtituloInfo}>Autor(es):</Text>
            <Text style={styles.textoInfo}>{autores}</Text>
        </View>

        {descricao && (
          <View style={styles.secaoInfo}>
            <Text style={styles.subtituloInfo}>Sinopse:</Text>
            <Text style={styles.textoInfo}>
              {estaExpandido ? descricao : `${descricao.substring(0, 150)}...`}
            </Text>
            {descricao.length > 150 && (
              <TouchableOpacity onPress={() => handleToggleExpandir(livro.id)}>
                <Text style={styles.linkVerMais}>
                  {estaExpandido ? "Ver Menos" : "Ver Mais"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {/* O botão agora é de REMOVER */}
        <TouchableOpacity 
          onPress={() => handleRemoverFavorito(livro.id, livro.volumeInfo.title)} 
          style={styles.botaoRemover}
        >
          <Text style={styles.textoBotaoRemover}>Remover dos Favoritos</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <ImageBackground source={imagemDeFundo} style={styles.background}>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Meus Favoritos</Text>
          </View>

          {carregando ? (
            <ActivityIndicator size="large" color={COLORS.salmao} />
          ) : favoritos.length > 0 ? (
            favoritos.map(renderizarFavorito)
          ) : (
            <View style={styles.containerVazio}>
              <Text style={styles.textoVazio}>Sua estante de favoritos está vazia.</Text>
              <Text style={styles.textoVazioSub}>Explore a estante principal e adicione os livros que mais gostar!</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

// PONTO 5: Usando EXATAMENTE o mesmo StyleSheet da outra página, com pequenas adições
const styles = StyleSheet.create({
  // --- ESTILOS GERAIS DA TELA ---
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  scrollViewContainer: { paddingHorizontal: 16, paddingVertical: 24, flexGrow: 1 },
  header: { alignItems: "center", backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingVertical: 20, borderRadius: 12, marginBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.azulSereno },

  // --- ESTILOS DO CARD DO LIVRO (copiados da outra tela) ---
  cardLivro: { backgroundColor: COLORS.branco, borderRadius: 16, padding: 20, marginBottom: 24, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  tituloLivro: { fontSize: 22, fontWeight: 'bold', color: COLORS.azulSereno, textAlign: 'center', marginBottom: 20 },
  imagemCapa: { width: '100%', height: 300, resizeMode: 'contain', alignSelf: 'center', marginBottom: 0, borderRadius: 15, borderWidth: 1, borderColor: COLORS.cinzaMedio },
  secaoInfo: { marginBottom: 16 },
  subtituloInfo: { fontSize: 16, fontWeight: 'bold', color: COLORS.cinzaEscuro, marginBottom: 4 },
  textoInfo: { fontSize: 15, color: COLORS.cinzaMedio, lineHeight: 22 },
  linkVerMais: { color: COLORS.azulSereno, fontWeight: 'bold', marginTop: 8, textAlign: 'right' },
  
  // --- Botão de Remover (estilo próprio) ---
  botaoRemover: {
    backgroundColor: COLORS.salmao, // Cor de ação primária
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  textoBotaoRemover: {
    color: COLORS.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- Estilos para a tela vazia ---
  containerVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoVazio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.cinzaEscuro,
    textAlign: 'center',
  },
  textoVazioSub: {
    fontSize: 16,
    color: COLORS.cinzaMedio,
    textAlign: 'center',
    marginTop: 10,
  }
});

export default Favoritos;