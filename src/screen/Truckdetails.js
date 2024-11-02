// Lets use this for Owner

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SignupSchema = Yup.object().shape({

  no: Yup.string()
  .matches(/^[A-Za-z]{3}[-][0-9]{4}$|^[A-Za-z]{2}[-][0-9]{4}$|^[0-9]{3}[-][0-9]{4}$|^[0-9]{2}[-][0-9]{4}$/, 'Invalid format. Please use the format  KA-1010 or 15-3456')
  .min(7,'Invalid format. Please use the format  KA-1010 or 15-3456')
  .max(8,'Invalid format. Please use the format  KA-1010 or 15-3456')
  .required('please enter a vehicle no'),

  type: Yup.string()
        .required('please enter vehicle type'),

  capacity: Yup.string()
        .required('please enter vehicle capacity'),

 
});

const Signup2 = (props) => {
  return (
    <Formik initialValues={{
      no: '',
      type: '',
      capacity: '',
    }}
    validationSchema={SignupSchema}
    >
      {({values,errors,touched,handleChange,setFieldTouched,setFieldValue,isValid,handleSubmit,}) => (

    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup") }> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Vehical Details</Text>
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
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Vehicle</Text>
        <Text style={styles.txt}>Capacity</Text>   
          <TextInput 
            style={styles.inputStyle}
            value={values.capacity}
            onChangeText={handleChange('capacity')}
            onBlur={() => setFieldTouched('capacity')}
             />
        </View>
        {touched.capacity && errors.capacity && (
              <Text style={styles.errorTxt}>{errors.capacity}</Text>
            )}


        <TouchableOpacity onPress={() => props.navigation.navigate() }>
          <Text style={styles.submitBtnTxt}>Continue <Icon name="arrow-right" size={20} color="#132939"/></Text>
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
});
 export default Signup2;
