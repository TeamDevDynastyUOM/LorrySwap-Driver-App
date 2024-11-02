import React, {useState} from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchDriver = ({data}) => {

    const navigation = useNavigation();

    const handleOnPress = (item) => {
        console.log("hei",item);
        navigation.navigate('DriverDetails', { item });
        console.log(item)
    };
    

    return( 
    <View style={styles.container}>
        <FlatList
            data={data}
            keyExtractor={(data)=> data.id}
            showsVerticalScrollIndicator={false}
            renderItem={( {item} ) => {
                return (
                    <View>
                        <TouchableOpacity style={styles.listItem} onPress={() => handleOnPress(item)} >
                            <Image style={styles.dp} source={{ uri: item.photo }} />
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.text04}>{item.driverName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.hrLine}>
                        </View>
                    </View>
                );
            }}
        />
    </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // marginTop: -20,
        marginBottom: 120,
    },
    listItem:{
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
    },
    dp:{
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    info:{
        paddingLeft: "5%",
        marginVertical: "3%",
    },   
    hrLine:{
        height: 1,
        backgroundColor: '#004344'
    },
    text04:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#004344',
        marginRight: 8,
    },
});

export default SearchDriver;
