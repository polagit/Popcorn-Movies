import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { image500 } from '../../Utils/MovieApi';

const { width, height } = Dimensions.get('window');

export default function Search({ navigation }) {
    const [searchbar, setSearch] = useState('');
    const [result, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query) => {
        if (!query) return setResults([]);;
        setLoading(true);
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '8355c32af7798c96991c035a9bd6782d',
                    query,
                    include_adult: false,
                    language: 'en-US',
                    page: 1,
                },
            });
            setResults(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                source={require('../../assets/Black.jpg')}
                style={{ width: width, height: height, position: 'absolute' }}
            />
            <View style={{ marginTop: 46, marginBottom: 12, marginHorizontal: 16, flexDirection: 'row', padding: 8, justifyContent: 'space-between', alignItems: 'center', borderRadius: 20, backgroundColor: 'white' }}>
                <TextInput
                    value={searchbar}
                    onChangeText={(text) => {
                        setSearch(text);
                        handleSearch(text);
                    }}
                    placeholder="Search for a movie"
                    placeholderTextColor="grey"
                    style={{ paddingTop: 8, paddingLeft: 16, flex: 1, color: 'black' }}
                />
            </View>
            <Text style={{ color: 'white', marginTop: 3, marginBottom: 3, textAlign: 'center', fontSize: 18 }}>
                        {result.length} Results
                    </Text>
            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator
                contentContainerStyle={{ paddingHorizontal: 15 }}
                style={{ flex: 1, spaceBetween: 24 }}
            >
                <>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {result.map((movie) => (
                            <TouchableWithoutFeedback
                                key={movie.id}
                                onPress={() => navigation.push('OneMovie', movie )}
                            >
                                <View style={{ marginBottom: 16, marginRight: 8 }}>
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
}
