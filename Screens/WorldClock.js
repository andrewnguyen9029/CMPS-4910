import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Switch, AsyncStorage } from 'react-native';
import React, {useState} from 'react';

export default function WorldClock() {
  const [PisEnabled, setPIsEnabled] = useState(false);
  const [SisEnabled, setSIsEnabled] = useState(false);
  const [NisEnabled, setNIsEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [Ptext, setPText] = useState('Disabled');
  const [Stext, setSText] = useState('Disabled');
  const [Ntext, setNText] = useState('Disabled');
  const [text, setText] = useState('Enabled');

  const [number, setNumber] = useState(1);
  const bounds = 7;
  //bounds tests total possible obstacles
  const randomNumber = (input = 4) => {
    //random number generator
    //input by default is 4
    let max = input;
    const value = Math.floor(Math.random() * max) + 1;
    setNumber(value);
    console.log(number);
  }

//SaveData functions share data between screens
  //obj must be opposite because "saveData"s are too fast
  const PsaveData = () => {
    let obj = {
      P: !PisEnabled
    }
    AsyncStorage.setItem('P', JSON.stringify(obj));
    console.log(obj);
  }
  const SsaveData = () => {
    let obj = {
      S: !SisEnabled
    }
    AsyncStorage.setItem('S', JSON.stringify(obj));
    console.log(obj);
  }
  const NsaveData = () => {
    let obj = {
      N: !NisEnabled
    }
    AsyncStorage.setItem('N', JSON.stringify(obj));
    console.log(obj);
  }
  const saveData = () => {
    let obj = {
      None: !isEnabled
    }
    AsyncStorage.setItem('None', JSON.stringify(obj));
    console.log(obj);
  }

//Toggle Switches control valid obstacles
  const togglePSwitch = () => {
    if(PisEnabled===true) setPText('Disabled')
    else {
      setPText('Enabled')
      if(isEnabled===true) toggleSwitch();
    }

    setPIsEnabled(previousState => !previousState)
    PsaveData();
  }
  const toggleSSwitch = () => {
    if(SisEnabled===true) setSText('Disabled')
    else {
      setSText('Enabled')
      if(isEnabled===true) toggleSwitch();
    }

    setSIsEnabled(previousState => !previousState)
    SsaveData();
  }
  const toggleNSwitch = () => {
    if(NisEnabled===true) setNText('Disabled')
    else {
      setNText('Enabled')
      if(isEnabled===true) toggleSwitch();
    }

    setNIsEnabled(previousState => !previousState)
    NsaveData();
  }
  const toggleSwitch = () => {
    if(isEnabled===true) setText('Disabled')
    else {
      setText('Enabled')
      if(PisEnabled===true) togglePSwitch();
      if(SisEnabled===true) toggleSSwitch();
      if(NisEnabled===true) toggleNSwitch();
    }
    setIsEnabled(previousState => !previousState)
    //debugging, () for 4, (bounds) for 7
    //randomNumber(bounds);
    //console.log(`PEMDAS is ${PisEnabled}`);
    saveData();
  }

  return (
    <View style={styles.container}>
      <Text>PEMDAS is {Ptext}</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor='white'
         ios_backgroundColor="grey"
          onValueChange={togglePSwitch}
          value={PisEnabled}
        />
      
      
      <Text>Spot the Difference is {Stext}</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor='white'
          ios_backgroundColor="grey"
          onValueChange={toggleSSwitch}
          value={SisEnabled}
        />
      
      
      <Text>Number Input is {Ntext}</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor='white'
          ios_backgroundColor="grey"
          onValueChange={toggleNSwitch}
          value={NisEnabled}
        />
      

      <Text>None is {text}</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          thumbColor='white'
          ios_backgroundColor="grey"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});