import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const HelpSupport= () =>{
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View style={GlobalStyles.wrapper}>
            <Header title="Help and Support" goBack={goBack}/>   

            <View style={GlobalStyles.whiteContainer}>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HelpSupport;
