import { Dimensions, FlatList, Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { image500 } from "../../Utils/MovieApi";
import { useNavigation } from "@react-navigation/native";

 
 
 
 const {width,height} =Dimensions.get("window")
export default  function PopularMovies ({data ,title}) {
    const navigate=useNavigation();
    const renderItem=({item})=>{
    return (
            <TouchableWithoutFeedback key={item.id} onPress={()=>navigate.push("OneMovie",item)}>
                <View className="space-y-1 mr-4">
                    <Image
                        source={{
                            uri:image500(item.poster_path)
                        }}
                        className="rounded-3xl"
                        style={{
                            width:width*.4,
                            height:height*.3,

                        }}
                    />
                    <Text className=" text-red-500   ml-1 text-lg font-bold ">
                        {item.title.length>12 ?item.title.slice(0,12) :item.title }    
                    </Text>

                    

                </View>


            </TouchableWithoutFeedback>


      );

    };

      return(
        <View className="space-y-4 mb-4"> 
            <View className=" mx-4 flex-row justify-between items-center"> 
            <Text className="text-red-500 text-2xl  font-bold mt-1">{title? title :"Popular Movies"}</Text>

            </View>
            <FlatList
              horizontal
              data={data}
              renderItem={renderItem}   
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal:15 
                         }}
            
            />

        </View>
        
      );      
     
}
