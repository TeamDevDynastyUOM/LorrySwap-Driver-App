import React,{useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarketSeller from './MarketSeller';
import CargoFinder from './CargoFinder';
import { useRideContext } from '../context/RideContext';
import Header from '../components/Header';
import { BASE_URL } from '../../config';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';

const Tab = createMaterialTopTabNavigator();

const SpecialRequest = () => { 
    
    const navigation = useNavigation();
    const [ marketSellerItems, setMarketSellerItems] = useState([]);
    const [ cargoFinderItems, setCargoFinderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const {addSelectedItem, selectedItems,id, token} = useRideContext();

    // const marketSellerItems = items.filter(item => item.actor === "MarketSeller");
    // const cargoFinderItems = items.filter(item => item.actor === "CargoFinder");

    const onAddItem = (item) => {
        addSelectedItem(item);
    };

    const onSubmit = () => {
        navigation.navigate("SelectedRides");
    };
    const goBack = () => {
        navigation.goBack();
    }

    // Fetch data from API endpoint (to get all the relevant rides) /driver/suggested_rides/{userId}
    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/special_rides/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log("special requests are cf",data);

            setCargoFinderItems(data);

            const response1 = await fetch(`${BASE_URL}/driver/ms_special_rides/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!response1.ok) {
                throw new Error('Failed to fetch data');
            }
            const data1 = await response1.json();
            console.log("special requests are ms",data1);

            setMarketSellerItems(data1);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigation]);

    return (
        <View style={GlobalStyles.container}>
            {loading ? (
                // Render loading animation while fetching data
                <ActivityIndicatorCustom indicatorName="Loading" color="#004344"/>
                ) : (
                <View style={GlobalStyles.wrapper}>
                    <View style={styles.header}>
                        <Header title="Special Requests" goBack={goBack}/>   
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
                                    {() => <CargoFinder items={cargoFinderItems} onAddItem={onAddItem}  selectedItems={selectedItems} iconName={'pluscircleo'} display={2} />}
                                </Tab.Screen>
                                <Tab.Screen name="Market Seller">
                                    {() => <MarketSeller items={marketSellerItems} onAddItem={onAddItem} selectedItems={selectedItems} iconName={'pluscircleo'} display={2} />}
                                </Tab.Screen>

                            </Tab.Navigator>
                        </View>

                    </View>
                </View>
            )}
            {/* <ButtonText buttonName="Continue" onPress={onSubmit}/> */}
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

export default SpecialRequest;