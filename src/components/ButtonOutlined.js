import React from "react";
import { Text, TouchableOpacity} from "react-native";
import GlobalStyles from '../styles/GlobalStyles';
import { FontAwesome5 } from '@expo/vector-icons';

const ButtonOutlined = ({buttonName, onPress, arrow, size}) => {

    return(
        arrow == 'left'?(
            <TouchableOpacity style={GlobalStyles.waitingButton} onPress={onPress}>
                <FontAwesome5 name='arrow-left' style={GlobalStyles.continueButton}/>
                <Text style={GlobalStyles.suggestedButtonText}>{buttonName}</Text>
            </TouchableOpacity>
        ) : arrow == 'right'?(
            <TouchableOpacity style={GlobalStyles.waitingButton} onPress={onPress}>
                <Text style={GlobalStyles.suggestedButtonText}>{buttonName}</Text>
                <FontAwesome5 name='arrow-right' style={GlobalStyles.continueButton}/>
            </TouchableOpacity>
        ) : size == 'small'?(
            <TouchableOpacity style={GlobalStyles.ViewLocationBtn}  onPress={onPress}>
                <Text style={GlobalStyles.viewLocationBtnText}>{buttonName}</Text>
            </TouchableOpacity>
        ):(
            <TouchableOpacity style={GlobalStyles.waitingButton} onPress={onPress}>
                <Text style={GlobalStyles.suggestedButtonText}>{buttonName}</Text>
            </TouchableOpacity> 
        )
    );
};

export default ButtonOutlined;