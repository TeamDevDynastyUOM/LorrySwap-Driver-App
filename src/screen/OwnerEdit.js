import { StyleSheet, Text, View, TouchableOpacity ,FlatList, ScrollView} from 'react-native'
import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PickerSelect from 'react-native-picker-select';
import { BASE_URL } from '../../config';
import { useRideContext } from '../context/RideContext';

const OwnerEdit = ({ route }) => {

  const { id, token} = useRideContext();

  const { data } = route.params;

  const userId = data.id;
  console.log(data.id)

  const navigation = useNavigation();
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null)
  // const [vehicleNo, setVehicleNo] = useState();

  useEffect(() => {
    fetch(`${BASE_URL}/owner/get_all_vehicles`,{
      headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.Results) {
          const items = data.Results.map(item => ({
            label: item.vehicle_number.toString(),
            value: item.vehicle_number.toString(),
          }));
          setDropdownItems(items);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const handlePress = () => {
    fetch(`${BASE_URL}/owner/edit_vehicle/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ vehicle_no: selectedValue }), // Assuming selectedValue contains the vehicle number
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data); // Log the response from the server
        // setVehicleNo(data.message); // Update state with the response
        navigation.navigate("OwnerDashboard");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message); // Update state with the error message
      });
  };
  

  return (
    <View style={styles.wrapper}>
        <StatusBar barStyle={'light-content'}/>
        <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.goBack()} > 
            <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Edit</Text>
        </View>

        <View style={styles.Container}>

        <View style={{marginBottom:"15%",marginTop:"5%"}}>
            <Text style={styles.txt1}>Driver Name</Text>
            <View style={styles.textContainer}>
              <Text style={styles.txt2}>{data.fname} {data.lname}</Text>
            </View>
            <View style={styles.hrLine}></View>
        </View>

        <View >
          <Text style={styles.txt1}>Vehicle No</Text>
          <PickerSelect
            style={[styles.inputStyle, styles.textContainer, styles.txt2]}
            onValueChange={(value) => setSelectedValue(value)}
            items={dropdownItems}
            value={selectedValue}
          />
          <View style={styles.hrLine}></View>
        </View>


        <TouchableOpacity style={styles.Btn} onPress={handlePress}>
          <Text style={styles.BtnTxt}>Save</Text>
        </TouchableOpacity>


        </View>
    </View>
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
      },
      title: {
        color: '#fff',
        // fontfamily:'Source Sans Pro',
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10,
      },
      Container: {
        marginTop: 20,
        backgroundColor:'#ffffff',
        padding: 30,
        borderRadius:25,
        width: '100%',
        height: '100%',
      },
      txt1: {
        color:'#004244',
        // fontFamily: 'Source Sans Pro',
        fontSize:18,
        fontWeight:"700",
      },
      txt2: {
        color:'#004244',
        // fontFamily: 'Source Sans Pro',
        fontSize:17,
      },
      Btn:{
        paddingHorizontal:"5%",
        marginTop: "10%",
        marginHorizontal: "30%",
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: 'center',
        borderColor: '#004344',
        padding: "3%",
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor:"#132939"
      },
      BtnTxt:{
        marginHorizontal: 2,
        fontSize: 17,
        color: '#ffffff',
      },
      hrLine:{
        height: 1,
        backgroundColor: '#004344',
      },
      textContainer:{
        marginTop:"10%",
        marginBottom:"2%",
        paddingLeft:"10%",
      },
})

export default OwnerEdit

