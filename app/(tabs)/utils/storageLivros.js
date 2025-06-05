import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = 'livros_favoritos';

export const salvarLivroFavorito = async (livro) => {
  try {
    const json = await AsyncStorage.getItem(CHAVE_STORAGE);
    const favoritos = json ? JSON.parse(json) : [];

    const existe = favoritos.some(item => item.id === livro.id);

    if (!existe) {
      favoritos.push(livro);
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(favoritos));
      alert(`'${livro.volumeInfo.title}' foi adicionado aos favoritos!`);
    } else {
      alert("Este livro já está nos seus favoritos.");
    }
  } catch (e) { 
    console.error("Erro ao salvar livro favorito:", e); 
  }
};

// ** FUNÇÃO CORRIGIDA **
export const pegarLivrosFavoritos = async () => {
  try {
    const json = await AsyncStorage.getItem(CHAVE_STORAGE);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Erro ao buscar livros favoritos:", e);
    return []; // Retorna um array vazio em caso de erro
  }
};

export const removerLivroFavorito = async (idLivro) => {
  try {
    // Agora esta chamada vai funcionar corretamente
    let favoritos = await pegarLivrosFavoritos();
    favoritos = favoritos.filter(item => item.id !== idLivro);
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(favoritos));
  } catch (e) { 
    console.error("Erro ao remover livro favorito:", e); 
  }
};