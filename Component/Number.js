import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import React, {useState} from 'react';
 
export default function NUMBER() {
//Modal texts
    const [title, setTitle] = useState(`Number Input`);
    const [description, setDescription] = useState(`        
    
    Enter the correct 8-digit code below
    `);
    const [obstacle, setObstacle] = useState('');
  
    const generate = () => {
        setObstacle('');
        let choice = '';
        setTitle(``);
        setDescription(``);
        for(let i=0; i<8; i++) {
            choice = choice + Math.floor(Math.random() * 10);
        }
        setObstacle(choice);
        saveData(choice);
        //console.log(`End of generate`);
    }
    
    const saveData = (value) => {
        let obj = {
          answer: value
        }
        AsyncStorage.setItem('answer', JSON.stringify(obj));
        console.log(obj);
    }

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{description}{"\n"}</Text>
      <Text style={styles.obstacle}>{obstacle}{"\n"}</Text>
      <Button title='Generate Obstacle' onPress={generate}/>
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