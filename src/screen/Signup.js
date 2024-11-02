import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton, TouchableRipple, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { useState } from 'react';
import ButtonText from '../components/ButtonText';


const SignupSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  lname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Please enter your Email address'),
  mobile: Yup.string()
          .min(10,'Must be exactly 10 digits')
          .max(10,'Must be exactly 10 digits')
          .matches(/^[0-9]+$/,'Must be only digits')
          .required('Please enter your mobile number'),
  age: Yup.string()
        .test('is-positive', 'Age must be a positive number', value => parseInt(value) > 0)
        .test('is-integer', 'Age must be an integer', value => parseInt(value) === parseFloat(value))
        .test('is-at-least-18', 'Age must be at least 18 years old', value => parseInt(value, 10) >= 18)
        .test('is-less-than-100', 'Age must be less than 100 years old', value => parseInt(value, 10) < 100)
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Please enter your age'),
  nic: Yup.string()
        .matches(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, 'Invalid NIC format')
        .required('Please enter a valid NIC'),
  gender: Yup.string()
          .required('Please select your gender'),
  role: Yup.array()
          .min(1, 'Please select at least one role')
          .required('Please select your role or roles'),   
});



const GenderSelection = ({ values, setFieldValue }) => (
  <View style={styles.genderStyle} >
    <Text style={styles.txt}>Gender</Text>
    <View style={styles.genderSection}>
      <TouchableRipple onPress={() => setFieldValue('gender', 'male')}>
        <View style={styles.radiobtn}>
          <RadioButton
          value="male"
          status={values.gender === 'male' ? 'checked' : 'unchecked'}
          onPress={() => setFieldValue('gender', 'male')}
          />
          <Text style={{marginRight: 10, ...styles.txt}}>Male</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple onPress={() => setFieldValue('gender', 'female')}>
        <View style={styles.radiobtn}>
          <RadioButton
          value="female"
          status={values.gender === 'female' ? 'checked' : 'unchecked'}
          onPress={() => setFieldValue('gender', 'female')}
          />
          <Text style={styles.txt}>Female</Text>
        </View>
      </TouchableRipple>
    </View>
  </View>
)

const RoleSelectionCheckBox = ({ values, setFieldValue }) => {
  const toggleRole = (role) => {
    let updatedRoles = [...values.role];

    if (updatedRoles.includes(role)) {
      updatedRoles = updatedRoles.filter((r) => r !== role);
    } else {
      updatedRoles.push(role);
    }

    setFieldValue('role', updatedRoles);
  };

  return (
    <View style={styles.genderStyle}>
      <Text style={styles.txt}>Roles</Text>
      <View style={styles.genderSection}>
        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            status={values.role.includes('Driver') ? 'checked' : 'unchecked'}
            onPress={() => toggleRole('Driver')}
            color="#004344"
          />
          <Text style={{ ...styles.txt, marginLeft: -10 }}>Driver</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            status={values.role.includes('Owner') ? 'checked' : 'unchecked'}
            onPress={() => toggleRole('Owner')}
            color="#004344"
          />
          <Text style={{ ...styles.txt, marginLeft: -10 }}>Owner</Text>
        </View>
      </View>
    </View>
  );
};

const allValuesFilled = (values) => {
  return Object.values(values).every(value => value !== '');
};


