/*eslint @typescript-eslint/no-empty-function: ["off"]*/
/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

function encode(s: string) {
  return encodeURIComponent(s);
}

function decode(s: string) {
  return decodeURIComponent(s);
}

function parseValue(s: string) {
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }

  try {
    const pluses = /\+/g;
    // Replace server-side written pluses with spaces.
    // If we can't decode the cookie, ignore it, it's unusable.
    // If we can't parse the cookie, ignore it, it's unusable.
    s = decodeURIComponent(s.replace(pluses, " "));
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
}

export default class LocalData {
  public static SigninKey = "signin";

  static save(key: string, value: any) {
    try {
      const valueToSave = encode(JSON.stringify(value));
      window.localStorage.setItem(encode(key), valueToSave);
      //console.log('LocalData.save', encode(key), window.localStorage.getItem(encode(key)));
    } catch (e) {
      return;
    }
  }

  static saveString(key: string, value: any) {
    try {
      const valueToSave = encode(value);
      window.localStorage.setItem(encode(key), valueToSave);
      //console.log('LocalData.save', encode(key), window.localStorage.getItem(encode(key)));
    } catch (e) {
      return;
    }
  }

  static get(key: string, defaultValue: any = null): any {
    try {
      let value = window.localStorage.getItem(encode(key));
      //console.log('LocalData.get', encode(key), value, parseValue(decode(value)));
      if (value) {
        value = parseValue(decode(value));
        if (value && value != "null") return value;
      }

      return defaultValue;
    } catch (e) {
      return null;
    }
  }

  static getString(key: string, defaultValue: string = null): string {
    try {
      let value = window.localStorage.getItem(encode(key));
      //console.log('LocalData.get', encode(key), value, parseValue(decode(value)));
      if (value) {
        value = decode(value);
        if (value && value != "null") return value;
      }

      return defaultValue;
    } catch (e) {
      return null;
    }
  }

  static getInt(key: string, defaultValue = 0) {
    defaultValue = defaultValue || 0;
    const value = LocalData.get(key, defaultValue);
    if (value && value != undefined) {
      try {
        return parseInt(parseValue(decode(value))) || defaultValue;
      } catch (err) {
        return defaultValue;
      }
    }
    return defaultValue;
  }

  static getBool(key: string, defaultValue = false) {
    defaultValue = defaultValue || false;
    const value = LocalData.get(key, defaultValue);
    if (value && value != undefined)
      return value === true || value == "true" || value == "1";
    return false;
  }

  static remove(key: string) {
    window.localStorage.removeItem(encode(key));
  }
}

if (Debug.debugMode) {
  Debug.setDebugModule("localData", LocalData);
}
