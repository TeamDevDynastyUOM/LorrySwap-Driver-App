import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';

const StarRating = ({rating, onRatingChange, size}) => {
    // rating is the initial rating value
    // onRatingChange is a function that gets called whenever the user selects a new rating

    const [selectedRating, setSelectedRating] = useState(rating);

    // handleRating function updates the selected rating and calls the onRatingChange function with the new rating
    const handleRating = (newRating) => {

        setSelectedRating(newRating);
        // onRatingChnge function eka newrating eken update wenaw
        onRatingChange(newRating);
    };

    // render the star on the display
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <TouchableOpacity key={i} onPress={() => handleRating(i)}>
              <AntDesign
                name={i <= selectedRating ? 'star' : 'staro'}
                size={size}
                color={i <= selectedRating ? '#FFD700' : '#C0C0C0'}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
          );
        }
        return stars;
    };  



  return (
    <View style={{ flexDirection: 'row' }}>
        {renderStars()}
    </View>
  )
}

export default StarRating;