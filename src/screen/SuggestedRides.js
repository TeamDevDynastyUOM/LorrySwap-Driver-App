import React,{useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert  } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarketSeller from './MarketSeller';
import CargoFinder from './CargoFinder';
import { useRideContext } from '../context/RideContext';
import { BackHandler } from 'react-native';
import { BASE_URL } from '../../config';
import Header from '../components/Header';
import ButtonText from '../components/ButtonText';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import { Foundation } from '@expo/vector-icons';
import ButtonOutlined from '../components/ButtonOutlined';

const Tab = createMaterialTopTabNavigator();

const SuggestedRides = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { addSelectedItem, selectedItems, confirmItems, inputData,  setInputData, id, token} = useRideContext();
    const [items, setItems] = useState([]);   
    const [loading, setLoading] = useState(true);

    
    // const [ marketSellerItems, setMarketSellerItems] = useState([]);
    // const [ cargoFinderItems, setCargoFinderItems] = useState([]);

    console.log(inputData);

    useEffect(() => {
        fetchData();

        //handle physical back button
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Cleanup the event listener on unmount
    }, [navigation, route]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/suggested_rides/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);

            setItems(data);

            const response1 = await fetch(`${BASE_URL}/driver/ms_suggested_rides/${id}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response1.ok) {
                throw new Error('Failed to fetch data');
            }
            const data1 = await response1.json();
            console.log("suggested requests are ms",data1);

            // setMarketSellerItems(data1);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);        
            Alert.alert('Error fetching data', 'Please try again later', [
                { text: 'OK'},
              ]);
        }
    };

    console.log("Fetched",items);
    
    const marketSellerItems = items.filter(item => item.actor === "MarketSeller");
    const cargoFinderItems = items.filter(item => item.actor === "CargoFinder");

    const onAddItem = (item) => {
        addSelectedItem(item);
    };

    const onSubmit = () => {
        navigation.navigate("SelectedRides");
    };

    const goback = () => {
        // Alert user when he/she trying to go back
        if (!confirmItems.length){
            // Alert.alert('Do you want to go back?', 'If you go back, then automatically cancel this ride. You can recreate another one.',[ 
            //     { text: 'No'},
            //     { text: 'Yes', onPress: () => deleteRide() }
            // ]);
            navigation.navigate("WaitingForRides");
            console.log('Go back')
        }else{
            Alert.alert('Cannot go back!', 'You are already confirm at least one ride. After confirm rides, you cannot change route.',[ 
                { text: 'Close'}
            ]);
        }
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
            setInputData({})
            navigation.navigate("Home");
            // Optionally, update state or perform any other necessary actions after deletion
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    //handle physical back button
    const backAction = () => {
        if (navigation.isFocused() && navigation.canGoBack()) {
            // Get the current route name
            const currentRouteName = route.name;
            
            // Check if it's the special screen
            if (currentRouteName === 'SuggestedRides') {
                goback();
                return true; // Prevent default behavior (going back)
            }
        }
        return false; // Allow default behavior (going back)
    };

    return (
        <View style={GlobalStyles.container}>                    
            {loading ? (
                // Render loading animation while fetching data
                <ActivityIndicatorCustom indicatorName="Finding Rides..." color="#004344"/>
                ) : (
                <View style={GlobalStyles.wrapper}>
                    <View style={styles.header}>
                        <Header title="Suggested Rides" goBack={goback}/> 
                        <View style={{flexDirection:'row', justifyContent: 'center', borderRadius: 30, marginTop: 20,
                            alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, padding: 2
                        }}>
                            <Text style={{...GlobalStyles.pageTitle,color:"#004344",  fontSize: 16, fontWeight: '700',}}>
                                {inputData.location.length > 15 ? `${inputData.location.substring(0, 15)}...` : inputData.location}
                            </Text>
                            <Foundation name="arrow-right" size={24} color="#004344" />
                            <Text style={{...GlobalStyles.pageTitle,color:"#004344",  fontSize: 16, fontWeight: '700',}}>
                                {inputData.destination.length > 15 ? `${inputData.destination.substring(0, 15)}...` : inputData.destination}
                            </Text>
                        </View>
                        <View style={styles.tab}>
                            <Tab.Navigator
                                screenOptions={({ route }) => ({                            
                                    tabBarActiveTintColor: '#fff',
                                    tabBarInactiveTintColor: '#7d7b7b',
                                    tabBarStyle: { backgroundColor: '#132939', marginHorizontal:30},
                                    tabBarLabel: ({ color }) => (
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize',color }}>
                                            {route.name.toLowerCase()}
                                        </Text>
                                    ),
                                    tabBarIndicatorStyle: { backgroundColor: '#fff', height:4, borderRadius: 5}, 
                                })}
                            >
                            
                                <Tab.Screen name="Cargo Finder" >
                                        {() => <CargoFinder items={cargoFinderItems} onAddItem={onAddItem}  selectedItems={selectedItems} iconName={'pluscircleo'} display={0}/>}
                                </Tab.Screen>
                                <Tab.Screen name="Market Seller">
                                        {() => <MarketSeller items={marketSellerItems} onAddItem={onAddItem} selectedItems={selectedItems} iconName={'pluscircleo'} display={0}/>}
                                </Tab.Screen>
                            </Tab.Navigator>
                        </View>
                        
                    </View>
                </View>
            )}
            {!loading ? (
                <View style={{paddingVertical: 5, paddingBottom: 15, paddingHorizontal: 15}}>
                    <ButtonText buttonName="Continue" onPress={onSubmit} alignIcon="right"/>
                </View>                
            ):(null)}

        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'column',
    },
    tab:{
        marginTop: 5,
        width: '100%',
        height: '100%',
    },
});

export default SuggestedRides;