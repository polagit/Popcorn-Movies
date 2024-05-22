import { useNavigation } from "@react-navigation/native";
import { Dimensions, FlatList, Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { image500 } from "../../Utils/MovieApi";

const { width, height } = Dimensions.get("window");

export default function TopRated({ data }) {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.push('OneMovie', item )}>
                <View style={{ marginBottom: 6, marginRight: 4 }}>
                    <Image
                        source={{ uri: image500(item.poster_path) }}
                        style={{ width: width * 0.5, height: height * 0.25, borderRadius: 20 }}
                        resizeMode="cover"
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <View style={{ marginBottom: 4 }}>
            <View style={{ marginLeft: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ff0000' }}>Top Rated Movies</Text>
            </View>
            <FlatList
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </View>
    );
}
