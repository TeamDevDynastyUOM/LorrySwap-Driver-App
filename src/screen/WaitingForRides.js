import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import DirectionMapWaiting from './DirectionMapWaiting';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import ButtonSet from '../components/ButtonSet'
import { BASE_URL } from '../../config';
import ButtonOutlined from '../components/ButtonOutlined';

const WaitingForRides= () => {

    const navigation = useNavigation();

    const { inputData, confirmItems,setInputData,id, token} = useRideContext();

    const goback = () => {
        // Alert user when he/she trying to go back
        Alert.alert('Are you sure?', 'If you change the route, all the rides you selected will disappear.',[ 
            { text: 'Cancle'},
            { text: 'Ok' , onPress: () => deleteRide() }
        ]);
    }

    // delete current ride data from db when driver go back. /driver/delete_rides/{userId}
    const deleteRide = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/delete_rides/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                  },
            });
            if (!response.ok) {
                throw new Error('Failed to delete data');
            }
            console.log('Data deleted successfully');
            
            navigation.navigate("Home");
            setInputData({})
            // Optionally, update state or perform any other necessary actions after deletion
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const checkConfirmations = () => {
        return confirmItems.every(item => item.driver_confirmation && item.cf_confirmation);
    };

    const onPress = () => {
        navigation.navigate("SuggestedRides")
    }

    return (
        <View style={styles.container}>
            <View  style={{ width: '100%', flex: 1}}>

                <DirectionMapWaiting                    
                        startLat={inputData.location_lat}
                        startLon={inputData.location_lon}
                        endLat={inputData.destination_lat}
                        endLon={inputData.destination_lon}
                />
                <ButtonSet/>
            </View>
            
            <View style={GlobalStyles.bottomBg}>
                {!confirmItems.length ? (
                    <View style={styles.bottomContain}>
                        <Text style={styles.wait}>{inputData.location} to {inputData.destination} </Text>
                        <Text style={GlobalStyles.wait}>Waiting for Rides.</Text>
                        <View style={styles.bottomButton}> 
                            <ButtonOutlined buttonName="Change Route" onPress={goback}/>
                            <ButtonOutlined buttonName="Suggested Rides" onPress={onPress}/>
                        </View>
                    </View>
                ): !checkConfirmations()? (
                        <View style={styles.bottomContain}>
                            <Text style={styles.wait}>{inputData.location} to {inputData.destination} </Text>
                            <Text style={GlobalStyles.wait}>Waiting for Confirmation</Text>
                            <View style={styles.bottomButton}>
                                <ButtonOutlined buttonName="Suggested Rides" onPress={onPress} />
                            </View>
                        </View>
                ):(
                        <View style={styles.bottomContain}>
                            <Text style={{...GlobalStyles.wait, marginBottom: -10}}>All are confirmed. </Text>
                            <Text style={{...GlobalStyles.wait, marginBottom: 5}}>You can start your ride.</Text>
                            <Text style={{...styles.text01, marginBottom: 5}}>Still you can select rides.</Text>
                            <ButtonOutlined buttonName="Suggested Rides" onPress={onPress}/>
                        </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomButton:{
        marginTop: 10,
        flexDirection: 'row',
        gap: 10,
    },
    bottomContain:{
        alignItems: 'center',
    },
    wait:{
        marginTop: 10,
        marginBottom: -10,
        color: '#004344',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textContainer:{
        flex: 1,
        paddingHorizontal: 15,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    text01:{
        color: '#004344',
        fontSize: 17,
    }
});

export default WaitingForRides;
