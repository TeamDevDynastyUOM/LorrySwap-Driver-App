import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PickerSelect from 'react-native-picker-select';
import { BASE_URL } from '../../config';

const AddDriver2 = ({ route }) => {

  const navigation = useNavigation();
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const { item } = route.params;
  console.log(item); // This will log the item object passed from the previous screen
    // Other code
  
  useEffect(() => {
    fetch(`${BASE_URL}/owner/get_all_vehicles`)
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

  const [vehicleNo, setVehicleNo] = useState('');
  const [error, setError] = useState(null);

  const handlePress = () => {
    fetch(`${BASE_URL}/owner/assign_vehicle_to_driver/${id}`, {
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
        console.log(data); // Log the response from the server
        setVehicleNo(data.message); // Update state with the response
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
      navigation.navigate("OwnerHome")
  };




  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => props.navigation.navigate("AddDriver") }> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Add Driver</Text>
      </View>

    <View style={styles.Container}>

        <View style={{marginBottom:"10%"}}>
            <Text style={styles.txt1}>First Name</Text>
            <View style={styles.textContainer}>
                <Text style={styles.txt2}>{item.fname}</Text>
            </View>
            <View style={styles.hrLine}></View>
        </View>

        <View style={{marginBottom:"10%"}}>
            <Text style={styles.txt1}>Last Name</Text>
            <View style={styles.textContainer}>
                <Text style={styles.txt2}>{item.lname}</Text>
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
          <Text style={styles.BtnTxt}>Add to Organization</Text>
          <FontAwesome5 name='arrow-right' style={styles.BtnTxt}/>
        </TouchableOpacity>

      </View>
    </View>
    )}


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
  
  inputStyle: {
    flex: 0,
    height: 25,
    width: 243,
  },
  errorTxt: {
    fontSize: 12,
    color: 'brown',
    bottom:27,
    marginLeft: 85,
  },

  Btn:{
    paddingHorizontal:"5%",
    marginTop: "20%",
    marginHorizontal: "20%",
    flexDirection: 'row',
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
    marginTop:"5%",
    marginBottom:"2%",
    paddingLeft:"10%",
  },
});
 export default AddDriver2;

