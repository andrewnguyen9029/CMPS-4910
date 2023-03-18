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
    //const x = dt.toLocaleTimeString('en-US'); 
    const x = `${dt.getHours()}:${dt.getMinutes()}:0`;
    console.log(x);
    setSelectedTime(x);

    hideTimePicker();
    //MA
    alarm = `${dt.getHours()}:${dt.getMinutes()}:0`;
    console.log(`Current time is ${clock}`);
    alarmSet = true;
    console.log(`alarmSet is ${alarmSet}`);
    console.log(`alarm is set for ${alarm}`);
    checker();
    //ME
  };
  //MA
  const checker = () => {
    //checks the current time and compares to time set for alarm
    console.log(`inside checker`)
    console.log(`clock: ${clock} alarm: ${alarm}`);
    let i = 0;
    while(alarmSet) {
      today = new Date();
      clock = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      console.log(`clock = ${clock}`);
      if(clock==alarm) alarmSet=false;
    };
    ringer();
  }

  const ringer = () => {
    //the "alarm" that "rings" once checker is finished
    console.log(`inside ringer`)  
    alert(`ring ring`);
    //obstacles would go around here
  }

  //variables in use
  let today = new Date();
  let clock = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  let alarmSet = false;
  let alarm = `0`;
  //ME
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
            //console.log(`before timePicker`);
            showTimePicker();
            //console.log(`before checker`);
            //setTimeout(checker(),1000);
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
time pickervisible etc
selected time etc

showTimePicker
hideTimePicker
handleTimePicker
hideTimepicker
created const variable for the time selected from the user 
*/ 

/* Michael Abad
created checker and ringer functions
created variables used for checker and ringer functions
***IMPORTANT***
code works but 3 (THREE) non-fatal problems that arise because of code
1. displayed chosen alarm MIGHT not update until after checker and ringer function run
    1.a. does not always update even after functions are resolved
    1.b. may display A previous selected time, not necessarily THE previously selected time
2. app is NOT interactable with while checker function is running
3. app is NOT IMMEDIATELY interactable with after alarm rings
    3.a. app is ONLY interactable with AFTER PayloadTooLargeError occurs
    3.b. app works as intended after error occurs
    3.c. approximately 1 min 30 secs from alert() until error occurs
    3.d. error can be seen in logs
*/
