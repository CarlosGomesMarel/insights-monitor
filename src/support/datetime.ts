/* eslint-disable @typescript-eslint/no-explicit-any */
import Util from "../utility";
import moment from "moment";

const DebugNonStandarDates = false;

export class Moment {
  static get(dateTime: string) {
    if (!dateTime) return null;

    if (dateTime == "Invalid date") {
      Debug.error("Moment.get", dateTime);
      return null;
    }

    if (dateTime.replace && dateTime.indexOf) {
      const idx = dateTime.indexOf("T");
      if (idx != -1 || Moment.isISODateFormat(dateTime))
        return moment(dateTime);

      let pattern = Moment.getMomentTimePattern(dateTime);
      if (pattern) {
        if (DebugNonStandarDates)
          Debug.error("datetime non ISO time", dateTime, pattern);

        const mom = moment(dateTime, pattern);
        if (mom.isValid()) return mom;
      }

      pattern = Moment.getMomentPattern(dateTime);
      if (pattern) {
        if (DebugNonStandarDates)
          Debug.error("datetime non ISO", dateTime, pattern);

        const mom = moment(dateTime, pattern);
        if (mom.isValid()) return mom;
      }
    }

    const result = moment(dateTime);
    if (!result.isValid) {
      Debug.error("Moment.get", dateTime);
      return null;
    }

    return result;
  }

  static fromUtc(dateTime: string) {
    const value = Util.trim(dateTime).replace
      ? dateTime.replace("T", " ")
      : dateTime;
    return moment.utc(value);
  }

  static getTime(time: string) {
    return moment(Util.trim(time), "HH:mm A");
  }

  static getDate(dateTime: moment.Moment) {
    return dateTime.startOf("day");
  }

  static getMonth(dateTime: moment.Moment) {
    return dateTime.startOf("month");
  }

  static getStartOfWeek(dateTime: moment.Moment) {
    return dateTime.startOf("week");
  }

  static getEndOfWeek(dateTime: moment.Moment) {
    return dateTime.startOf("week");
  }

  static add(dateTime: moment.Moment, amount = 0, interval = "days") {
    return dateTime.add(<any>amount, interval);
  }

  static toISODateTimeString(dateTime: moment.Moment) {
    return dateTime.toISOString();
  }

  static toISOString(dateTime: moment.Moment) {
    return dateTime.toISOString();
  }

  static toDateTimeString(dateTime: moment.Moment) {
    return dateTime.format("MM/DD/YYYY hh:mm a");
  }

  static toSqlDateTimeString24(dateTime: moment.Moment) {
    return dateTime.format("YYYY-MM-DD HH:mm");
  }

  static toDateString(dateTime: moment.Moment) {
    return dateTime.format("MM/DD/YYYY");
  }

  static toShortDateString(dateTime: moment.Moment) {
    return dateTime.format("MM/DD");
  }

  static toISODateString(dateTime: moment.Moment) {
    return dateTime.format("YYYY-MM-DD");
  }

  static toTimeString(dateTime: moment.Moment) {
    return dateTime.format("hh:mm a");
  }

  static toTimeString24(dateTime: moment.Moment) {
    return dateTime.format("kk:mm");
  }

  static toShortTimeString(dateTime: moment.Moment) {
    return dateTime.format("hh:mm");
  }

  static toMonthYear(dateTime: moment.Moment) {
    return dateTime.format("MMM YYYY");
  }

  static duration(startDateTime: string, endDateTime: string) {
    const start = Moment.get(startDateTime);
    const end = Moment.get(endDateTime);

    return moment.duration(end.diff(start));
  }

  private static isISODateFormat(value: string) {
    const match = value.match(/^\d\d\d\d[-]\d\d?[-]\d\d?$/);
    if (match) {
      return true;
    }

    return false;
  }

