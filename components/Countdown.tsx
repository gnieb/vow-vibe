import { FunctionComponent, useState, useEffect } from "react";
import { Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
        <View>
        <Text>0</Text>
        <Text>DAYS UNTIL THE BIG DAY</Text>
        </View>
    )
}

export default Countdown;