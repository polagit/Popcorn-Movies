import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MoviesCard from './MoviesCards';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        // Navigate to the details screen of the selected movie
        navigation.navigate('MovieDetails', { movie: item });
    };

    return (
        <View style={{ marginTop: 2, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ marginLeft: 4, marginBottom: 4, fontSize: 20, fontWeight: 'bold', color: '#ff0000' }}>
                    Trending Movies
                </Text>
            </View>

            <Carousel
                data={data}
                renderItem={({ item }) => <MoviesCard item={item} key={item.id} handleClick={() => handleClick(item)} />}
                firstItem={1}
                inactiveSlideScale={0.06}
                inactiveSlideOpacity={0.6}
                sliderWidth={width}
                itemWidth={width * 0.8}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    );
}