const Signup = (props) => {

  const navigation = useNavigation();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  
  const [buttonName1, setButtonName1] = useState("Upload License Side 01");
  const [buttonName2, setButtonName2] = useState("Upload License Side 02");

  const goBack = () => {
    navigation.goBack() 
  }

  const showAlert = (errors) => {
    let errorMessages = [];
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errorMessages.push(errors[key]);
      }
    }
    Alert.alert("Form Errors", errorMessages.join('\n'));
  };

  const handleContinue = (errors, handleSubmit) => () => {
    if (Object.keys(errors).length > 0) {
      showAlert(errors);
    } else {
      handleSubmit();
    }
  };

  return (
    <Formik initialValues={{
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      age: '',
      nic:'',
      gender: '',
      role: [],
    }}
    validationSchema={SignupSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        navigation.navigate("Password", { formData: values });
        setSubmitting(false);
      }, 400);
    }}
    >
      {({values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit}) => (


    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <Header title="Lets Start with creating your account" goBack={goBack}/> 
      <View style={styles.formcontainer}>
        <View style={styles.inputwrapper}>
          <Text style={styles.txt}>First Name</Text>
          <TextInput 
            style={styles.inputStyle} 
            value={values.fname}
            onChangeText={handleChange('fname')} 
            onBlur={() => setFieldTouched('fname')}
          />
        </View>
        {touched.fname && errors.fname && (
              <Text style={styles.errorTxt}>{errors.fname}</Text>
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Last Name</Text>   
          <TextInput 
            style={styles.inputStyle} 
            value={values.lname}
            onChangeText={handleChange('lname')}
            onBlur={() => setFieldTouched('lname')}
             />
        </View>
        {touched.lname && errors.lname && (
              <Text style={styles.errorTxt}>{errors.lname}</Text>
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Email</Text>
          <TextInput 
            style={styles.inputStyle}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
             />
        </View>
        {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}


        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Contact No</Text>
          <TextInput 
            style={styles.inputStyle}
            keyboardType='phone-pad'
            value={values.mobile}
            onChangeText={handleChange('mobile')}
            onBlur={() => setFieldTouched('mobile')}
             />
        </View>
        {touched.mobile && errors.mobile && (
              <Text style={styles.errorTxt}>{errors.mobile}</Text>
            )}

        <View style={styles.inputwrapper}>
        <Text style={styles.txt}>Age</Text>
          <TextInput 
            style={styles.inputStyle} 
            keyboardType='phone-pad'
            value={values.age}
            onChangeText={handleChange('age')}
            onBlur={() => setFieldTouched('age')}
             />
        </View>
        {touched.age && errors.age && (
              <Text style={styles.errorTxt}>{errors.age}</Text>
            )}

        <GenderSelection values={values} setFieldValue={setFieldValue} />

        {touched.gender && errors.gender && (
              <Text style={styles.errorTxt}>{errors.gender}</Text>
            )}

        <View style={styles.inputwrapper}>
        
        <Text style={styles.txt}>NIC*</Text>
          <TextInput 
            style={styles.inputStyle} 
            value={values.nic}
            onChangeText={handleChange('nic')} 
            onBlur={() => setFieldTouched('nic')}
          />
        </View>
        {touched.nic && errors.nic && (
              <Text style={styles.errorTxt}>{errors.nic}</Text>
        )}

        <Text style={{...styles.txt, marginBottom: 10}}>Select your role</Text>
        <RoleSelectionCheckBox values={values} setFieldValue={setFieldValue} />

        {touched.role && errors.role && (
              <Text style={styles.errorTxt}>{errors.role}</Text>
        )}

        <ButtonText
          buttonName="Continue"
          onPress={handleContinue(errors, handleSubmit)}
          alignIcon="right"
        />
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
    marginTop: '10%',
    // paddingLeft: 5,
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
    color:'#004344',
    fontSize:15,
    fontWeight:"700",
    marginRight: 10,
  },
  inputStyle: {
    backgroundColor: '#f1f3f5',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 7,
    flex: 0,
    height: 36,
    width: 240,
    marginLeft:90,
    bottom:25,
    paddingLeft:15,
    
  },
  errorTxt: {
    fontSize: 12,
    color: 'brown',
    bottom:25,
    marginLeft: 85,
  },
  submitBtnTxt: {
    color: '#132939',
    textAlign:'right',
    fontSize: 14,
    fontWeight: '700',
    flexDirection:'row',
    alignItems:'center',
    
  },
  radiobtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  genderSection:{
    marginLeft: 20,
    flexDirection: 'row',
  },

  genderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    bottom: 15,
  },
  arrowleft:{
    top:4,
  },
  arrowright:{
    top: 50,
  },
  container: {
    bottom: 25,
    paddingTop: 20,
  },
  disabledBtn: {
    opacity: 0.1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Signup;