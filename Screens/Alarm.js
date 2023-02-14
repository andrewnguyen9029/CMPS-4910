import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Platform,TouchableOpacity } from 'react-native';
import React, {useState, Component} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Alarm() {

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime,setSelectedTime]=useState('Select Time');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    //console.warn("Time Selected: ", date);
    const dt = new Date(date);
    const x = dt.toLocaleTimeString(); 
    console.log(x);
    setSelectedTime(x);

    hideTimePicker();
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style = {{
          width: '50%', 
          height: 50, 
          borderWidth: 0.5, 
          borderRadius: 20, 
          alignSelf: 'center', 
          justifyContent: 'center', 
          alignItems: 'center', 
          }}
           onPress={() =>{
            showTimePicker();
          }}>
           <Text style={styles.setFontSizeZero}>Select Alarm</Text>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
      </TouchableOpacity>

      <Text style={styles.setFontSizeOne}>{selectedTime}</Text>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setFontSizeZero:{
    fontSize: 25
  },
  setFontSizeOne:{
    fontSize: 25
  }
});

/* Andrew Nguyen
Imported the date and time picker 
created const variable for the time selected from the user 
*/