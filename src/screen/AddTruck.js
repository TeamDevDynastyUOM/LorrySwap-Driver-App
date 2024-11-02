import React , { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BASE_URL } from '../../config';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useRideContext } from '../context/RideContext';
import RNPickerSelect from 'react-native-picker-select';


const SignupSchema = Yup.object().shape({

  no: Yup.string()
  .matches(/^[A-Za-z]{3}[-][0-9]{4}$|^[A-Za-z]{2}[-][0-9]{4}$|^[0-9]{3}[-][0-9]{4}$|^[0-9]{2}[-][0-9]{4}$/, 'Invalid format. Please use the format  KA-1010 or 15-3456')
  .min(7,'Invalid format. Please use the format  KA-1010 or 15-3456')
  .max(8,'Invalid format. Please use the format  KA-1010 or 15-3456')
  .required('please enter a vehicle no'),

  brand: Yup.string()
        .required('please enter vehicle brand'),

  model: Yup.string()
        .required('please enter vehicle model'),

  length: Yup.string()
    .required('Please enter vehicle capacity length'),

  width: Yup.string()
    .required('Please enter vehicle capacity width'),

  height: Yup.string()
    .required('Please enter vehicle capacity height'),

  tonnage: Yup.string()
    .required('Please enter vehicle capacity tonnage'),

 
});

