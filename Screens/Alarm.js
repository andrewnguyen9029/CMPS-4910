import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Platform,TouchableOpacity, Button, SafeAreaView, AsyncStorage, TextInput } from 'react-native';
import React, {useState, Component} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import PEMDAS from '../Component/PEMDAS';
import SPOT from '../Component/Spot';
import NONE from '../Component/None';
import NUMBER from '../Component/Number';

export default function Alarm() {

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime,setSelectedTime]=useState('Select Time');
  //MA
  const [Pvisible, PsetVisible] = useState(false);
  const [Svisible, SsetVisible] = useState(false);
  const [Nvisible, NsetVisible] = useState(false);
  const [Nonevisible, NonesetVisible] = useState(false);
  const [theAnswer, setTheAnswer] = useState(0);
  const Pshow = () => PsetVisible(true);
  const Phide = () => {
    PsetVisible(false);
    switchFlags();
  }
  const Sshow = () => SsetVisible(true);
  const Shide = () => {
    SsetVisible(false);
    switchFlags();
  }
  const Nshow = () => {
    NsetVisible(true);
    setTheAnswer('');
  }
  const Nhide = () => {
    NsetVisible(false);
    switchFlags();
  }
  const Noneshow = () => NonesetVisible(true);
  const Nonehide = () => {
    NonesetVisible(false);
    switchFlags();
  }

  const getRandom = () => {
    switchFlags();
    let value = Math.floor(Math.random() * 4) + 1;
    console.log(value);
    console.log(P);
    console.log(S);
    console.log(N);
    console.log(None);
    if(value==1 && P) Pshow();
    else if(value==2 && S) Sshow();
    else if(value==3 && N) Nshow();
    else if(value==4 && None) Noneshow();
    else if(value==4 && P==false && S==false && N==false && None==false) Noneshow();
    else getRandom();  
  }

  const switchFlags = async () => {
    try{
      let flags = await AsyncStorage.getItem('P');
      let parsed = JSON.parse(flags);
      setP(parsed.P);
      flags = await AsyncStorage.getItem('S');
      parsed = JSON.parse(flags);
      setS(parsed.S);
      flags = await AsyncStorage.getItem('N');
      parsed = JSON.parse(flags);
      setN(parsed.N);
      flags = await AsyncStorage.getItem('None');
      parsed = JSON.parse(flags);
      setNone(parsed.None);
    }

    catch(error) {
      alert(error);
    }
    console.log(`{"N": ${N}, "None": ${None}, "P": ${P}, "S": ${S}}`)
  }
//Switch Flags variables
  const [P, setP] = useState(true);
  const [S, setS] = useState(true);
  const [N, setN] = useState(true);
  const [None, setNone] = useState(false);

  const submitAnswer = async () => {
    try{
      let answer = await AsyncStorage.getItem('answer');
      let parsed = JSON.parse(answer);
      submission = parsed.answer;
    }
    catch(error) {
      alert(error);
    }
    if(theAnswer==submission) {
      Phide();
      Shide();
      Nhide();
    }
    else if(Nonevisible) Nonehide();
    setTheAnswer('');
    switchFlags();
  }


//Answer variable
  let submission = 0;
  //ME

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
    getRandom();
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
     
      <Text>{"\n"}For Demo Purposes</Text>
      <Button title='PEMDAS Modal' onPress={Pshow}></Button>
      <Button title='Spot the Difference Modal' onPress={Sshow}></Button>
      <Button title='Number Input Modal' onPress={Nshow}></Button>
      <Button title='None Modal' onPress={Noneshow}></Button>
      <Text>{"\n"}</Text>
      <Button title='Random' onPress={getRandom}></Button>

      <Modal 
        visible={Pvisible}
        //onRequestClose={Phide}
      >
        <SafeAreaView style={styles.fill}>
          <Button title='hide' onPress={Phide}/>
          <Text style={styles.title}>{"\n"}PEMDAS</Text>
          <PEMDAS>
            
          </PEMDAS>
        </SafeAreaView>
        <TextInput style={styles.input}
          onChangeText={setTheAnswer}
          value={theAnswer}
          placeholder="Enter correct answer"
          keyboardType="numeric"
        />
        <Button title='Submit' onPress={submitAnswer}/>
      </Modal>

      <Modal
        visible={Svisible}
      >
        <SafeAreaView style={styles.fill}>
          <Button title='hide' onPress={Shide}/>
          <Text style={styles.title}>{"\n"}Spot the Difference</Text>
          <SPOT>

          </SPOT>
        </SafeAreaView>
        <TextInput style={styles.input}
          onChangeText={setTheAnswer}
          value={theAnswer}
          placeholder="Enter number of differences"
          keyboardType="numeric"
        />
        <Button title='Submit' onPress={submitAnswer}/>
      </Modal>

      <Modal
        visible={Nvisible}
      >
        <SafeAreaView style={styles.fill}>
          <Button title='hide' onPress={Nhide}/>
          <Text style={styles.title}>{"\n"}Number Input</Text>
          <NUMBER>

          </NUMBER>
        </SafeAreaView>
        <TextInput style={styles.input}
          onChangeText={setTheAnswer}
          value={theAnswer}
          placeholder="Enter the code above"
          keyboardType="numeric"
        />
        <Button style={styles.fill} title='Submit' onPress={submitAnswer}/>
      </Modal>

      <Modal 
        visible={Nonevisible}
        //onRequestClose={Phide}
      >
        <SafeAreaView style={styles.fill}>
          <Button title='hide' onPress={Nonehide}/>
          <Text style={styles.title}>{"\n"}None</Text>
          <NONE>

          </NONE>
        </SafeAreaView>
        <Button title='Close' onPress={submitAnswer}/>
      </Modal>

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
  },
  //MA
  fill: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 210,
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
  }, 
  buttons: {
    fill: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    padding: 8,
    margin: 10,
    width: 115,
  },
  button: {
    padding: 20,
    margin: 10,
    width: 300,
  }
  //ME
});

/* Andrew Nguyen
Imported the date and time picker 
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