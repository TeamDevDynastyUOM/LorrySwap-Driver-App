import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet,  Platform, SafeAreaView, Alert } from 'react-native';
import { Entypo,FontAwesome,Fontisto  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import * as Geolocation from 'react-native-geolocation-service';
import SearchLocation from './SearchLocation';
import { BASE_URL } from '../../config';
import ButtonContained from './ButtonContained';

// Set navigator.geolocation to Geolocation from react-native-geolocation-service
navigator.geolocation = Geolocation;

const BottomPopup = ({ isVisible, onClose}) => {  
  const navigation = useNavigation();

  const {id, token} = useRideContext();

  const { setInputData } = useRideContext();
  const [location, setLocation] = useState({});
  const [destination, setDestination] = useState({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // initializes for current date and max future date
  const now = new Date();
  const maxFutureDate = new Date();
  maxFutureDate.setDate(now.getDate() + 2);
  
  const timeString = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Close the date picker on iOS
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // check if the selected time is in the past
    if (
      currentTime < now ||
      (currentTime.getDate() === now.getDate() &&
        currentHours < now.getHours()) ||
      (currentTime.getDate() === now.getDate() &&
        currentHours === now.getHours() &&
        currentMinutes < now.getMinutes())
    ) {
      setTime(now);
    } else {
      setShowTimePicker(false);
      setTime(currentTime);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const openTimePicker = () => {
    setShowTimePicker(true);
  };
    // format time
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };
  

  // Reset the form
  const resetFields = () => {
    setTime(new Date());
    setLocation({});
    setDestination({});
    setDate(new Date());
  };
  

  const handleSubmit = () => {
    const data = {
      location: location.details?.name,
      destination: destination.details?.name,
      location_lat: location.details?.geometry?.location?.lat.toString(),
      location_lon: location.details?.geometry?.location?.lng.toString(),
      destination_lat: destination.details?.geometry?.location?.lat.toString(),
      destination_lon: destination.details?.geometry?.location?.lng.toString(),
      date: date.toISOString(),
      time: timeString,
      user_id: id,
      finished_ride: false
    };

    if (!data.location_lat) {
      console.log("Please fill the Location.");
      Alert.alert('Error Occurred!', 'Please fill the Location.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else if (!data.destination_lat) {
      console.log("Please fill the Destination.");
      Alert.alert('Error Occurred!', 'Please fill the Destination.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      setLoading(true);
      createRide(data)
    }
  };

  const createRide = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/driver/createRide`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Ride request submitted successfully');
        setInputData(data);
        onClose(); // Close the modal
        resetFields();
        navigation.navigate('SuggestedRides'); // Navigate to the next screen
      } else {
        console.error('Failed to submit ride request');
        Alert.alert('Failed to submit', 'Error while submitting ride requests. Please try again later.', [
          { text: 'OK'},
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(error, '', [
        { text: 'OK'},
      ]);
    }finally{
      setLoading(false);
    }
  }


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.row}>
            <Entypo name="location-pin" size={30} color="#004344" />
            <SearchLocation placeholder='Your Location' setLocation={setLocation} setDestination={setDestination}/>
          </View>

          <View style={styles.row}>
            <Entypo name="location" size={30} color="#004344" />
            <SearchLocation placeholder='Your Destination' setLocation={setLocation} setDestination={setDestination}/>
          </View>

          <View style={styles.row}>
            <FontAwesome name="calendar" size={30} color="#004344"/>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label}>Departure date</Text>
              {Platform.OS === "android" ? (
                <TouchableOpacity style={styles.datePicker} onPress={() => openDatePicker()}>
                  <Text style={styles.dateInput}>{date.toDateString()}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => openDatePicker()}>
                  <Text style={styles.dateInput}>{date.toDateString()}</Text>
                </TouchableOpacity>
              )}
              {showDatePicker && (
                  <DateTimePicker
                  testID="datePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={now}
                  maximumDate={maxFutureDate}
                />

              )}
            </View>
          </View>

          <View style={styles.row}>
            <Fontisto name="clock" size={30} color="#004344" />
            <View style={styles.datePickerContainer}>
              <Text style={styles.label}>Departure time</Text>
              <TouchableOpacity onPress={() => openTimePicker()}>
                <Text style={styles.dateInput}>{formatTime(time)}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  testID="timePicker"
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="spinner"
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </View>
          <View style={styles.findRideButton}>
            <ButtonContained buttonName="Find Rides" onPress={handleSubmit} arrow="right" loading={loading}/>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    width: '100%',
  },
  datePickerContainer:{
    flex: 1,
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    paddingRight: 15,
    color: '#004344',
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePicker: {
    justifyContent: 'center',
  },
  dateInput: {
    paddingLeft: 40,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderColor: "#004344",
  },
  findRideButton: {
    margin:15, 
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default BottomPopup;