  private static getMomentPattern(value: string) {
    let match = value.match(/^\d\d?([\\/-])\d\d?([\\/-])\d\d\d\d$/);
    if (match) {
      return "MM DD YYYY";
    }

    match = value.match(/^\d\d\d\d([\\/-])\d\d?([\\/-])\d\d?$/);
    if (match) {
      return "YYYY MM DD";
    }

    match = value.match(
      /^\d\d?([\\/-])\d\d?([\\/-])\d\d\d\d \d\d?:\d\d? [ap]m$/i
    );
    if (match) {
      return "MM" + match[1] + "DD" + match[2] + "YYYY hh:mm a";
    }

    match = value.match(
      /^\d\d\d\d([\\/-])\d\d?([\\/-])\d\d? \d\d?:\d\d? [ap]m$/i
    );
    if (match) {
      return "YYYY" + match[1] + "MM" + match[2] + "DD hh:mm a";
    }

    match = value.match(/^\d\d?([\\/-])\d\d?([\\/-])\d\d\d\d \d\d?:\d\d?$/);
    if (match) {
      return "MM" + match[1] + "DD" + match[2] + "YYYY HH:mm";
    }

    match = value.match(/^\d\d\d\d([\\/-])\d\d?([\\/-])\d\d? \d\d?:\d\d?$/);
    if (match) {
      return "YYYY" + match[1] + "MM" + match[2] + "DD HH:mm";
    }

    match = value.match(/^\d\d?:\d\d? [ap]m$/i);
    if (match) {
      return "hh:mm a";
    }

    match = value.match(/^\d\d?:\d\d?$/);
    if (match) {
      return "HH:mm";
    }

    return null;
  }

  private static getMomentTimePattern(value: string) {
    let match = value.match(/^\d\d?:\d\d? [ap]m$/i);
    if (match) {
      return "hh:mm a";
    }

    match = value.match(/^\d\d?:\d\d?$/);
    if (match) {
      return "HH:mm";
    }

    return null;
  }
}

export class DateTime {
  static addDays(dateTime: string, amount: number) {
    if (!dateTime) return null;

    const mom = Moment.get(Util.trim(dateTime));
    return Moment.toISODateTimeString(Moment.add(mom, amount, "days"));
  }

  static addHours(dateTime: string, amount: number) {
    if (!dateTime) return null;

    const mom = Moment.get(Util.trim(dateTime));
    return Moment.toISODateTimeString(Moment.add(mom, amount, "hours"));
  }

  static addMinutes(dateTime: string, amount: number) {
    if (!dateTime) return null;

    const mom = Moment.get(Util.trim(dateTime));
    return Moment.toISODateTimeString(Moment.add(mom, amount, "minutes"));
  }

  static addMonths(dateTime: string, amount: number) {
    if (!dateTime) return null;

    const mom = Moment.get(Util.trim(dateTime));
    return Moment.toISODateTimeString(Moment.add(mom, amount, "months"));
  }

  static now() {
    return Moment.toISODateTimeString(moment(new Date()));
  }

  static nowDate() {
    return DateTime.toISODateString(DateTime.now());
  }

  static today() {
    return Moment.toISODateTimeString(Moment.getDate(moment(new Date())));
  }

  static todayDate() {
    return DateTime.toISODateString(DateTime.today());
  }

  static tomorow() {
    return DateTime.toISODateTimeString(DateTime.addDays(DateTime.today(), 1));
  }

  static tomorowDate() {
    return DateTime.toISODateString(DateTime.tomorow());
  }

  static diffDays(startDateTime: string, endDateTime: string) {
    const duration = Moment.duration(
      Util.trim(startDateTime),
      Util.trim(endDateTime)
    );
    return duration.as("days");
  }

  static toMinutes(number: number, interval: string) {
    const start = Moment.get(DateTime.today());
    const end = Moment.get(DateTime.today());

    end.add(<any>number, interval);

    const duration = moment.duration(end.diff(start));
    return duration.asMinutes();
  }

  static fromMinutes(number: number, interval: string) {
    const start = Moment.get(DateTime.today());
    const end = Moment.get(DateTime.today());

    end.add(<any>number, "minutes");

    const duration = moment.duration(end.diff(start));
    return duration.as(<any>interval);
  }

