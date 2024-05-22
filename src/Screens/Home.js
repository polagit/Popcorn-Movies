import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {BellIcon ,MagnifyingGlassIcon} from "react-native-heroicons/solid"
import {useNavigation} from "@react-navigation/native"
import {
    useQuery,
  } from '@tanstack/react-query'
import { FetchTrendingMovies } from "../../Utils/MovieApi";
import TrendingMovies from "../Components/TrendingMovies";
import axios from "axios";
import TopRated from "../Components/toprated";
import PopularMovies from "../Components/PopularMovies";


export default  function  Home() {
    const navigation =useNavigation();
    const [Trending,SetTrending]= useState([])
    const [popular,Setpopular]= useState([])
    const [topRated,SettopRated]= useState([])
    const fetchTrending = async () => {
        try {
            const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=8355c32af7798c96991c035a9bd6782d");    
            if (response.status !== 200) {
                throw new Error('Failed to fetch trending movies');
            }
            const trendingMovies = response.data.results;
            SetTrending(trendingMovies); 
            return trendingMovies;
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    };
    const fetchtoprated = async () => {
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=8355c32af7798c96991c035a9bd6782d");    
            if (response.status !== 200) {
                throw new Error('Failed to fetch trending movies');
            }
            const popularMovies = response.data.results;
            Setpopular(popularMovies); 
            return popularMovies;
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    };
    const fetchpop = async () => {
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=8355c32af7798c96991c035a9bd6782d");    
            if (response.status !== 200) {
                throw new Error('Failed to fetch trending movies');
            }
      
        const Top = response.data.results;
        SettopRated(Top); 
        return Top;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
    };
    useEffect(() => {
        fetchTrending()
        fetchpop()
        fetchtoprated()
    }, []);
    return ( 
     
        <View className="flex-1 ">
            <Image 
                source={require("../../assets/Black.jpg")}
                style={{
                    position:"absolute",
                    width:"100%",
                    height:"100%"
                }}
                resizeMode="cover"
            >  
            </Image>
            <StatusBar style="light"></StatusBar>
            
            <View className=" flex-row justify-between items-center mx-4 mg-4">
                <View className="border-2 border-white rounded-full overflow-hidden mt-11">
                    <Image source={require("../../assets/pola.jpeg")}
                    style={{
                        width:45,
                        height:45,
                    }}></Image>
                </View>
                    <View className="flex-row space-x-4 pt-9">
                        <BellIcon size={30} strokeWidth={2} color="white" />
                        <TouchableOpacity onPress={()=>{ navigation.navigate("Search")}}>
                            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white">
                            </MagnifyingGlassIcon>
                        </TouchableOpacity>
                    </View>

        </View>
        <ScrollView>
       {Trending?.length>0&& <TrendingMovies data={Trending}></TrendingMovies>   }
       {popular?.length>0&& <PopularMovies  data={popular}></PopularMovies>   }
       {topRated?.length>0&& <TopRated data={topRated}></TopRated>   }
        </ScrollView>
        </View>
     );
}

