import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import GlobalStyles from '../styles/GlobalStyles';
import { Feather } from '@expo/vector-icons';

const Header = ({title, goBack}) => {

    return(
        <View style={GlobalStyles.header}>
            <TouchableOpacity onPress={goBack}>
                <Feather style={GlobalStyles.iconHeader} name="arrow-left" size={20} color="white"/>
            </TouchableOpacity>
            <Text style={GlobalStyles.pageTitle}>{title}</Text>
        </View>    
    
    );
};

export default Header;