  static toDateTimeString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toDateTimeString(Moment.get(dateTime));
  }

  static toSqlDateTimeString24(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toSqlDateTimeString24(Moment.get(dateTime));
  }

  static toDateString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toDateString(Moment.get(dateTime));
  }

  static toShortDateString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toShortDateString(Moment.get(dateTime));
  }

  static toISODateString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toISODateString(Moment.get(dateTime));
  }

  static toISODateTimeString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toISODateTimeString(Moment.get(dateTime));
  }

  static toISOString(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toISODateTimeString(Moment.get(dateTime));
  }

  static toLocalDateTime(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toISODateTimeString(Moment.fromUtc(dateTime).local());
  }

  static toServerDateTime(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toISODateTimeString(Moment.get(dateTime).utc());
  }

  static toTimeString(dateTime: any) {
    if (!dateTime) return null;

    let momTime = Moment.get(dateTime);
    if (!momTime.isValid()) momTime = Moment.getTime(dateTime);
    if (!momTime.isValid()) return null;

    return Moment.toTimeString(momTime);
  }

  static toShortTimeString(dateTime: any) {
    if (!dateTime) return null;

    let momTime = Moment.get(dateTime);
    if (!momTime.isValid()) momTime = Moment.getTime(dateTime);
    if (!momTime.isValid()) return null;

    return Moment.toShortTimeString(momTime);
  }

  static toTime24(dateTime: any) {
    if (!dateTime) return null;

    let momTime = Moment.get(dateTime);
    if (!momTime.isValid()) momTime = Moment.getTime(dateTime);
    if (!momTime.isValid()) return null;

    return Moment.toTimeString24(momTime);
  }

  static toMonthYear(dateTime: any) {
    if (!dateTime) return null;

    return Moment.toMonthYear(Moment.get(dateTime));
  }

  static toTimeStamp() {
    return DateTime.toTimeString(new Date());
  }

  static toStartOfWeek(dateTime: any) {
    const mom = Moment.getStartOfWeek(Moment.get(dateTime));
    return Moment.toISODateTimeString(mom);
  }

  static toEndOfWeek(dateTime: any) {
    const mom = Moment.getEndOfWeek(Moment.get(dateTime));
    return Moment.toISODateTimeString(mom);
  }

  static toStartOfWeekDate(dateTime: any) {
    const mom = Moment.getStartOfWeek(Moment.get(dateTime));
    return Moment.toISODateString(mom);
  }

  static toEndOfWeekDate(dateTime: any) {
    const mom = Moment.getEndOfWeek(Moment.get(dateTime));
    return Moment.toISODateString(mom);
  }

  static toDays(startDateTime: string, endDateTime: string) {
    const start = Moment.get(startDateTime);
    const end = Moment.get(endDateTime);

    const days = [];

    for (; start.isSameOrBefore(end); start.add(1, "days")) {
      const date = Moment.toISODateString(start);
      days.push(date);
    }

    return days;
  }

  static splitDateTime(dateTime: string) {
    if (!dateTime) return null;

    const day = Moment.getDate(Moment.get(dateTime));
    const time = Moment.toTimeString(Moment.get(dateTime));

    return {
      date: Moment.toISODateTimeString(day),
      time: time,
    };
  }

  static combineDateAndTime(date: string, time: string) {
    const dtDate = DateTime.toISODateString(date);
    const dtTime = DateTime.toTimeString(time);
    if (!dtDate || !dtTime) return null;

    if (DebugNonStandarDates) Debug.error(dtDate + " " + dtTime);

    return DateTime.toISODateTimeString(dtDate + " " + dtTime);
  }

  static combineDateAndTimeUtc(date: string, time: string) {
    if (!date) return null;

    return Moment.toISODateTimeString(
      Moment.get(DateTime.combineDateAndTime(date, time)).utc()
    );
  }
}

if (Debug.debugMode) {
  (<any>window).DateTime = DateTime;
  (<any>window).Moment = Moment;
  (<any>window).moment = moment;
}
