import React from 'react';
import {
	  SafeAreaView,
	  StyleSheet,
	  ScrollView,
	  View,
	  Text,
	  StatusBar,
} from 'react-native';
import {
	  Header,
		  LearnMoreLinks,
		  Colors,
		  DebugInstructions,
		  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Timer } from 'react-native-progress-timer'
import * as Progress from 'react-native-progress'
const App: () => React$Node = () => {
	  return (
		      <>
		        <StatusBar barStyle="light-content" />

		          <ScrollView
		            contentInsetAdjustmentBehavior="automatic"
		            style={styles.scrollView}>
		            <Text style={{color: '#ffffff', alignContent:'center', margin:'auto', textAlign: 'center', fontSize: 20}}>Timer</Text>
		            <View
		              style={{
				                    borderBottomColor: 'white',
					                    borderBottomWidth: 1,
					                  }}
		            />
		            {global.HermesInternal == null ? null : (
				                <View style={styles.engine}>
				                  <Text style={styles.footer}>Engine: Hermes</Text>
				                </View>
				              )}
		            <View style={styles.body}>
		              <Timer
		                    remainingTime={30}
		                    size={350}
		                    showsText={true}
		                    animated={true}
		                    direction={'counter-clockwise'}
		                    borderColor= {'#d9dcdd'}
		                    borderWidth= {3}
		                    thickness={5}
		                    color={'#faac02'}
		                    style={options.style}
		                    textStyle={options.textStyle}
		                    options={options}
		                  />
		            </View>
		          </ScrollView>

		      </>
		    );
};

const options = {
	  style: {
		      margin: 'auto',
		    },
	  textStyle:{
		      color: '#ffffff'
		    },
	  view: {
		      flexDirection: 'row', 
		      justifyContent: 'space-between', 
		      margin: 10
		    },
	  highlight: {
		      backgroundColor: '#000000'
		    },
	  play: {
		      underlayColor: '#000000',
		      borderColor: '#d9dcdd',
		      textStyle:{
			            color: '#ffffff'
			          },
		      style: {
			            backgroundColor: '#000000'
			          }
		    },
	  cancel: {
		      underlayColor: '#000000',
		      borderColor: '#d9dcdd',
		      textStyle:{
			            color: '#ffffff'
			          },
		      style: {
			            backgroundColor: '#000000'
			          }
		    }
}

const styles = StyleSheet.create({
	  scrollView: {
		      backgroundColor: Colors.black,
		    },
	  engine: {
		      position: 'absolute',
		      right: 0,
		    },
	  body: {
		      backgroundColor: Colors.black,
		      alignItems: 'center',
		      marginTop: 50
		    },
	  sectionContainer: {
		      marginTop: 32,
		      paddingHorizontal: 24,
		    },
	  sectionTitle: {
		      fontSize: 24,
		      fontWeight: '600',
		      color: Colors.black,
		    },
	  sectionDescription: {
		      marginTop: 8,
		      fontSize: 18,
		      fontWeight: '400',
		      color: Colors.dark,
		    },
	  highlight: {
		      fontWeight: '700',
		    },
	  footer: {
		      color: Colors.dark,
		      fontSize: 12,
		      fontWeight: '600',
		      padding: 4,
		      paddingRight: 12,
		      textAlign: 'right',
		    },
});
export default App;
