import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Audio } from 'expo-av';
import { Notifications } from 'expo';

export default function Alarm() {
	const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
	const [selectedTime, setSelectedTime] = useState('Select Time');
	const [alarm, setAlarm] = useState(null);
	const [soundObject, setSoundObject] = useState(null);

	const showTimePicker = () => {
		setTimePickerVisibility(true);
	};

	const hideTimePicker = () => {
		setTimePickerVisibility(false);
	};

	const handleTimeConfirm = (date) => {
		const dt = new Date(date);
		const x = `${dt.getHours()}:${dt.getMinutes()}:0`;
		setSelectedTime(x);
		hideTimePicker();
		setAlarm(`${dt.getHours()}:${dt.getMinutes()}:0`);
	};

	const ringer = async () => {
		console.log(`inside ringer`);
		const { sound } = await Audio.Sound.createAsync(require('../seniorProject23/assets/alarm2.wav'));
		setSoundObject(sound);
		console.log('loading sound');
		await sound.setIsLoopingAsync(true);
		await sound.playAsync();
		console.log('playing sound');
	};


	useEffect(() => {
		const checker = setInterval(() => {
			if (alarm) {
				const today = new Date();
				const clock = `${today.getHours()}:${today.getMinutes()}:0`;
				console.log(`clock = ${clock}`);
				if (clock === alarm) {
					ringer();
				}
			}
		}, 1000);
		return () => clearInterval(checker);
	}, [alarm]);

	useEffect(() => {
		return soundObject
			? () => {
				console.log('unloading sound');
				soundObject.unloadAsync();
			}
			: undefined;
	}, [soundObject]);

	return (
		<View style={styles.container}>
		<TouchableOpacity
		style={{
			width: '50%',
				height: 50,
				borderWidth: 0.5,
				borderRadius: 20,
				alignSelf: 'center',
				justifyContent: 'center',
				alignItems: 'center',
		}}
		onPress={() => showTimePicker()}
		>
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
	setFontSizeZero: {
		fontSize: 25,

	},
	setFontSizeOne:
	{
		fontSize: 25,
	},
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
