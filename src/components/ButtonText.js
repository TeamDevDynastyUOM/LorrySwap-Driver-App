import React from "react";
import { Text, TouchableOpacity} from "react-native";
import GlobalStyles from '../styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const ButtonText = ({buttonName, onPress, size, alignIcon}) => {

    return(
        size == 'xs'?(
                <TouchableOpacity onPress={onPress}>
                    <Text style={GlobalStyles.text4}>{buttonName}</Text>
                </TouchableOpacity> 
        ):(
            alignIcon == 'left'?(
                <TouchableOpacity style={GlobalStyles.continueContainer} onPress={onPress}>
                    <FontAwesome5 name='arrow-left' style={GlobalStyles.continueButton}/>
                    <Text style={GlobalStyles.continueButton}>{buttonName}</Text>
                </TouchableOpacity>  
            ):
            alignIcon == 'right'?(
                <TouchableOpacity style={GlobalStyles.continueContainer} onPress={onPress}>
                    <Text style={GlobalStyles.continueButton}>{buttonName}</Text>
                    <FontAwesome5 name='arrow-right' style={GlobalStyles.continueButton}/>
                </TouchableOpacity> 
            ):(
                <TouchableOpacity style={GlobalStyles.continueContainer} onPress={onPress}>
                    <Text style={GlobalStyles.continueButton}>{buttonName}</Text>
                </TouchableOpacity> 
            )
        )
   
    
    );
};

export default ButtonText;
