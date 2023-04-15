import React, {useState, useRef, useCallback} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import Control from '../Component/Control'
import Header from '../Component/Header';
import Result from '../Component/Result';
import utility from '../Component/utility'; 
import { displayTime } from '../Component/utility'; 

export default function Stopwatch() {
      const [time, setTime] = useState(0);
      const [isRunning, setRunning] = useState(false);
      const [results, setResults] = useState([ ]);
      const timer = useRef(null);
  
const LeftButton = useCallback (() =>  {
    if (isRunning) {
      setResults((previousResults) => [time, ...previousResults]);
    }
    else{
      setResults([]);
      setTime(0);
    }
}, [isRunning, time]);

const RightButton = useCallback (() =>  {
  if (!isRunning) {
      const interval = setInterval(() => {
        setTime((previousTime) => previousTime + 1);
      }, 10);

      timer.current = interval;
  }
  else {
      clearInterval(timer.current);
  }
    setRunning((previousState) => !previousState);
},[isRunning]);

return (
  <SafeAreaView style = {styles.container}>
      <Header/>
      <StatusBar sytle = 'light' />
      <View style = {styles.display}>
          <Text style = {styles.displayText}> {displayTime(time)}</Text>
      </View>

      <View style = {styles.control}>
          <Control
              isRunning = {isRunning}
              LeftButton = {LeftButton}
              RightButton = {RightButton}
          />
      </View>

      <View style = {styles.result}>
          <Result results = {results}/>
      </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container:{
      flex:1, 
      backgroundColor:'gray', 
      paddingTop: Constants.statusBarHeight, 
    }, 
    display:{
      flex: 3/5, 
      justifyContent: 'center', 
      alignItems: 'center', 
    }, 
    displayText:{
      color: '#fff', 
      fontSize:70, 
      fontWeight: '200', 
      fontFamily: Platform.OS === 'iOS' ? 'Helvtica Neue': null, 
    }, 
    control:{
      height: 70, 
      flexDirection:'row', 
      justifyContent: 'space-around', 
    }, 
    result: {flex: 2/5}
});

/*
-Header
Utility 
Control
Results 

Stopwatch 

created by Andrew Nguyen
*/