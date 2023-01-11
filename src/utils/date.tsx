import dayjs from "dayjs";
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isYesterday);
dayjs.extend(isToday);

export const quickDateFormat = (date: string) => dayjs(new Date(date)).format('YYYY-MM-DD');

export const timePeriod = (date: Date) => {

    if (dayjs(date).isYesterday()) {
        return "Yesterday";
    }
    if (dayjs(date).isToday()) {
        return "Today";
    }

    if (date.getFullYear() !== new Date().getFullYear()) {
        return dayjs(date).format(`MMM-DD-YYYY`)
    }

    return dayjs(date).format(`DD-MMM`)

}

export const safariDateFix = (weirdDateFormat: string) => {

    if (!weirdDateFormat) return "";

    // weirdDateFormat is identical to 2022-01-21 02:53:47.505+01 

    // and is not parsable in safari as at 2022 - 01

    try {

        const year = Number(weirdDateFormat.substring(0, 4));

        const month = Number(weirdDateFormat.substring(5, 7)) - 1;

        const day = Number(weirdDateFormat.substring(8, 10));

        const hour = Number(weirdDateFormat.substring(11, 13));

        const minute = Number(weirdDateFormat.substring(14, 16));

        const second = Number(weirdDateFormat.substring(17, 19));

        return new Date(year, month, day, hour, minute, second).toISOString();

    } catch {

        return weirdDateFormat;

    }

}

export const dateDifference = (date1: Date, date2: Date) => {

    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    return ({
        day: daysDifference, hour: hoursDifference, minutes: minutesDifference, seconds: secondsDifference
    });

}

export const DD_MM_YY_HH_mm_a = (date_: string) => dayjs(new Date(safariDateFix(date_))).format("MMM DD, YYYY HH:mm A")

export const timeIntervalGenerator = (start: number, separator: number) => {

    let toAppend = [];

    try {

        if (start > 23 || separator > 60) {

            throw Error;

        }

        for (var i = start; i < 24; i++) {

            let hour;

            let period = i < 12 ? "AM" : "PM";

            i < 10 ? (hour = `0${i}`) : (hour = `${i}`);

            for (var j = 0; j < 60; j = j + separator) {

                let minute = j;

                if (minute < 60) {

                    if (minute < 10) {

                        let min = `0${minute}`;

                        toAppend.push({ label: `${hour} : ${min} ${period}`, hour, minute : min, period })

                    } else {

                        toAppend.push({ label: `${hour} : ${minute} ${period}`, hour, minute, period });

                    }

                }
            }
        }

        return toAppend;
    } catch (err) {
        return [{ label: `00 : 00`, hour: 0, minute: 0, period: "AM" }];
    }
};

export const addTimeToDate = (h: string | number, m: string | number, date: string) => {

    try {

        // Format that works on BackEnd ---  new Date("2022-06-03T10:17:11") --- , apparently

        const newTime = dayjs(new Date(date)).format("YYYY-MM-DD") + `T${h}:${m}:00`;

        return newTime;

    } catch (e: any) {

        return undefined;

    }

}
