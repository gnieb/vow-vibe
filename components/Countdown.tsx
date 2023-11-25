import { FunctionComponent, useState, useEffect } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { colors } from "./colors";
import styled from 'styled-components/native';
import RegularButton from "./Buttons/RegularButton";
import { useAuth } from "../context/AuthContext";

const TimerView = styled.View`
justify-content: center;
align-items: center;
padding: 10px;
width: 100%;
`
const API_URL = "http://192.168.1.6:5555"

const Countdown:FunctionComponent = () => {

// to create a countdown:
// create useEffect that pulls the time RIGHT NOW. and then subtract that from the WEdding date/time.
// use DateTimePickerModal
    const {user} = useAuth()
    const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false); 
    const [showWedding, setShowWedding] = useState("")
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
            // console.log("expiry time:", expiryTime, "expiryDate:", expiryDate)
            const timeDifference = expiryTime - currentDate;
            // console.log("2023-11-30 19:00:00", new Date("2023-11-30 19:00:00"))

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


    useEffect(() => {
        const getWeddings = async () => {
            try {
                const result = await fetch(`${API_URL}/users/${user?.id}`)
                const data = await result.json()
                setExpiryDate(new Date(data.wedding.wedding_date))
            } catch (e) {
                console.log("Countdown error during request for user info", "e:", e)
                return {error: true, msg:(e as any).response.data.msg}
            }
            
            
        }
        getWeddings()
    }, [])

    // console.log(showWedding)

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
    // 2024-09-13T22:00:00.000Z

    // TEST:
    // set for same day, 1 hour away from right now. 
    // countdown should be 60 minutes / 59 minutes, and sconds away
    // console.log(expiryDate)
    // Tests showed 58 minutes and counting down seconds. test successful. 

    // user.weddings[0] == September 13, 2024 18:00:00. 
    // countdown should be something close to this: 
    // 302 days, __ hours, __minutes <=59

    // Test successful!!



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

            {/* <View style={styles.timer}>
                <Text style={[ 
                            styles.timeDescript 
                        ]} >YEARS</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeDescript 
                        ]} >DAYS</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeDescript 
                        ]} >HOURS</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeDescript 
                        ]} >MINUTES</Text>
                <Text style={styles.timeSeparator} ></Text> 
                <Text style={[ 
                            styles.timeDescript
                        ]}>SECONDS</Text>
            </View> */}
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