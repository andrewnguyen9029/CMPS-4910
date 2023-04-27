import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import React, {useState} from 'react';

export default function PEMDAS() {
//Modal texts
    const [title, setTitle] = useState(`PEMDAS`);
    const [description, setDescription] = useState(`        
    P:  Parenthesis
    E:  Exponents
    MD: Multiplication/Division
    AS: Addition/Subtraction

    Solve the Order of Operations question
    `);
    const [obstacle, setObstacle] = useState('');
    
    const [number, setNumber] = useState(1);
    const [answer, setAnswer] = useState(0);
    //answer and setAnswer may be useless
    const randomNumber = () => {
      //random number generator
      let value = Math.floor(Math.random() * 7) + 1;
      //console.log(`random number = ${value}`);
      setNumber(value);
      console.log(`value = ${value}, number = ${number}`);
    }

    const generate = () => {
        randomNumber();
        //randomNumber() too slow to setNumber correctly
        setTitle(``);
        setDescription(``);
        //OG: let choice = number;
        let choice = Math.floor(Math.random() * 7) + 1;
        console.log(`choice = ${choice}`);
        if(choice==1) {
            setAnswer(12);
            setObstacle('2*4+4');
            saveData(12);
        }
        else if (choice==2) {
            setAnswer(0);
            setObstacle('12/6-2');
            saveData(0);
        }
        else if (choice==3) {
            setAnswer(4);
            setObstacle('3^(1)/3+3');
            saveData(4);
        }
        else if (choice==4) {
            setAnswer(4);
            setObstacle('4+16/8-2');
            saveData(4);
        }
        else if (choice==5) {
            setAnswer(7);
            setObstacle('20+100/50-15');
            saveData(7);
        }
        else if (choice==6) {
            setAnswer(8);
            setObstacle('(4+6)*4/5');
            saveData(8);
        }
        else if (choice==7) {
            setAnswer(5);
            setObstacle('12/4+2');
            saveData(5);
        }
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
      <Text>{description}</Text>
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
  obstacle: {
    fontSize: 20,
  }
});