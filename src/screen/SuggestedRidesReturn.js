import React,{useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarketSeller from './MarketSeller';
import CargoFinder from './CargoFinder';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';
import Header from '../components/Header';
import ButtonText from '../components/ButtonText';
import ActivityIndicatorCustom from '../components/ActivityIndicatorCustom';
import { Foundation } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const SuggestedRidesReturn = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const { addSelectedItem, selectedItems, confirmItems, inputData,  setInputData, id, token} = useRideContext();
    const [items, setItems] = useState([]);   
    const [loading, setLoading] = useState(true);

    console.log(inputData);

    useEffect(() => {
        fetchData();
    }, [navigation, route]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/driver/suggested_rides_return/${id}`,{
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
        navigation.goBack();
    }

    return (
        <View style={GlobalStyles.container}>                    
            {loading ? (
                // Render loading animation while fetching data
                <ActivityIndicatorCustom indicatorName="Finding Return Rides..." color="#004344"/>
                ) : (
                <View style={GlobalStyles.wrapper}>
                    <View style={styles.header}>
                        <Header title="Suggested Rides for Return" goBack={goback}/> 
                        <View style={{flexDirection:'row', justifyContent: 'center', borderRadius: 30,marginTop: 20,
                            alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20
                        }}>                           
                             <Text style={{...GlobalStyles.pageTitle,color:"#004344",  fontSize: 16, fontWeight: '700',}}>
                                {inputData.destination.length > 15 ? `${inputData.destination.substring(0, 15)}...` : inputData.destination}
                            </Text>
                            <Foundation name="arrow-right" size={24} color="#004344" />
                            <Text style={{...GlobalStyles.pageTitle,color:"#004344",  fontSize: 16, fontWeight: '700',}}>
                                {inputData.location.length > 15 ? `${inputData.location.substring(0, 15)}...` : inputData.location}
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
                            
                                <Tab.Screen name="Market Seller">
                                        {() => <MarketSeller items={marketSellerItems} onAddItem={onAddItem} selectedItems={selectedItems} iconName={'pluscircleo'} display={0}/>}
                                </Tab.Screen>
                                <Tab.Screen name="Cargo Finder" >
                                        {() => <CargoFinder items={cargoFinderItems} onAddItem={onAddItem}  selectedItems={selectedItems} iconName={'pluscircleo'} display={0}/>}
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

export default SuggestedRidesReturn;