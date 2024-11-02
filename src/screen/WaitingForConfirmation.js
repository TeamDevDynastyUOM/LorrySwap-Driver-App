import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import DirectionMapWaiting from './DirectionMapWaiting';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import ButtonSet from '../components/ButtonSet'
import ButtonOutlined from '../components/ButtonOutlined';

const WaitingForConfirmation= () => {

    const navigation = useNavigation();

    const { inputData,confirmItems } = useRideContext();

    const onPress = () => {
        navigation.navigate("SuggestedRides")
    }

    const checkConfirmations = () => {
        return confirmItems.every(item => item.driver_confirmation && item.cf_confirmation);
    };

    return (
        <View style={styles.container}>
            <View  style={{ width: '100%', height: '80%'}}>

                <DirectionMapWaiting                    
                        startLat={inputData.location_lat}
                        startLon={inputData.location_lon}
                        endLat={inputData.destination_lat}
                        endLon={inputData.destination_lon} 
                />
                <ButtonSet/>
            </View>
            <View style={GlobalStyles.bottomBg}>
                {!checkConfirmations()? (
                    <View style={GlobalStyles.bottomBg}>
                        <Text style={styles.wait}>{inputData.location} to {inputData.destination} </Text>
                        <Text style={GlobalStyles.wait}>Waiting for Confirmation</Text>
                        <View style={styles.bottomButton}>
                            <ButtonOutlined buttonName="Suggested Rides" onPress={onPress} />
                        </View>
                    </View>
                ):(
                    <View style={GlobalStyles.bottomBg}>
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
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wait:{
        marginTop: 10,
        marginBottom: -10,
        color: '#004344',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    text01:{
        color: '#004344',
        fontSize: 17,
    }

});

export default WaitingForConfirmation;
