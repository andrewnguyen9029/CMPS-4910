import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react';
 
export default function NONE() {
//Modal texts
    const title = `None`;
    const description =`        
    
    There is no obstacle here 
    so just press close
    `;
  
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}{"\n"}</Text>
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
  image: {
    resizeMode: 'center'
  }
});