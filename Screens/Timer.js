import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TimerScreen = () => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [timeLeft, setTimeLeft] = useState(0);
	const [timerRunning, setTimerRunning] = useState(false);

	useEffect(() => {
		setTimeLeft(hours * 3600 + minutes * 60 + seconds);
	}, [hours, minutes, seconds]);

	useEffect(() => {
		let interval;
		if (timerRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(timeLeft => timeLeft - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			clearInterval(interval);
			setTimerRunning(false);
			alert('Timer finished!');
		}
		return () => clearInterval(interval);
	}, [timerRunning, timeLeft]);

	const startTimer = () => {
		if (timeLeft === 0) {
			return;
		}
		setTimerRunning(true);
	};

	const pauseTimer = () => {
		setTimerRunning(false);
	};

	const resetTimer = () => {
		setTimerRunning(false);
		setTimeLeft(hours * 3600 + minutes * 60 + seconds);
	};

	const formatTime = time => {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;
		return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	return (
		<View style={styles.container}>
		<View style={styles.inputContainer}>
		<View style={styles.inputRow}>
		<Text style={styles.inputLabel}>H</Text>
		<TouchableOpacity onPress={() => setHours(hours => hours + 1)}>
		<Ionicons name="add-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		<Text style={styles.inputValue}>{hours}</Text>
		<TouchableOpacity onPress={() => setHours(hours => Math.max(hours - 1, 0))}>
		<Ionicons name="remove-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		</View>
		<View style={styles.inputRow}>
		<Text style={styles.inputLabel}>M</Text>
		<TouchableOpacity onPress={() => setMinutes(minutes => minutes + 1)}>
		<Ionicons name="add-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		<Text style={styles.inputValue}>{minutes}</Text>
		<TouchableOpacity onPress={() => setMinutes(minutes => Math.max(minutes - 1, 0))}>
		<Ionicons name="remove-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		</View>
		<View style={styles.inputRow}>
		<Text style={styles.inputLabel}>S</Text>
		<TouchableOpacity onPress={() => setSeconds(seconds => seconds + 1)}>
		<Ionicons name="add-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		<Text style={styles.inputValue}>{seconds}</Text>
		<TouchableOpacity onPress={()=> setSeconds(seconds => Math.max(seconds - 1, 0))}>
		<Ionicons name="remove-circle-outline" size={24} color="black" />
		</TouchableOpacity>
		</View>
		</View>
		<View style={styles.timerContainer}>
		<Text style={styles.timer}>{formatTime(timeLeft)}</Text>
		</View>
		<View style={styles.buttonContainer}>
		<TouchableOpacity style={[styles.button, timerRunning && styles.buttonDisabled]} onPress={startTimer} disabled={timerRunning}>
		<Text style={styles.buttonText}>Start</Text>
		</TouchableOpacity>
		<TouchableOpacity style={[styles.button, !timerRunning && styles.buttonDisabled]} onPress={pauseTimer} disabled={!timerRunning}>
		<Text style={styles.buttonText}>Pause</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.button} onPress={resetTimer}>
		<Text style={styles.buttonText}>Reset</Text>
		</TouchableOpacity>
		</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		marginVertical: 20,
	},
	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputLabel: {
		fontSize: 24,
		marginRight: 10,
	},
	inputValue: {
		fontSize: 24,
		marginHorizontal: 10,
	},
	timerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	timer: {
		fontSize: 60,
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		backgroundColor: 'blue',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		marginHorizontal: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
	},
	buttonDisabled: {
		backgroundColor: '#ccc',
	},
});

export default TimerScreen;
