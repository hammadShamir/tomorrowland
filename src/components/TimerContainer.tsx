import React from 'react'
import { NumberBox } from './NumberBox'

interface timeProps {
    days: number | string,
    hours: number | string,
    minutes: number | string,
    seconds: number | string,
}

export const TimerContainer = ({ days, hours, minutes, seconds }: timeProps) => {

    let daysFlip = false;
    let hoursFlip = false;
    let minutesFlip = false;
    let secondsFlip = true;

    if (Number(seconds) <= 0 && Number(minutes) <= 0 && Number(hours) <= 0 && Number(days) <= 0) {
        daysFlip = false;
        hoursFlip = false;
        minutesFlip = false;
        secondsFlip = false;
    }


    if (seconds == 0) {
        if (minutes != 0) {
            seconds = 59;
        }

        secondsFlip = false;
        minutesFlip = true;
    }
    if (minutes == 0) {
        if (hours != 0) {
            minutes = 59;
        }

        minutesFlip = false;
        hoursFlip = true;
    }

    if (hours == 0) {
        hoursFlip = false;
        if (days != 0) {
            daysFlip = true;
        }

    }



    if (Number(days) < 10) {
        days = "0" + days
    }

    if (Number(hours) < 10) {
        hours = "0" + hours
    }

    if (Number(minutes) < 10) {
        minutes = "0" + minutes
    }

    if (Number(seconds) < 10) {
        seconds = "0" + seconds

    }

    return (

        <div className="rounded-xl">
            <div className="w-52 mx-auto md:w-full grid grid-cols-2 md:flex md:items-center md:justify-center md:gap-x-2 gap-y-2">
                <NumberBox num={days} unit="Days" flip={daysFlip} />
                <span className=" hidden text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white ">:</span>
                <NumberBox num={hours} unit="Hours" flip={hoursFlip} />
                <span className="hidden text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white">:</span>
                <NumberBox num={minutes} unit="Minutes" flip={minutesFlip} />
                <span className="hidden text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white">:</span>
                <NumberBox num={seconds} unit="Seconds" flip={secondsFlip} />
            </div>

        </div>
    )
}