// ListaLivros.tsx com a funcionalidade "Ver Mais"

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { salvarLivroFavorito } from "./utils/storageLivros";

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

const ListaLivros = () => {
  const opcoesMenu = [{ id: "2", titulo: "Favoritos", rota: "/LivrosFavoritos" }];
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // PONTO 1: Novo estado para controlar o ID do livro expandido.
  const [livroExpandidoId, setLivroExpandidoId] = useState<string | null>(null);

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        const termoDeBusca = "romance";
        const url = `https://www.googleapis.com/books/v1/volumes?q=${termoDeBusca}&maxResults=10`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          setLivros(data.items);
        }
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os livros:", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarLivros();
  }, []);
  
  // PONTO 2: Função para alternar a exibição da sinopse
  const handleToggleExpandir = (livroId: string) => {
    setLivroExpandidoId(livroExpandidoId === livroId ? null : livroId);
  };

  const renderizarLivro = (livro, index) => {
    const capa = livro.volumeInfo.imageLinks?.thumbnail
      ? { uri: livro.volumeInfo.imageLinks.thumbnail }
      : require("../../assets/images/placeholder.png");
    const autores = livro.volumeInfo.authors ? livro.volumeInfo.authors.join(", ") : "Autor desconhecido";
    
    // PONTO 3: Verificamos se ESTE card é o que deve estar expandido
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

        {/* PONTO 4: Lógica de exibição da sinopse e do botão "Ver Mais" */}
        {descricao && (
          <View style={styles.secaoInfo}>
            <Text style={styles.subtituloInfo}>Sinopse:</Text>
            <Text style={styles.textoInfo}>
              {/* Mostra o texto completo ou apenas os primeiros 150 caracteres */}
              {estaExpandido ? descricao : `${descricao.substring(0, 150)}...`}
            </Text>
            {/* O link só aparece se a descrição for longa o suficiente */}
            {descricao.length > 150 && (
              <TouchableOpacity onPress={() => handleToggleExpandir(livro.id)}>
                <Text style={styles.linkVerMais}>
                  {estaExpandido ? "Ver Menos" : "Ver Mais"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        
        <TouchableOpacity onPress={() => salvarLivroFavorito(livro)} style={styles.botaoFavoritar}>
          <Text style={styles.textoBotaoFavoritar}>Favoritar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={imagemDeFundo} style={styles.background}>
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.header}>
            <Image source={require("../../assets/images/LogoSemFundo.png")} style={styles.logo} />
            <Text style={styles.title}>Nossa Estante</Text>
          </View>
          <View style={styles.menu}>
              {opcoesMenu.map((item) => (
                <TouchableOpacity key={item.id} style={styles.botaoMenu} onPress={() => router.push(item.rota as any)}>
                  <Text style={styles.textoBotaoMenu}>{item.titulo}</Text>
                </TouchableOpacity>
              ))}
            </View>
          <Text style={styles.tituloSecao}>Livros Encontrados</Text>
          
          {carregando ? (
            <ActivityIndicator size="large" color={COLORS.salmao} />
          ) : (
            livros.map(renderizarLivro)
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // --- (Todos os seus estilos anteriores permanecem aqui) ---
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' },
  scrollViewContainer: { paddingHorizontal: 16, paddingVertical: 24 },
  header: { alignItems: "center", backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingVertical: 20, borderRadius: 12, marginBottom: 20 },
  logo: { width: 200, height: 90, borderRadius: 20, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.azulSereno },
  menu: { flexDirection: "row", justifyContent: "space-around", marginBottom: 30 },
  botaoMenu: { backgroundColor: COLORS.azulSereno, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, elevation: 3 },
  textoBotaoMenu: { color: COLORS.branco, fontWeight: "bold" },
  tituloSecao: { fontSize: 22, fontWeight: "bold", color: COLORS.cinzaEscuro, textAlign: "center", marginBottom: 20 },
  cardLivro: { backgroundColor: COLORS.branco, borderRadius: 16, padding: 20, marginBottom: 24, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  tituloLivro: { fontSize: 22, fontWeight: 'bold', color: COLORS.azulSereno, textAlign: 'center', marginBottom: 20 },
  imagemCapa: { width: '100%', height: 300, resizeMode: 'contain', alignSelf: 'center', marginBottom: 0, borderRadius: 15, borderWidth: 1, borderColor: COLORS.cinzaMedio },
  secaoInfo: { marginBottom: 16 },
  subtituloInfo: { fontSize: 16, fontWeight: 'bold', color: COLORS.cinzaEscuro, marginBottom: 4 },
  textoInfo: { fontSize: 15, color: COLORS.cinzaMedio, lineHeight: 22 },
  botaoFavoritar: { backgroundColor: COLORS.salmao, paddingVertical: 14, paddingHorizontal: 25, borderRadius: 10, alignSelf: 'center', marginTop: 15 },
  textoBotaoFavoritar: { color: COLORS.branco, fontSize: 16, fontWeight: 'bold' },

  // PONTO 5: Novo estilo para o link de "Ver Mais"
  linkVerMais: {
    color: COLORS.azulSereno,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'right', // Alinha o link à direita para um visual mais limpo
  },
});

export default ListaLivros;