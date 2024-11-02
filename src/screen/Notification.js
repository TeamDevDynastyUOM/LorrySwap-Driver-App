import React from 'react';
import { StyleSheet, SafeAreaView,Text, View, TouchableOpacity, TextInput} from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';


const Notification= () =>{
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={GlobalStyles.wrapper}>
            <Header title="Notification" goBack={goBack}/>   
            <View style={GlobalStyles.whiteContainer}>
            <FontAwesome name="search" size={18} color="black" style={styles.Searchicon}/>
            <TextInput 
                style={styles.SearchBtnStyle} 
                placeholder = "Search"  
                clearButtonMode='always'/>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    SearchBtnStyle:{
        
        fontSize:16,
        fontWeight:'bold',
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#dedede",
        paddingLeft: 50,       
    },
    Searchicon:{
        position: 'absolute',
        marginStart:50,
        marginTop:50,

    }
});

export default Notification;