const AddTruck = (props) => {

  const { id, token} = useRideContext();

  const navigation = useNavigation();

  const [selectedValue, setSelectedValue] = useState(null);

  const dropdownItems = [
    { label: 'Covered', value: 'Covered' },
    { label: 'Uncovered', value: 'Uncovered' },
    { label: 'Freeze', value: 'Freeze' },
  ];

  const handleSubmit = (values) => {
    if (!selectedValue) {
      Alert.alert('Error', 'Please select a vehicle type.');
      return;
    }
    console.log('Submitting form with values:', values);
    fetch(`${BASE_URL}/owner/add_vehicle/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        Vehicleno: values.no,
        brand: values.brand,
        model: values.model,
        type: selectedValue, 
        length: Number(values.length),
        width: Number(values.width),
        height: Number(values.height),
        tonnage: Number(values.tonnage),
      }),
    })
      .then(response => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('Response from backend:', data);
        if (data.success) {
          Alert.alert(
            'Success',
            data.success,
            [{ text: 'OK', onPress: () => navigation.navigate('TruckList') }]
          );
        } else {
          Alert.alert('Error', data.error);
          console.log('Backend error:', data.error);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        Alert.alert('Error', 'Failed to add vehicle');
      });
  };


  return (
    <Formik initialValues={{
      no: '',
      brand: '',
      model: '',
      length: '',
      width: '',
      height: '',
      tonnage: '',
    }}
    validationSchema={SignupSchema}
    onSubmit={handleSubmit}
    >
      {({values,errors,touched,handleChange,setFieldTouched,setFieldValue,isValid,handleSubmit,}) => (

    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Add Truck</Text>
      </View>
      

      <View style={styles.formcontainer}>
        <View style={styles.inputwrapper}>
          <Text style={styles.txt}>Vehicle No</Text>
          <TextInput 
            style={styles.inputStyle} 
            placeholder=' e.g: LY-1010, 15-3456'
            value={values.no}
            onChangeText={handleChange('no')} 
            onBlur={() => setFieldTouched('no')}
          />
        </View>
        {touched.no && errors.no && (
              <Text style={styles.errorTxt}>{errors.no}</Text>
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Vehicle</Text>
        <Text style={styles.txt}>Brand</Text>   
          <TextInput 
            style={styles.inputStyle} 
            value={values.brand}
            onChangeText={handleChange('brand')}
            onBlur={() => setFieldTouched('brand')}
             />
        </View>
        {touched.brand && errors.brand && (
              <Text style={styles.errorTxt}>{errors.brand}</Text>
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Vehicle</Text>
        <Text style={styles.txt}>Model</Text>   
          <TextInput 
            style={styles.inputStyle}
            value={values.model}
            onChangeText={handleChange('model')}
            onBlur={() => setFieldTouched('model')}
             />
        </View>
        {touched.model&& errors.model && (
              <Text style={styles.errorTxt}>{errors.model}</Text>
            )}

        {/* <View>
        <Text style={styles.txt}>Vehicle</Text>
        <Text style={styles.txt}>Type</Text>   
          <TextInput 
            style={styles.inputStyle} 
            value={values.type}
            onChangeText={handleChange('type')}
            onBlur={() => setFieldTouched('type')}
             />
        </View>
        {touched.type && errors.type && (
              <Text style={styles.errorTxt}>{errors.type}</Text>
            )} */}

        
        <View>
            <Text style={styles.txt}>Vehicle</Text>
            <Text style={styles.txt}>Type</Text>
            <View style={[styles.inputStyle,{justifyContent:'center'}]}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={dropdownItems}
                value={selectedValue}
            />
            </View>
        </View>



        <View style={styles.capacity}>
          <Text style={styles.txt}>Vehicle Capacity</Text>
        </View>


        <View style={styles.capacityProp}>
          <View>
          <Text style={styles.txt2}>Length</Text>   
            <TextInput 
              style={[styles.inputStyle, {width:228}]} 
              value={values.length}
              onChangeText={handleChange('length')}
              onBlur={() => setFieldTouched('length')}
              placeholder='In meter (m)'
              />
          </View>
          {touched.length && errors.length && (
                <Text style={styles.errorTxt}>{errors.length}</Text>
              )}

          <View>
          <Text style={styles.txt2}>Width</Text>  
            <TextInput 
              style={[styles.inputStyle, {width:228}]} 
              value={values.width}
              onChangeText={handleChange('width')}
              onBlur={() => setFieldTouched('width')}
              placeholder='In meter (m)'
              />
          </View>
          {touched.width && errors.width && (
                <Text style={styles.errorTxt}>{errors.width}</Text>
              )}

          <View>
          <Text style={styles.txt2}>Height</Text>   
            <TextInput 
              style={[styles.inputStyle, {width:228}]} 
              value={values.height}
              onChangeText={handleChange('height')}
              onBlur={() => setFieldTouched('height')}
              placeholder='In meter (m)'
              />
          </View>
          {touched.height && errors.height && (
                <Text style={styles.errorTxt}>{errors.height}</Text>
              )}

          <View>
          <Text style={styles.txt2}>Tonnage</Text>   
            <TextInput 
              style={[styles.inputStyle, {width:228}]} 
              value={values.tonnage}
              onChangeText={handleChange('tonnage')}
              onBlur={() => setFieldTouched('tonnage')}
              placeholder='In Kilogram (Kg)'
              />
          </View>
          {touched.tonnage && errors.tonnage && (
                <Text style={styles.errorTxt}>{errors.tonnage}</Text>
              )}
        </View>

        <TouchableOpacity style={styles.Btn} onPress={() => handleSubmit()}>
          <Text style={styles.BtnTxt}>Add to Organization</Text>
        </TouchableOpacity>

      </View>
    </View>
    )}
    </Formik>
  );
};

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
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 10,
    paddingRight: 10,
  },
  formcontainer: {
    marginTop: 20,
    backgroundColor:'#ffffff',
    padding: 30,
    borderRadius:25,
    width: '100%',
    height: '100%',
  },
  txt: {
    color:'#004244',
    // fontFamily: 'Source Sans Pro',
    fontSize:15,
    fontWeight:"700",
  },
  txt2: {
    color:'#004244',
    // fontFamily: 'Source Sans Pro',
    fontSize:15,
  },
  
  inputStyle: {
    backgroundColor: '#f1f3f5',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 7,
    flex: 0,
    height: 36,
    width: 243,
    left:80,
    bottom:25,
    paddingLeft:"3%",
  },
  errorTxt: {
    fontSize: 12,
    color: 'brown',
    bottom:27,
    marginLeft: 85,
  },
  submitBtnTxt: {
    color: '#132939',
    textAlign:'right',
    fontSize: 14,
    fontWeight: '700',
  },
  arrowleft:{
    top:4,
  },
  capacity:{
    marginBottom:"10%",
  },
  capacityProp:{
    paddingLeft:"5%",
  },
  Btn:{
    paddingHorizontal:"5%",
    marginTop: "5%",
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
  }
});
 export default AddTruck;

