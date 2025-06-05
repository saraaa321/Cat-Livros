// import React from 'react';
// import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image,SafeAreaView,StatusBar,} from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// import { Video } from 'expo-av'; 

// type RootStackParamList = {
//     Home: undefined;
//     ListaLivros: undefined;
// };

// type HomeScreenProps = {
//     navigation: NavigationProp<RootStackParamList, 'Home'>;
// };

// const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
//     const handleEntrarPress = () => {
//         navigation.navigate('ListaLivros');
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar backgroundColor="#355C7D" barStyle="light-content" />
//             <ImageBackground
//                 source={require('../../assets/images/fundo.png')}
//                 style={styles.backgroundImage}
//                 resizeMode="cover"
//             >
//                 <View style={styles.content}>
//                     <View style={styles.logoContainer}>
//                         <Image
//                             source={require('../../assets/images/LogoSemFundo.png')}
//                             style={styles.logo}
//                             resizeMode="contain"
//                         />
//                     </View>

//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>Bem-vindo</Text>
//                         <Text style={styles.subtitle}>Descubra sua próxima leitura favorita</Text>
//                     </View>

//                     <TouchableOpacity
//                         style={styles.enterButton}
//                         onPress={handleEntrarPress}
//                         activeOpacity={0.8}
//                     >
//                         <Text style={styles.enterButtonText}>Entrar</Text>
//                     </TouchableOpacity>

//                     <View style={styles.decorativeElements}>
//                         <View style={[styles.circle, styles.circle1]} />
//                         <View style={[styles.circle, styles.circle2]} />
//                     </View>
//                 </View>
//             </ImageBackground>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backgroundImage: {
//         flex: 1,
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 32,
//         position: 'relative',
//         width: '100%',
//     },
//     logoContainer: {
//         marginBottom: 40,
//         alignItems: 'center',
//     },
//     logo: {
//         width: 200,
//         height: 200,
//     },
//     titleContainer: {
//         alignItems: 'center',
//         marginBottom: 60,
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//         marginBottom: 8,
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#F4A18C',
//         textAlign: 'center',
//         lineHeight: 22,
//         paddingHorizontal: 20,
//         textShadowColor: 'rgba(183, 132, 132, 0.75)',
//         textShadowOffset: { width: -1, height: 1 },
//         textShadowRadius: 10,
//     },
//     enterButton: {
//         backgroundColor: '#EA7E66',
//         paddingVertical: 15,
//         paddingHorizontal: 60,
//         borderRadius: 25,
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//     },
//     enterButtonText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '600',
//         textAlign: 'center',
//     },
//     decorativeElements: {
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     },
//     circle: {
//         position: 'absolute',
//         borderRadius: 50,
//         opacity: 0.1,
//     },
//     circle1: {
//         width: 100,
//         height: 100,
//         backgroundColor: '#F4A18C',
//         top: 100,
//         left: 30,
//     },
//     circle2: {
//         width: 80,
//         height: 80,
//         backgroundColor: '#EA7E66',
//         bottom: 120,
//         right: 40,
//     },
// });

// export default HomeScreen;


import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image,SafeAreaView,StatusBar,} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Video } from 'expo-av'; 

type RootStackParamList = {
  Home: undefined;
  ListaLivros: undefined;
};

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleEntrarPress = () => {
    navigation.navigate('ListaLivros');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#355C7D" barStyle="light-content" />

      <Video
        source={require('../../assets/images/fundo1.mp4')} 
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay 
        isLooping 
        isMuted />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/LogoSemFundo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Descubra sua próxima leitura favorita</Text>
        </View>

        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleEntrarPress}
          activeOpacity={0.8}
        >
          <Text style={styles.enterButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.decorativeElements}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundVideo: { 
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)', 
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#F4A18C',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  enterButton: {
    backgroundColor: '#EA7E66',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: '#F4A18C',
    top: 100,
    left: 30,
  },
  circle2: {
    width: 80,
    height: 80,
    backgroundColor: '#EA7E66',
    bottom: 120,
    right: 40,
  },
});

export default HomeScreen;