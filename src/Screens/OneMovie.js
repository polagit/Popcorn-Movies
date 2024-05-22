import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import axios from 'axios'; // Import Axios
import { ChartBarIcon, ChevronDoubleLeftIcon, FilmIcon, HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { image500 } from "../../Utils/MovieApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopularMovies from "../Components/PopularMovies";

const { width, height } = Dimensions.get("window");

export default function OneMovie() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [similar, setSimilar] = useState([]);
    const [isSaved, toggleFav] = useState(false);

    const fetchSimilar = async (id) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=8355c32af7798c96991c035a9bd6782d`);
            const sim = response.data.results;
            setSimilar(sim);
        } catch (error) {
            console.error('Error fetching similar movies:', error);
        }
    };

    useEffect(() => {
        fetchSimilar(item.id);
        checkSavedStatus();
    }, [item]);

    const handleBack = () => {
        navigation.goBack();
    };

    const checkSavedStatus = async () => {
        try {
            const savedMovies = await AsyncStorage.getItem("SavedMovies");
            const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
            const isMovieSaved = savedMoviesArray.some(savedMovie => savedMovie.id === item.id);
            toggleFav(isMovieSaved);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleFavandSave = async () => {
        try {
            const savedMovies = await AsyncStorage.getItem("SavedMovies");
            let savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

            if (!isSaved) {
                savedMoviesArray.push(item);
            } else {
                savedMoviesArray = savedMoviesArray.filter(savedMovie => savedMovie.id !== item.id);
            }

            await AsyncStorage.setItem("SavedMovies", JSON.stringify(savedMoviesArray));
            toggleFav(!isSaved);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 text-white">
            <View className="w-full">
                <View className="z-20 w-full flex-row justify-between items-center px-4 mt-12 absolute">
                    <View className=" bg-red-700 p-2 rounded-full items-center justify-center">
                        <TouchableWithoutFeedback onPress={handleBack}>
                            <ChevronDoubleLeftIcon size={30} strokeWidth={2} color="white" />
                        </TouchableWithoutFeedback>
                    </View>
                    <View className=" bg-red-700 p-2 rounded-full items-center justify-center">
                        <TouchableWithoutFeedback onPress={toggleFavandSave}>
                            <HeartIcon size={30} strokeWidth={2} color={isSaved ? "red" : "white"} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View>
                    <Image
                        source={{ uri: image500(item.poster_path) }}
                        style={{ width, height: height * .55 }}
                    />
                </View>
            </View>
            <View className="space-y-3 flex-1 bg-white py-8" style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                <Image source={require("../../assets/Black.jpg")} style={{ width, height }} resizeMode="cover" className="absolute top-0 left-0" />
                <View className="space-y-2  p-2" style={{ marginTop: -(height * 0.09) }}>
                    <Text className="text-white text-left text-3xl font-bold tracking-widest">
                        {item?.title} <FilmIcon size={25} color="red" />
                    </Text>
                    <Text className="flex-row text-2xl text-white space-x-2">
                        Vote average  : {item?.vote_average} <StarIcon size={25} color="yellow" style={{ marginBottom: 30 }} />
                    </Text>
                    <Text className="flex-row text-2xl space-x-2 text-white">
                        Vote Count :{item?.vote_count}  <ChartBarIcon StarIcon size={20} color="white" />
                    </Text>
                    <Text className="text-white text-sm leading-6">
                        {item?.overview}
                    </Text>
                    {similar?.length > 0 && <PopularMovies data={similar} title={"Similar Movies"}></PopularMovies>}
                </View>
            </View>
        </ScrollView>
    );
}
