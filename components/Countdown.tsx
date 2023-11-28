import { FunctionComponent, useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { colors } from "./colors";
import styled from 'styled-components/native';
import { useAuth } from "../context/AuthContext";

const TimerView = styled.View`
justify-content: center;
align-items: center;
padding: 10px;
width: 100%;
`

const Countdown:FunctionComponent = () => {
    const {user} = useAuth()
    
    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false); 
    const [showWedding, setShowWedding] = useState("")
    const [expiryDate, setExpiryDate] = useState<Date>(
            user.wedding && user.wedding.wedding_date
            ? new Date(user.wedding.wedding_date)
            : new Date()
         ); 
    const [timeUnits, setTimeUnits] = useState({ 
        years: 0, 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
    }); 

    useEffect(() => {
        // Update expiryDate when the user object changes
        setExpiryDate(new Date(user.wedding.wedding_date));
      }, [user]);

    useEffect(()=> {

        // Debug log to check the initial value of expiryDate
        console.log('Initial Expiry Date:', expiryDate);

        const calculateTimeUnits = (timeDifference:any) => {
        const seconds = Math.floor( timeDifference/1000)

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
            const expiryTime = new Date(expiryDate).getTime();
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

        // Debug logs to check if the user object and expiryDate are changing
        // console.log('User Object:', user);
        // console.log('Expiry Date:', expiryDate);

        return () => clearInterval(interval); 

    }, [expiryDate])

    const formatTime = (time:any) => { 
        return time.toString().padStart(2, "0"); 
    }; 

    // padStart() => The padStart() method of String values pads this string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of this string.

    return (
        <TimerView>
            <View style={styles.timer}>
                <View>
                    <Text style={[ 
                            styles.timeUnit, 
                            styles.yearUnit, 
                        ]} >{formatTime(timeUnits.years)}</Text>
                <Text style={[ 
                            styles.timeDescript 
                        ]} >YEARS</Text>
                </View>
                
                <Text style={styles.timeSeparator} ></Text> 
                <View>
                    <Text style={[ 
                            styles.timeUnit, 
                            styles.dayUnit, 
                        ]} >{formatTime(timeUnits.days)}</Text>
                    <Text style={[ 
                        styles.timeDescript 
                    ]} >DAYS</Text>
                </View>
                <Text style={styles.timeSeparator} ></Text>
                <View>
                    <Text style={[ 
                            styles.timeUnit, 
                            styles.hourUnit, 
                        ]} >{formatTime(timeUnits.hours)}</Text>
                    <Text style={[ 
                            styles.timeDescript 
                        ]} >HOURS</Text>   
                </View>
                <Text style={styles.timeSeparator} ></Text> 

                <View>
                    <Text style={[ 
                            styles.timeUnit, 
                            styles.minuteUnit, 
                        ]} >{formatTime(timeUnits.minutes)}</Text>
                    <Text style={[ 
                            styles.timeDescript 
                        ]} >MINUTES</Text>
                </View>       
                    <Text style={styles.timeSeparator} ></Text> 
                <View>
                    <Text style={[ 
                            styles.timeUnit, 
                            styles.secondUnit, 
                        ]}>{formatTime(timeUnits.seconds)}</Text>
                    <Text style={[ 
                            styles.timeDescript
                        ]}>SECONDS</Text>
                </View>
            </View>
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
    timeMeasurements: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeUnit: { 
        fontSize: 40, 
        fontWeight: "bold", 
        paddingHorizontal: 5, 
        paddingVertical: 5, 
    }, 
    timeDescript: {
        fontSize: 10,
        fontWeight: "bold",
        paddingHorizontal: 5
        // borderRadius: 15,
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