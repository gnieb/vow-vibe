import { FunctionComponent, useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors } from "./colors";

import styled from 'styled-components/native';
import RegularButton from "./Buttons/RegularButton";

const TimerView = styled.View`
justify-content: center;
padding: 10px;
width: 90%;
`


const Countdown:FunctionComponent = () => {

// to create a countdown:
// create useEffect that pulls the time RIGHT NOW. and then subtract that from the WEdding date/time.
// use DateTimePickerModal

    const [isDatePickerVisible, setDatePickerVisible] = useState(false); 
    const [expiryDate, setExpiryDate] = useState( new Date() ); // Default to current date and time 
    const [timeUnits, setTimeUnits] = useState({ 
        years: 0, 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
    }); 
    useEffect(()=> {
        
        const calculateTimeUnits = (timeDifference:any) => {
            const seconds = Math.floor( timeDifference/1000)

            setTimeUnits({
                years : Math.floor(seconds / 365 * 24 * 60 * 60),
                days: Math.floor(seconds % (365 * 24 * 60 * 60)) / 
                (24 * 60 * 60),
                hours: Math.floor(seconds % (24 * 60 * 60)) / (60 * 60), 
                minutes: Math.floor( (seconds % (60 * 60)) / 60 ), 
                seconds: Math.floor(seconds % 60) 
            })
        }

        const updateCountdown = () => {
            const currentDate = new Date().getTime();
            const expiryTime = expiryDate.getTime();
            const timeDifference = expiryTime - currentDate;

            if (timeDifference <= 0 ){
                // countdown is over
                calculateTimeUnits(0);
            } else {
                // countdown still running
                calculateTimeUnits(timeDifference)
            }
        };

        updateCountdown(); 
        const interval = setInterval(updateCountdown, 1000); 
        
        return () => clearInterval(interval); 

    }, [expiryDate])

    const formatTime = (time:any) => { 
        return time.toString().padStart(2, "0"); 
    };

    // padStart() => The padStart() method of String values pads this string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of this string.

    const handleStartTimer = () => { 
        setDatePickerVisible(true); 
    }; 

    const handleResetTimer = () => { 
        setExpiryDate(new Date()); // Reset to current date and time 
    }; 

    const handleDateConfirm = (date:any) => { 
        setExpiryDate(date); 
        setDatePickerVisible(false); 
    }; 

    const handleDateCancel = () => { 
        setDatePickerVisible(false); 
    }; 


    return (
        <TimerView>
            <Text>DAYS UNTIL THE BIG DAY</Text>
            <View style={styles.timer}>
                <Text style={[ 
                            styles.timeUnit, 
                            styles.yearUnit, 
                        ]} >{formatTime(timeUnits.years)}</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeUnit, 
                            styles.dayUnit, 
                        ]} >{formatTime(timeUnits.days)}</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeUnit, 
                            styles.hourUnit, 
                        ]} >{formatTime(timeUnits.hours)}</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeUnit, 
                            styles.minuteUnit, 
                        ]} >{formatTime(timeUnits.minutes)}</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeUnit, 
                            styles.secondUnit, 
                        ]}>{formatTime(timeUnits.seconds)}</Text>
            </View>
                    <RegularButton 
                        btnStyles={styles.button}
                        onPress={handleStartTimer} 
                    >START</RegularButton> 
                    <RegularButton 
                        onPress={handleResetTimer} 
                        btnStyles={styles.button }
                    >RESET</RegularButton> 
        <DateTimePicker 
                    // isVisible={isDatePickerVisible} 
                    value={expiryDate}
                    mode="datetime"
                        // or "date"
                    onConfirm={handleDateConfirm} 
                    onCancel={handleDateCancel} 
                /> 
        </TimerView>
    )
    
}


const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 20, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#f0f0f0", 
    }, 
    title: { 
        fontSize: 30, 
        fontWeight: "bold", 
        paddingVertical: 20, 
        color: "green", 
    }, 
    subtitle: { 
        marginBottom: 20, 
        fontSize: 18, 
    }, 
    timer: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    timeUnit: { 
        fontSize: 24, 
        fontWeight: "bold", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
    }, 
    yearUnit: { 
        backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: "white", 
    }, 
    dayUnit: { 
        backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: "white", 
    }, 
    hourUnit: { 
        backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: "white", 
    }, 
    minuteUnit: { 
        backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: "white", 
    }, 
    secondUnit: { 
        backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: "white", 
    }, 
    timeSeparator: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginHorizontal: 5, 
    }, 
    timetitle: { 
        fontSize: 17, 
        padding: 10, 
        paddingRight: 19, 
        fontWeight: "bold", 
    }, 
    buttonText: {
        color: `${colors.darkgreen}`,
        fontSize: 20,
        textAlign: 'center',
      },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        width:'80%',
    }
}); 

export default Countdown;