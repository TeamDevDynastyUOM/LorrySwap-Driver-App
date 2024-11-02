import React,{useEffect} from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import GlobalStyles from "../styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import ButtonOutlined from "./ButtonOutlined";
import ButtonContained from "./ButtonContained";
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const RidesList = ({results, onAddItem, onRemove, iconName, display }) => {
    const navigation = useNavigation();
    const { id, token,vehicle, totalWeight, } = useRideContext();
    const handleCardPress = (item) => {
        navigation.navigate('AcceptRequest', { selectedItem: item, display: display})
    };
    const addItems = (item) => {
        onAddItem(item);
        console.log(`No ${item.id} Added`);
    };

    const removeItems = (item) => {
        onRemove(item);
        console.log(`No ${item.id} Removed`);
    };

    const addOrRemove = (item) => {
        switch (iconName){
            case 'pluscircleo':
                addItems(item);
                break;
            case 'minuscircleo':{
                removeItems(item);
                break;
            }
        }  
    }

    const onPress = () => {
        navigation.navigate("WaitingForRides")
    }    
    const onAccept = async (item) => {
        Alert.alert('Are you sure?', 'If you accepted, you cannot reject it.',[ 
            { text: 'No'},
            { text: 'Yes', onPress: () => acceptRequest(item) }
        ]) 
    }
    const acceptRequest = async (item) => {
        try {
            const arrayItem = [item]
            const response = await fetch(`${BASE_URL}/driver/confirm/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(arrayItem),
            });
            console.log(response)
            if (response.ok) {
                Alert.alert('Accepted!', 'Special Request successfully accepted. You can see it in Confirm Ride Page.',[ 
                    { text: 'Ok'}
                ])
                console.log('Successfully backend up to date');
            }else if (response.status == 401){
                Alert.alert('Unauthorized!', '',[ 
                    { text: 'Ok'}
                ])
                console.log('Unauthorized');
            }else{
                Alert.alert('Error!', 'Something went wrong, Please try again.',[ 
                    { text: 'Ok'}
                ])
                console.log('Failed to update backend');
            }
        }catch (error) {
            console.error('Error updating backend:', error);
        }
    }
    const onReject = async (item) => {
        Alert.alert('Are you sure?','Do you want to reject this ride?',[ 
            { text: 'No'},
            { text: 'Yes', onPress: () => rejectRequest(item) }
        ]) 
    }
    const rejectRequest = async (item) => {
        try {
            const response = await fetch(`${BASE_URL}/driver/reject/${item.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            });
            if (response.ok) {
                Alert.alert('Rejected!', 'Special Request successfully rejected.',[ 
                    { text: 'Ok'}
                ])
                console.log('Successfully backend up to date');
            }else{
                Alert.alert('Error!', 'Something went wrong. Your action is not placed well. Try again!',[ 
                    { text: 'Ok'}
                ])
                console.error('Failed to update backend');
            }
        }catch (error) {
            console.error('Error updating backend:', error);
        }
    }

    if (!results.length && display == 0){
        return(
            <View style={styles.noResults}>
                <Text style={styles.textNoResult}>Oops! No results found.</Text>
                <Text style={styles.textNoResult01}>Try a different way</Text>
                <ButtonOutlined buttonName="Waiting for Rides" onPress={onPress} arrow="right"/>
            </View>
        )
    }

    if (!results.length && display == 1){
        return(
            <View style={styles.noResults}>
                <Text style={styles.textNoResult}>Oops! No results found.</Text>
                <Text style={styles.textNoResult}>Please select ride.</Text>
                <Text style={styles.textNoResult}></Text>
                <Text style={styles.textNoResult01}>You can select rides from</Text>
                <Text style={styles.textNoResult01}>Suggested Rides and Special Request</Text>
                <View style={styles.buttonRow}>
                </View>
            </View>
        )
    }

    if (!results.length && display == 2){
        return(
            <View style={styles.noResults}>
                <Text style={styles.textNoResult}>Oops! No Special Requests found.</Text>
                <Text style={styles.textNoResult01}>Try a different way</Text>
            </View>
        )
    }

    return( 
    <View style={styles.container}>
        <FlatList
            data={results}
            keyExtractor={(results)=> results.id}
            renderItem={( {item} ) => {
                return(
                    <TouchableOpacity key={item.id} onPress={() => handleCardPress(item)}>
                        <View style={styles.listItem}>
                            <View style={styles.info}>
                                <Text style={styles.text01}>{item.fname} {item.lname}</Text>
                                <Text style={styles.text02}>{item.location} to {item.destination}</Text>
                                <Text style={styles.text01}>{item.phone}</Text>
                            </View>
                            <View style={styles.date}>
                                <Text style={styles.text03}>{item.date}</Text>
                                {display == 2 ?(
                                     totalWeight + item.weight > vehicle.tonnage ?(
                                        <View style={{...styles.buttonSet, marginTop: 20}}>
                                            <ButtonOutlined buttonName="Reject" onPress={() => onReject(item)} arrow="" size="small"/>
                                        </View>
                                    ):(
                                        <View style={styles.buttonSet}>
                                            <ButtonContained buttonName="Accept" onPress={() => onAccept(item)} arrow="" size="small"/>
                                            <ButtonOutlined buttonName="Reject" onPress={() => onReject(item)} arrow="" size="small"/>
                                        </View>
                                    )
                                ):(
                                    <TouchableOpacity style={styles.addButton} onPress={() => addOrRemove(item)}>
                                        <AntDesign name={iconName} size= {20} color={'#004344'}/>
                                    </TouchableOpacity>
                                )}

                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
        <View style={styles.bottombuttom}>
        {display == 0?(
            <ButtonOutlined buttonName="Waiting for Rides" onPress={onPress} arrow=""/>
        ): null}
        </View>
    </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: -25,
        marginBottom: 180,
    },
    listItem:{
        marginHorizontal: 20,
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
    buttonRow:{
        flexDirection: 'row',
    },
    bottombuttom:{
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 10,
        bottom: 45
    },
    buttonSet:{
        marginTop: 15,
        alignItems: 'center',
        gap: 5
    }
});

export default RidesList;
