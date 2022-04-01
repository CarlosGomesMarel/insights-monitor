export default class Util {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parseInt(value: any) {
    if (value == null || value == undefined) return 0;

    if (typeof value != "string") return value;

    try {
      const number = parseInt(value);

      return !isNaN(number) && isFinite(number) ? number : 0;
    } catch {
      return 0;
    }
  }

  static toFixed(value: number, digits: number) {
    const str = value.toFixed(digits);
    return str
      .replace(/0*([1-9]\d*\.[1-9]*)(0+)$/g, "$1")
      .replace(/(\d+)\.$/g, "$1");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parseFloat(value: any, fixed = -1) {
    if (value == null || value == undefined) return 0;

    if (typeof value != "string") return value;

    try {
      const number = parseFloat(value);
      const result = !isNaN(number) && isFinite(number) ? number : 0;
      if (fixed != -1) {
        return parseFloat(Util.toFixed(result, fixed));
      }
      return number;
    } catch {
      return 0;
    }
  }

  static capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static stringCompare(left: string, right: string) {
    if (left && right) {
      return 0 == left.localeCompare(right, "en", { sensitivity: "base" });
    }

    if (!left && !right) return true;

    return false;
  }

  static isValidDateTime(value: string) {
    return (
      value &&
      value.match(/\d\d?\/\d\d?\/\d\d\d\d \d\d?:\d\d (AM|PM)/gi) != null
    );
  }

  static formatNumberWithCommas(value: number) {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];
  }

  static createPromise<T>(
    callback: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: unknown) => void
    ) => void
  ) {
    return new Promise<T>((resolve, reject) => {
      callback(resolve, reject);
    });
  }

  static failedPromise<T>(data: T) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<T>((resolve, reject) => {
      reject(data);
    });
  }

  static successPromise<T>(data: T) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<T>((resolve, reject) => {
      resolve(data);
    });
  }

  static expiredPromise() {
    return Util.failedPromise("expired");
  }

  static getRandomInt(max = 4294967295) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static getRandomBool() {
    return Util.getRandomInt(100) >= 50;
  }

  static randomString(length = 10) {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, length);
  }

  /**
   * Returns fixed decimal string striping trailing .0
   */
  static toFixedString(value: number) {
    if (typeof value != "number") return value;

    let fixedValue = value.toFixed(2);
    if (fixedValue.endsWith(".00")) {
      fixedValue = Math.floor(value).toString();
    }

    return fixedValue;
  }

  static obsfucateEmail(value: string) {
    if (!value) return value;

    const results: string[] = [];

    const parts = value.split("@");
    parts[0].split(".").forEach((part) => {
      const obsfucated = Util.obsfucatePart(part);
      results.push(obsfucated);
    });

    const prefix = results.join(".");

    return prefix + parts[1];
  }

  static obsfucateName(value: string) {
    if (!value) return value;

    const results: string[] = [];
    const parts = value.split(" ");

    parts.forEach((part) => {
      const obsfucated = Util.obsfucatePart(part);
      results.push(obsfucated);
    });

    return results.join(" ");
  }

  /**
   * Returns local date time string format - 2020-09-17 02:22:00.000
   */
  static getDateTimeString(date: Date, includeMilliseconds = false) {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    let result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    if (includeMilliseconds) {
      const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
      result += `.${milliseconds}`;
    }

    return result;
  }

  static trim(value: string) {
    if (value) {
      if (!value.trim) return value;

      return value
        .trim()
        .replace(/([ \t\r\n]+$)/g, "")
        .replace(/^([ \t\r\n]+)/g, "");
    }
    return null;
  }

  private static obsfucatePart(value: string) {
    if (!value) return value;

    const length = Math.max(1, Math.max(value.length / 2, 1));
    const prefix = value.substr(0, length);
    const suffix = "*".repeat(value.length - length);

    return prefix + suffix;
  }
}

Debug.setDebugModule("Util", Util);
