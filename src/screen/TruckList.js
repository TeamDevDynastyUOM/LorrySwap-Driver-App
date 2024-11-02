import { StyleSheet, Text, View, TouchableOpacity ,FlatList,  TouchableWithoutFeedback, Alert} from 'react-native'
import React , { useState , useCallback  } from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const TruckList = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const { id, token} = useRideContext();

  const [selectedItem, setSelectedItem] = useState(null);

  
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/owner/get_vehicles_by_organization/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data && data.Results) {
        const fetchedResults = data.Results.map(list => ({
          Vehicleno: list.Vehicleno.toString(),
          brand: list.brand.toString(),
          type: list.type.toString(),
        }));
        setResults(fetchedResults);

        // Check if results are empty and navigate to 'OwnerDashboardNodata'
        if (fetchedResults.length === 0) {
          navigation.navigate('OwnerDashboardNodata'); // Replace 'NextScreen' with your actual screen name
        }
      } else {
        console.error('Unexpected response format:', data);
        Alert.alert('Error', 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [id, navigation])
  );

  const handlePress = (item) => {
    setSelectedItem(item === selectedItem ? null : item); // Toggle selected item
  };  

  const handleCloseOptions = () => {
    setSelectedItem(null); // Close options (e.g., Delete)
  };

  const handleDelete = (data) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this vehicle? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteVehicle(data),
          style: "destructive"
        }
      ]
    );
  };

  const deleteVehicle = async (data) => {
    const Vehicleno = data.Vehicleno;
    console.log(Vehicleno)
    try {
      const response = await fetch(`${BASE_URL}/owner/delete_vehicle/${Vehicleno}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Vehicleno }),
      });

      if (response.ok) {
        setResults(results.filter(item => item.Vehicleno !== Vehicleno));
        console.log('Success', 'Vehicle deleted successfully');
      } else {
        const data = await response.json();
        console.log('Error', data.error || 'Failed to delete vehicle');
      }
    } catch (error) {
      console.log('Error', 'An error occurred while deleting the vehicle');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseOptions}>
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.navigate("OwnerHome") }> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Truck List</Text>
      </View>

        <View style={styles.Container}>

        <View>
        <FlatList
            data={results}
            keyExtractor={(list,index) => index.toString()}
            renderItem={( {item} ) => {
                return (
                    <View>
                        <View style={styles.listItem}>
                            <View style={styles.info}>
                                <View>
                                <TouchableOpacity onPress>
                                    <Text style={styles.Vehicleno}>{item.Vehicleno}</Text>
                                </TouchableOpacity>
                                </View>
                                    <Text style={styles.type}>{item.type}</Text>
                                    {/* <Text style={styles.brandtxt}>{item.brand}</Text> */}
                            </View>
                            <TouchableOpacity style={styles.brand} onPress={() => handlePress(item)}>
                                {selectedItem === item && (
                                  <TouchableOpacity elevation={10} style={styles.delete} onPress={() => handleDelete(item)}>
                                    <Text style={{fontSize:16}}>Delete</Text>
                                  </TouchableOpacity>
                                )}
                                <Feather name="more-vertical" size={24} color="black" />
                            </TouchableOpacity>
                            
                        </View>
                        <View style={styles.hrLine}>
                        </View>
                    </View>
                );
            }}
        />
        </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#132939',
        paddingHorizontal: 5,
      },
      header:{
        flexDirection: 'row',
        margin: 10,
        marginTop: '10 %',
        // paddingLeft: 10,
        paddingRight: 10,
        alignItems:"center",
        paddingTop:'5%',
      },
      title: {
        color: '#fff',
        // fontfamily:'Source Sans Pro',
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10,
      },
      Container: {
        marginTop: 20,
        backgroundColor:'#ffffff',
        padding: 20,
        borderRadius:25,
        width: '100%',
        height: '100%',
      },
    listItem:{
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
    },
    info:{
        paddingLeft: "5%",
        marginVertical: 3,
    },   
    brand:{
        flex: 1,
        paddingRight:"3%",
        flexDirection: 'row',
        justifyContent:"flex-end",
        alignSelf:"center"
    },
    brandtxt:{
        fontSize:18,
        color: '#132939',
        fontWeight:"bold"
    },
    hrLine:{
        height: 1,
        backgroundColor: '#004344',
    },
    Vehicleno:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#004344',
        marginRight: 8,
    },
    type:{
        fontSize:18,
        color: '#132939',
        marginRight: 5,
        paddingTop:"2%"
    },
    Btn:{
        position:"absolute",
        // paddingHorizontal:"7%",
        alignSelf:"flex-end",
        justifyContent:'center',
        marginHorizontal: "40%",
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ffffff',
        padding: "1%",
        left:"40%",
        marginTop:"12%",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor:"#ffffff"
      },
      BtnTxt:{
        marginHorizontal: 2,
        fontSize: 15,
        color: '#004344',
        fontWeight:"700",
      },
    delete:{
      backgroundColor: '#E5E4E2',
        shadowColor: 'black',
        paddingLeft:"5%",
        paddingVertical:"3%",
        paddingRight:"7%",
    },
})

export default TruckList