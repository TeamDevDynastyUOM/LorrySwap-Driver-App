import React,{ useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import MapScreen from '../components/MapScreen';
import BottomPopup from '../components/BottomPopup';
import GlobalStyles from '../styles/GlobalStyles';
import { useRideContext } from '../context/RideContext';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import WaitingForRides from '../screen/WaitingForRides';
import { BASE_URL } from '../../config';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import ButtonContained from '../components/ButtonContained';
import Start from '../screen/Start';

const Home= () => {

    const navigation = useNavigation();
    const route = useRoute();
    
    //Manage the visibility of the bottom popup
    const [isBottomPopupVisible, setBottomPopupVisible] = useState(false);
    const {confirmItems, setConfirmItems, setInputData, inputData, id, token, 
        verify, setVerify, vehicle, setVehicle, totalWeight, setTotalWeight} = useRideContext();
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                console.log('UserId', id)

                try {
                    const response_verify = await fetch(`${BASE_URL}/driver/verify_driver/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    const response_data = await response_verify.json();
                    console.log('Verify Driver', response_data)
                    if (response_verify.ok) {
                        if (response_data.status == "OK") {
                            setVerify(true)
                        }else{
                            setVerify(false)
                        }
                    }
                    else{
                        throw new Error('Failed to fetch data from verify_driver');
                    }

                    const response_vehicle = await fetch(`${BASE_URL}/vehicle/get_vehicle_details/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    const vehicle_details = await response_vehicle.json();
                    console.log('vehicle', vehicle_details)
                    if (response_vehicle.ok) {
                        setVehicle(vehicle_details)
                    }
                    else{
                        throw new Error('Failed to fetch data from get_vehicle_details');
                    }

                    //get current ride details
                    const response1 = await fetch(`${BASE_URL}/driver/current_ride/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    if (!response1.ok) {
                        throw new Error('Failed to fetch data from current_ride');
                    }
                    const rideData = await response1.json();
                    console.log('Current Rides ', rideData)
                    setInputData(rideData); 
                    
                    //get confirm rides
                    const response2 = await fetch(`${BASE_URL}/driver/confirmed_rides/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    if (!response2.ok) {
                        throw new Error('Failed to fetch data from confirmed_rides');
                    }
                    const data = await response2.json();
                    console.log('Confirmed Rides ', data)
                    setConfirmItems(data);
                    setLoading(false);

                } catch (error) {
                    console.error('Error fetching data:', error);        
                    Alert.alert('Error fetching data', '', [
                        { text: 'OK'},
                      ]);
                }
            };
            fetchData();
        }, [navigation, route])
    );

    useEffect(() => {
        if (confirmItems.length > 0 && totalWeight == 0) {
            const total_weight = confirmItems.reduce((sum, item) => sum + (item.weight || 0), 0);
            setTotalWeight(prevTotalWeight => prevTotalWeight + total_weight);
        }
    },[confirmItems])

    // Function to toggle the visibility of the ride bottom popup
    const toggleBottomPopup = () => {
      setBottomPopupVisible(!isBottomPopupVisible);
    };

    console.log("Does the driver not have a ride? ",!Object.keys(inputData).length)
    console.log("Driver's Ride",inputData)
    console.log("Confirm Ride Length",confirmItems.length)
    console.log("Vehicle is", vehicle)

    const handleButtonPress = () => {
        navigation.navigate("AddVehicleByDriver")
    }

    console.log("Vehicle verify is ", vehicle.verify)
    console.log("Account verify is ", verify)

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicatorCustom indicatorName="Loading..." color="#004344"/>
            ): 
            !confirmItems.length && !Object.keys(inputData).length ?(
                <View style={styles.container}>
                    <View  style={{ width: '100%', height: '85%'}}>
                        <MapScreen />
                    </View>
                
                {/* 
                    <View style={GlobalStyles.bottomBg}>
                        <TouchableOpacity style={GlobalStyles.goButton1} onPress={toggleBottomPopup}>
                            <View style={GlobalStyles.goButton}>
                                <Text style={GlobalStyles.go}>Go</Text>
                            </View>
                        </TouchableOpacity>
                        <BottomPopup isVisible={isBottomPopupVisible} onClose={toggleBottomPopup}/>
                    </View> */}


                    {verify && Object.keys(vehicle).length ?(
                        vehicle.verify == 1 ? (
                            <View style={GlobalStyles.bottomBg}>
                                <TouchableOpacity style={GlobalStyles.goButton1} onPress={toggleBottomPopup}>
                                    <View style={GlobalStyles.goButton}>
                                        <Text style={GlobalStyles.go}>Go</Text>
                                    </View>
                                </TouchableOpacity>
                                <BottomPopup isVisible={isBottomPopupVisible} onClose={toggleBottomPopup}/>
                            </View>
                        ): vehicle.verify == 0 ?(
                            <View style={GlobalStyles.bottomBg}>
                                <View style={styles.message}>
                                    <Text style={{...styles.accountValidText, fontSize: 25}}>
                                        Vehicle details invalid
                                    </Text>
                                    <ButtonContained buttonName="Try Again" 
                                            onPress={handleButtonPress}
                                    />
                                </View>
                            </View>

                        ):(
                            <View style={GlobalStyles.bottomBg}>
                                <View style={styles.message}>
                                    <Text style={{...styles.accountValidText, fontSize: 25}}>
                                        The vehicle is under review
                                    </Text>
                                    <Text style={styles.accountValidText}>
                                        Please wait for receive confirmation
                                    </Text>
                                </View>
                            </View>
                        )

                    ):( 
                        !verify && !Object.keys(vehicle).length ?(
                            <View style={GlobalStyles.bottomBg}>
                                <View style={{...styles.message, gap: -5}}>
                                    <Text style={{...styles.accountValidText, fontSize: 25, marginTop: -5}}>
                                        The account is under review.
                                    </Text>
                                    <Text style={styles.accountValidText}>
                                        Please wait for receive confirmation.
                                    </Text>
                                    <View style={{marginTop: 8,flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                                        <Text style={styles.accountValidText}>
                                            You can also add your vehicle
                                        </Text>
                                        <ButtonContained buttonName="Add Vehicle " 
                                            onPress={handleButtonPress} iconName="truck" 
                                            alignIcon="right" loading={loading}
                                        />
                                    </View>
                                </View>
                            </View>
                        ):!Object.keys(vehicle).length && verify ?(
                            <View style={GlobalStyles.bottomBg}>
                                <View style={styles.message}>
                                    <Text style={{...styles.accountValidText, fontSize: 25}}>
                                        Add your vehicle here
                                    </Text>
                                    <ButtonContained buttonName="Add Vehicle " 
                                        onPress={handleButtonPress} iconName="truck" 
                                        alignIcon="right" loading={loading}
                                    />
                                </View>
                            </View>
                        ): Object.keys(vehicle).length && !verify ? (
                            vehicle.verify == 1 ? (
                                <View style={GlobalStyles.bottomBg}>
                                    <View style={styles.message}>
                                        <Text style={{...styles.accountValidText, fontSize: 25}}>
                                            The account is under review.
                                        </Text>
                                        <Text style={styles.accountValidText}>
                                            Please wait for receive confirmation.
                                        </Text>
                                    </View>
                                </View>
                            ): vehicle.verify == 0 ?(
                                <View style={GlobalStyles.bottomBg}>
                                    <View style={styles.message}>
                                        <Text style={{...styles.accountValidText, fontSize: 25}}>
                                            The account is under review.
                                        </Text>
                                        <Text style={styles.accountValidText}>
                                            Your vehicle details invalid. Please try again.
                                        </Text>
                                        <ButtonContained buttonName="Try Again" 
                                            onPress={handleButtonPress}
                                        />
                                    </View>
                                </View>
    
                            ):(
                                <View style={GlobalStyles.bottomBg}>
                                    <View style={styles.message}>
                                        <Text style={{...styles.accountValidText, fontSize: 25}}>
                                            The account and vehicle is under review
                                        </Text>
                                        <Text style={styles.accountValidText}>
                                            Please wait for receive confirmation
                                        </Text>
                                    </View>
                                </View>
                            )
                        ):(null)
                    )}

                    
                </View>
            ): inputData.finished_ride == 2 ?(
                <Start/>
            ): (
                <WaitingForRides/>
            )
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    accountValidText:{
        fontWeight: 'bold',
        fontSize: 15 ,
        color:'#004344',
        textAlign: 'center'
    },
    message:{
        alignItems:'center',
        marginTop: 10,
        gap: 5
    }

});

export default Home;