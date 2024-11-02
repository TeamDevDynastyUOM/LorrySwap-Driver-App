import React,{useEffect,useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { Feather,FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MarketSeller from './MarketSeller';
import CargoFinder from './CargoFinder';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';
import ButtonContained from '../components/ButtonContained';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();
    
const SelectedRides = () => {

    const { newSelectedItems, setSelectedItems, setNewSelectedItems,id, token} = useRideContext();
    const navigation = useNavigation();
    // const [newSelectedItems, setNewSelectedItems] = useState(selectedItems);

    console.log("Selected items updated:", newSelectedItems);

    const marketSellerItems = newSelectedItems.filter(item => item.actor === "MarketSeller");
    const cargoFinderItems = newSelectedItems.filter(item => item.actor === "CargoFinder");
    
    const onRemove = (item) => {
        const updatedItems = newSelectedItems.filter((selectedItem) => selectedItem.id !== item.id);
        setNewSelectedItems(updatedItems);
        setSelectedItems(updatedItems);
    };

    const onSubmit = () => {
        updateDriverConfirmedRides();
    };

    const updateDriverConfirmedRides = async () => {
        try {
            if(!newSelectedItems.length){
                Alert.alert('Nothing to confirm!', 'First select at least one ride to confirm.',[ 
                    { text: 'Close'},
                    { text: 'Go Confirm Rides', onPress: () => navigation.navigate("ConfirmRides") }
                ]);
                return;
            }
    
            Alert.alert(
                'Do you want to confirm selected rides?', 
                'If you confirm these rides, you cannot remove these ride. But you can add more rides.',
                [
                    { text: 'Close'},
                    { text: 'Confirm', onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/driver/confirm/${id}`, {
                                method: 'PUT',
                                headers: { 
                                    'Content-Type': 'application/json',
                                    "Authorization": `Bearer ${token}`
                                },
                                body: JSON.stringify(newSelectedItems),
                            });
    
                            console.log("newSelectedItems",newSelectedItems);
                            if (response.ok) {
                                setSelectedItems([])
                                setNewSelectedItems([])
                                navigation.navigate("ConfirmRides")
                            } else {
                                const errorData = await response.json();
                                console.error('Failed to update backend:', errorData);
                                Alert.alert('Error', errorData.message || 'Failed to update backend');
                            }
                        } catch (error) {
                            console.error('Error updating backend:', error);
                        }
                    }}
                ]
            );
        } catch (error) {
            console.error('Error updating backend:', error);
        }
    };
    

    const goBack = () => {
        navigation.goBack() 
    }

    return (
        <View style={GlobalStyles.container}>
            <View style={GlobalStyles.wrapper}>
                <View style={styles.header}>
                <Header title="Selected Rides" goBack={goBack}/> 
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
                                {() => <CargoFinder items={cargoFinderItems} onRemove={onRemove}  iconName={'minuscircleo'} display={1}/>}
                            </Tab.Screen>
                            <Tab.Screen name="Market Seller">
                                {() => <MarketSeller items={marketSellerItems} onRemove={onRemove} iconName={'minuscircleo'} display={1}/>}
                            </Tab.Screen>

                        </Tab.Navigator>
                    </View>
                </View>
            </View>  
            <View style={styles.bottomButton}>
                <ButtonContained buttonName="Confirm" onPress={onSubmit} iconName="arrow-right" alignIcon="right"/>
            </View>
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
    bottomButton:{
        alignSelf: 'flex-end',
        marginBottom: 20,
        marginHorizontal: 15,
    },
});

export default SelectedRides;