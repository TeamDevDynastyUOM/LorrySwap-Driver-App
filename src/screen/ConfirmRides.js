import React, { useState,useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RidesListConfirm from '../components/RideListConfirm';
import Header from '../components/Header';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';
import ButtonOutlined from '../components/ButtonOutlined';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import ButtonText from '../components/ButtonText';

const Tab = createMaterialTopTabNavigator();

const ConfirmRides = () => {
    const navigation = useNavigation();

    const {setNewSelectedItems, inputData, setConfirmItems, confirmItems, id, token} = useRideContext();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log("inputdata",inputData);

    useEffect(() => {
        setNewSelectedItems([]);
        fetchData();
      }, [navigation]);

    // Fetch data from API endpoint /driver/confirmed_rides/${id}
    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/confirmed_rides/${id}`,{
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            const response1 = await fetch(`${BASE_URL}/driver/ms_confirmed_rides/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response1.ok) {
                throw new Error('Failed to fetch data');
            }
            const data1 = await response1.json();

            
            const marketSellerItems = data1.filter(item => item.actor === "MarketSeller");
            const combinedData = [...data, ...marketSellerItems];
            console.log("Confirm items in ConfirmRides.js",data1);
            setConfirmItems(combinedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleHome = () => {
        navigation.navigate("WaitingForRides");
    };
    const goBack = () => {
        navigation.goBack();
    }

    const checkConfirmations = () => {
        return confirmItems.every(item => item.driver_confirmation && item.cf_confirmation);
    };

    const totalCost = confirmItems.reduce((sum, item) => sum + (item.cost || 0), 0);

    const startRide = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/started_ride/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(confirmItems)
            });
            console.log(response)
            if(!response.ok){
                throw new Error('Failed to update backend');
            } else {
                navigation.navigate('Start')
            }
        }catch(error){
            console.error('Error updating backend:', error);
        }finally{
        }
    }

    const handleNext = () => {
        if(checkConfirmations()){
            Alert.alert('Are you sure?', 'Do you want to start the ride?',[ 
                { text: 'No'},
                { text: 'Yes', onPress: () => startRide()}
            ]);
        }else{
            Alert.alert('Waiting for Confirm all Rides.', 'Some rides are not confirm yet. Please waiting for confirmations.',[ 
                { text: 'ok'}
            ]);
        }
    }

    if (!confirmItems.length){
        return(
            <View style={GlobalStyles.container}>
                    <View style={GlobalStyles.wrapper}>
                        <Header title="Confirmed Rides" goBack={goBack}/>               
                        {loading ? (
                            // Render loading animation while fetching data
                            <View style={GlobalStyles.whiteContainer2} >
                                <ActivityIndicatorCustom indicatorName="Loading" color="#004344"/>
                            </View>

                        ) : (                        
                            <View style={GlobalStyles.whiteContainer2} >
                                <View style={GlobalStyles.noResults}>
                                    <Text style={GlobalStyles.textNoResult}>Oops! No results found.</Text>
                                    <Text style={{...GlobalStyles.textNoResult01, marginBottom: 20}}>Please select and confirm the Rides.</Text>
                                    <ButtonOutlined buttonName="Go Back" onPress={goBack} arrow="left"/>
                                </View>
                            </View>
                        )}    
                    </View>
            </View>
        )
    }

    return (
        <View style={GlobalStyles.container}>

                <View style={GlobalStyles.container}>                        
                    {loading ? (
                        // Render loading animation while fetching data
                        <ActivityIndicatorCustom indicatorName="Loading" color="#004344"/>
                    ) : (  
                        <View style={GlobalStyles.container}>                       
                            <View style={GlobalStyles.wrapper}>
                                <Header title="Confirmed Rides" goBack={goBack}/>
                                <View style={GlobalStyles.whiteContainer2} >
                                    <RidesListConfirm results={confirmItems}  display={1}/>
                                </View>
                            </View>
                            <View style={{justifyContent: "flex-start",marginTop: 5, marginBottom: 10, marginLeft: 15}}>
                                <Text style={{ fontSize: 18, color: '#004344' }}>
                                    Total amount is<Text style={{ fontSize: 20, fontWeight: 'bold' }}> Rs.{totalCost}</Text>
                                </Text>
                            </View>
                            <View style={styles.bottom}>
                                <ButtonText buttonName="Home" alignIcon="left"
                                    onPress={handleHome} 
                                />
                                {/* <TouchableOpacity style={styles.addContainer} 
                                    onPress={() => navigation.navigate("SpecialRequest")}
                                >                    
                                    <Text style={styles.addMoreRides}>Add More</Text>
                                    <Text style={styles.addMoreRides}>Rides</Text>
                                </TouchableOpacity> */}
                                <ButtonText buttonName="Next" alignIcon="right"
                                    onPress={handleNext} 
                                />
                            </View>
                        </View>
                    )}
                </View>
            

        </View>
    );
}

const styles = StyleSheet.create({
    bottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    addContainer:{
        width: 90,
        height: 50,
        backgroundColor: '#132939',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMoreRides:{
        color: '#fff',
        fontSize: 15,
    },
});


export default ConfirmRides;