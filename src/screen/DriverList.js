import { StyleSheet, Text, View, TouchableOpacity ,FlatList,Alert,TouchableWithoutFeedback} from 'react-native'
import React , { useState , useEffect , useCallback} from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useRideContext } from '../context/RideContext';
import { BASE_URL } from '../../config';

const DriverList = () => {

  const { id, token} = useRideContext();
  console.log(id);

  const navigation = useNavigation();
  const [driver, setDriver] = useState(null); // State to store the fetched driver details

  const [selectedItem, setSelectedItem] = useState(null);

  const fetchDrivers = useCallback(() => {
    console.log("Fetching driver data...");
    fetch(`${BASE_URL}/owner/get_drivers_by_organization/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then(response => {
      console.log('Response status:', response.status); // Log response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched driver data:", data); // Log the fetched data
      if (data && data.Results) {
        setDriver(data.Results); // Set the driver state with the nested Result object
      } else {
        console.error('Unexpected response format:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    });
  }, [id, token]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

    console.log(driver)


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
      const ID = data.id;
      console.log(id)
      try {
        const response = await fetch(`${BASE_URL}/owner/delete_driver/${ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ${token}'
            },
            // body: JSON.stringify({ id: id }),
        });

        console.log('Response status:', response.status); // Log response status for debugging

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Response error body:', errorData); // Log the response error body
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data'); // Assuming you have setError defined in your state
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
        <Text style={styles.title}>Driver List</Text>
      </View>

        <View style={styles.Container}>

        <View>
        <FlatList
            data={driver}
            keyExtractor={(list,index) => index.toString()}
            renderItem={( {item} ) => {
                return (
                    <View>
                        <View style={styles.listItem}>
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.Nametxt}>{item.first_name} {item.last_name}</Text>
                                </View>
                                    <Text style={styles.contactNO}>{item.phone_no}</Text>
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
        paddingLeft: 5,
        marginVertical: 3,
    },   
    hrLine:{
        height: 1,
        backgroundColor: '#004344',
    },
    Nametxt:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#004344',
        marginRight: 8,
    },
    contactNO:{
        fontSize:14,
        color: '#132939',
        marginRight: 5,
        paddingTop:"2%"
    },
    brand:{
        flex: 1,
        paddingRight:"3%",
        flexDirection: 'row',
        justifyContent:"flex-end",
        alignSelf:"center"
    },
    delete:{
      backgroundColor: '#E5E4E2',
        shadowColor: 'black',
        paddingLeft:"5%",
        paddingVertical:"3%",
        paddingRight:"7%",
    },
})

export default DriverList