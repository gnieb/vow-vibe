import { FunctionComponent, useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors } from "./colors";
import styled from 'styled-components/native';
import RegularButton from "./Buttons/RegularButton";

const TimerView = styled.View`
justify-content: center;
align-items: center;
padding: 10px;
width: 100%;
`


const Countdown:FunctionComponent = () => {

// to create a countdown:
// create useEffect that pulls the time RIGHT NOW. and then subtract that from the WEdding date/time.
// use DateTimePickerModal

    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false); 
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

            // setTimeUnits({
            //     years : Math.floor(seconds / 365 * 24 * 60 * 60),
            //     days: Math.floor(seconds % (365 * 24 * 60 * 60)) / 
            //     (24 * 60 * 60),
            //     hours: Math.floor(seconds % (24 * 60 * 60)) / (60 * 60), 
            //     minutes: Math.floor( (seconds % (60 * 60)) / 60 ), 
            //     seconds: Math.floor(seconds % 60) 
            // })

            setTimeUnits({ 
                years: Math.floor( 
                    seconds / (365 * 24 * 60 * 60) 
                ), 
                days: Math.floor( 
                    (seconds % (365 * 24 * 60 * 60)) / 
                        (24 * 60 * 60) 
                ), 
                hours: Math.floor( 
                    (seconds % (24 * 60 * 60)) / (60 * 60) 
                ), 
                minutes: Math.floor( 
                    (seconds % (60 * 60)) / 60 
                ), 
                seconds: seconds % 60, 
            }); 
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
// how is this date format stored? :
// 2023-11-10T15:19:49.960Z
    // console.log(expiryDate)

    return (
        <TimerView>
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
            <View
            style={styles.buttonContainer}
            >
                <Pressable
                style={styles.button}
                onPress={handleStartTimer} 
                >
                    <Text>START</Text>
                </Pressable>
                <Pressable
                style={styles.button}
                onPress={handleResetTimer} 
                >
                    <Text>RESET</Text>
                </Pressable>
            </View>
        <DateTimePickerModal 
                    isVisible={isDatePickerVisible} 
                    display="inline"
                    mode="datetime"
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
        fontSize: 40, 
        fontWeight: "bold", 
        paddingHorizontal: 5, 
        paddingVertical: 5, 
    }, 
    yearUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    dayUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    hourUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`,  
    }, 
    minuteUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
    }, 
    secondUnit: { 
        // backgroundColor: `${colors.darkgreen}`, 
        borderRadius: 15, 
        color: `${colors.darkgreen}`, 
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
        padding:10,
        borderRadius: 50,
        justifyContent: 'center',
        margin:2,
    },
    buttonContainer: {
        width:'40%',
        justifyContent:'center',
        flexDirection: "row", 
        alignItems: "center", 
    }
}); 

export default Countdown;