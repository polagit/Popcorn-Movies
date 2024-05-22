import React from 'react';
import { Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { image500 } from './../../Utils/MovieApi';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function MoviesCard({ item }) {
    const Navigation=useNavigation();


    return (
        <TouchableWithoutFeedback onPress={()=>Navigation.push('OneMovie',item)}>
            <Image 
                source={{
                    uri: image500(item.poster_path),
                }}
                style={{
                    width: width * 0.8,
                    height: height * 0.49,
                    resizeMode: 'cover'
                }}
                resizeMode="cover"
                className="rounded-3xl" 
            /> 
        </TouchableWithoutFeedback>
    );
}
