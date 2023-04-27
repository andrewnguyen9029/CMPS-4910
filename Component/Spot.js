import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, AsyncStorage, Image } from 'react-native';
import React, {useState} from 'react';
 
export default function Spot() {
//Modal texts
    const [title, setTitle] = useState(`Spot the Difference`);
    const [description, setDescription] = useState(`        
    
    Spot the total number of differences 
    between the photos
    `);
    const [obstacle, setObstacle] = useState('');
    const images = {
    //makes setting image source dynamic
        '1': require('../seniorProject23/assets/edited_image1.png'),
        //https://i0.wp.com/guillermomolinacordero.com/blog/wp-content/uploads/2019/09/spot-the-differences-between-two-pictures.png?ssl=1
        '2': require('../seniorProject23/assets/edited_image2.png'),   
        //https://i0.wp.com/guillermomolinacordero.com/blog/wp-content/uploads/2019/09/spot-the-differences-pictures.png?resize=768%2C768&ssl=1
        '3': require('../seniorProject23/assets/image3.png'),
        //https://i0.wp.com/guillermomolinacordero.com/blog/wp-content/uploads/2019/09/spot-differences-shark.png?resize=768%2C768&ssl=1
        '4': require('../seniorProject23/assets/edited_image4.png'),
        //https://img.jagranjosh.com/images/2023/January/412023/find%204%20differences-min.jpg
        '5': require('../seniorProject23/assets/edited_image5.png'),
        //https://us.123rf.com/450wm/lexiclaus/lexiclaus2205/lexiclaus220500071/186673876-black-and-white-find-differences-game-for-children-sea-adventures-line-educational-activity-with.jpg?ver=6
        '6': require('../seniorProject23/assets/edited_image6.png'),
        //https://www.supercoloring.com/sites/default/files/styles/drawing_full/public/zif/2021/12/spot-the-differences-18-puzzle-games.jpg
        '7': require('../seniorProject23/assets/edited_image7.png'),
        //https://i0.wp.com/guillermomolinacordero.com/blog/wp-content/uploads/2019/04/find-differences.png?ssl=1
    }   

    const generate = () => {
        setTitle(``);
        setDescription(``);
        let choice = Math.floor(Math.random() * 7) + 1;
        console.log(`random number = ${choice}`);
        if(choice==1) {
            setObstacle(1);
            saveData(1);
        }
        else if (choice==2) {
            setObstacle(2);
            saveData(2);
        }
        else if (choice==3) {
            setObstacle(3);
            saveData(3);
        }
        else if (choice==4) {
            setObstacle(4);
            saveData(4);
        }
        else if (choice==5) {
            setObstacle(5);
            saveData(5);
        }
        else if (choice==6) {
            setObstacle(6);
            saveData(6);
        }
        else if (choice==7) {
            setObstacle(7);
            saveData(7);
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
      <Text>{description}{"\n"}</Text>
      <Image style={styles.image} source={images[obstacle]}/>
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