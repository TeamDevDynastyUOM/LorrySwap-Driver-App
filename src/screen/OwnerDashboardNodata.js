import { StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const OwnerDashboardNodata = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.header}>    
        <TouchableOpacity onPress={() => navigation.navigate("OwnerHome")}> 
          <Icon style={styles.arrowleft} name="arrow-left" size={20} color="white"/>
        </TouchableOpacity>
        <Text style={styles.title}>Prasanna Travels</Text>
      </View>

        <View style={styles.Container}>

            <View style={styles.imageView}>
                <Image source={require('../assests/images/Add.jpg')} style={styles.image}></Image>
            </View>

            <View style={styles.txtView}>
                <Text style={styles.txt}>Please Assign Driver</Text>
            </View>

            <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate("Assign")}>
                <Text style={styles.BtnTxt}>Assign Driver</Text>
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
      imageView:{
        justifyContent:"center",
        alignItems:'center',
      },
      image:{
        width:"40%",
        height:"40%",
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
      txtView:{
        alignItems:"center"
      },
      txt:{
        fontSize: 18,
        color: '#004344',
        fontWeight:'bold'
      },
})

export default OwnerDashboardNodata