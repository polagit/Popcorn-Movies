import { Image, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import { useNavigation } from "@react-navigation/native";




export default function  Welcome() {
    const Navigation =useNavigation();
    return ( 
        <View className=" flex-1 justify-end  justify-center items-center  relative ">
           <Image source={require("../../assets/popcorn.jpg")}
            style={{
                position:"absolute",
                width:"100%",
                height:"100%"


            }}
           resizeMode="cover"
           />
           <View className="flex items-center justify-center ">
            <Text className="text-white  text-4xl font-extrbold  my-1">PopCorn Cenima</Text>
            <View className="my-4 mb-36">
                <TouchableOpacity className=" px-12 py-4 rounded-lg bg-red-600"  onPress={()=> Navigation.navigate("Home")}>
                    <Text className="text-white text-lg font-medium"
                    >Explore</Text>
                </TouchableOpacity>
            </View>
           </View>

        </View>
     );
}

