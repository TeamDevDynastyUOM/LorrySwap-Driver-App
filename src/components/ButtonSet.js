import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useRideContext } from '../context/RideContext';


const ButtonSet = () => {    
    const navigation = useNavigation();3

    const {verify} = useRideContext();

    // function hashCode(a, b) {
    //     const sortedValues = [a, b].sort((x, y) => x - y);
    //     const sortedString = sortedValues.join('-');
    //     return sortedString.split('').reduce((hash, char) => {
    //         hash = ((hash << 5) - hash) + char.charCodeAt(0);
    //         return hash & hash;
    //     }, 0);
    // }

    // const username = 'Gihani Wijekoon';
    // const room = hashCode(2,3);
    // const item = {
    //     driverName: "Gihani Wijekoon",
    //     photo: "https://drive.google.com/uc?export=view&id=1ILCFnDV2xNg9lm45YBWNlAqDPpgK6qsB"
    // };

    return (
            <View style={styles.buttonSet}>
                <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate("Menu")}>
                    <Feather name='menu' style={{ fontSize: 30}} />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate("ConfirmRides")} >
                        <FontAwesome5 name='clipboard-list' style={{ fontSize: 30}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('DriverChatSearch')}>
                        <Entypo name='chat' style={{ fontSize: 30}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate("Notification")}>
                        <MaterialIcons name='notifications-active' style={{ fontSize: 30}} />
                    </TouchableOpacity>
                    {verify &&
                        <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate("SpecialRequest")}>
                            <MaterialCommunityIcons name='playlist-star' style={{ fontSize: 40}} />
                        </TouchableOpacity>
                    }

                </View>
            </View>
    );
};
const styles = StyleSheet.create({

    buttonSet:{
        position: 'absolute',
        paddingTop: 30,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circleButton: {
        width:  55,
        height: 55,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: 'rgba(197, 197, 197, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ButtonSet;