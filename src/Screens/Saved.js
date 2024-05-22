// Saved.js
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import { image500 } from '../../Utils/MovieApi';

const { width, height } = Dimensions.get('window');
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Saved = () => {
    const navigation = useNavigation();
    const [savedMovies, setMovies] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const loadSaved = async () => {
                try {
                    const savedLocal = await AsyncStorage.getItem("SavedMovies");
                    const savedArray = savedLocal ? JSON.parse(savedLocal) : [];
                    setMovies(savedArray);
                } catch (error) {
                    console.log("error:", error);
                }
            };

            loadSaved(); 
        }, [])
    );

    return (
      <View style={{ flex: 1, position: 'relative' }}>
      <Image
          source={require('../../assets/Black.jpg')}
          style={{ width: width, height: height, position: 'absolute' }}
      />
 
      <Text style={{ color: 'white', marginTop: 45, marginBottom: 10, textAlign: 'center', fontSize: 18 }}>
                 You Have  {savedMovies.length}  Favourite Movies
              </Text>
   

      <ScrollView
          showsVerticalScrollIndicator
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ flex: 1, spaceBetween: 24 }}
      >
          <>
              <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'  }}>
                  {savedMovies.map((movie) => (
                      <TouchableWithoutFeedback
                          key={movie.id}
                          onPress={() => navigation.push('OneMovie', movie )}
                      >
                          <View style={{ marginBottom: 16, marginRight: 15 }}>
                              <Image
                                  source={{ uri: image500(movie.poster_path) }}
                                  style={{
                                      borderRadius: 24,
                                      width: width * 0.4,
                                      height: height * 0.3,
                                  }}
                              />
                              <Text style={{ color: 'white',  fontSize: 18, textAlign: 'center', marginTop: 8 }}>
                                  {movie.title?.length > 18 ? `${movie.title.slice(0, 18)}` : movie.title}
                              </Text>
                          </View>
                      </TouchableWithoutFeedback>
                  ))}
              </View>
          </>
      </ScrollView>
  </View>
    );
};

export default Saved;
