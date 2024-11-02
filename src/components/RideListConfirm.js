import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import GlobalStyles from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const RidesListConfirm = ({ results, display }) => {

    const [newResults, setNewResults] = useState(results);
    const navigation = useNavigation();

    if (!newResults.length){
        return(
            <View style={styles.noResults}>
                <Text style={styles.textNoResult}>Oops! No results found.</Text>
                <Text style={styles.textNoResult01}>Try a different way</Text>
                <TouchableOpacity style={GlobalStyles.waitingButton} onPress={() => navigation.navigate("WaitingForRides")}>
                    <Text style={GlobalStyles.continueButton}>Waiting for Rides</Text>
                    <FontAwesome5 name='arrow-right' style={GlobalStyles.continueButton}/>
                </TouchableOpacity>
            </View>
        )
    }


    const handleCardPress = (item) => {
        navigation.navigate('AcceptRequest', { selectedItem: item, display: display})
    };

    return( 
    <View style={styles.container}>
        <FlatList
            data={newResults}
            keyExtractor={(newResults)=> newResults.id}
            renderItem={( {item} ) => {
                
                return(
                    <TouchableOpacity style={styles.listItem} onPress={() => handleCardPress(item)}>
                        <View style={styles.info}>
                            <Text style={styles.text01}>{item.fname} {item.lname}    {item.actor}</Text>
                            <Text style={styles.text02}>{item.location} to {item.destination}</Text>
                            <Text style={styles.text01}>{item.phone}</Text>
                            {item.cf_confirmation == 0 && item.cf_rejection == 0?(
                                <Text style={styles.wait}>Waiting for confirmation...</Text>
                            ) : item.cf_confirmation == 1 ?(
                                <Text style={styles.confirm}>Confirmed</Text>
                            ) : item.cf_rejection == 1 ?(
                                <Text style={styles.reject}>Rejected</Text>
                            ): null}
                        </View>
                        <View style={styles.date}>
                            <Text style={styles.text03}>{item.date}</Text>
                            <View style={styles.addButton} >
                                {item.cf_confirmation == 1 ?(
                                    <FontAwesome5 name='check' size= {20} color={'green'} fontWeight='bold'/>
                                ) : null}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: -25,
        marginBottom: 130,
    },
    listItem:{
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#dedede",
        flexDirection: "row",
    },
    info:{
        paddingLeft: 5,
        marginVertical: 3,
        maxWidth: 260,
    },   
    date:{
        flex: 1,
        alignItems: 'flex-end',
    },
    text01:{
        fontSize:15,
        color: '#004344',
    },
    text02:{
        fontSize:17,
        fontWeight: 'bold',
        color: '#004344',
    },
    text03:{
        position: 'absolute',
        fontSize:12,
        color: '#004344'
    },
    confirm:{
        fontSize:15,
        color: 'green',
        fontWeight: 'bold',
    },
    reject:{
        fontSize:15,
        color: 'red',
        fontWeight: 'bold',
    },
    wait:{
        fontSize:15,
        color: '#004344',
        fontWeight: 'bold',
    },
    addButton: { 
        flex:1, 
        justifyContent:'center', 
        padding: 5,
    },
    noResults: {
        flex: 1, 
        alignItems:'center',
        justifyContent:'center',
    },
    textNoResult: {
        fontSize: 17,
        color: '#004344',
        fontWeight: 'bold',
    },
    textNoResult01: {
        fontSize: 14,
        color: '#004344'
    },
});

export default RidesListConfirm;