/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function getIEVersion() {
  const ua = window.navigator.userAgent;
  if (ua.indexOf('Trident/7.0') > 0) return 11;
  else if (ua.indexOf('Trident/6.0') > 0) return 10;
  else if (ua.indexOf('Trident/5.0') > 0) return 9;
  else return 0; // not IE9, 10 or 11
}

function isEdge() {
  try {
    return window.navigator.userAgent.indexOf('Edge') > -1;
  } catch (e) {
    return false;
  }
}

function parseValue(s: string) {
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  try {
    const pluses = /\+/g;
    // Replace server-side written pluses with spaces.
    // If we can't decode the cookie, ignore it, it's unusable.
    // If we can't parse the cookie, ignore it, it's unusable.
    s = decodeURIComponent(s.replace(pluses, ' '));
    return JSON.parse(s);
  } catch (e) {
    e;
  }
}

export default class Browser {
  static isMobile = isMobile;
  static isEdge = isEdge;
  static getIEVersion = getIEVersion;

  static setStorageItem(key: string, value: any) {
    try {
      const valueToSave = Browser.encode(JSON.stringify(value));
      window.localStorage.setItem(Browser.encode(key), valueToSave);
    } catch (e) {
      return;
    }
  }

  static getStorageItem(key: string, defaultValue: any = null): any {
    try {
      let value = window.localStorage.getItem(Browser.encode(key));
      if (value) {
        value = parseValue(Browser.decode(value));
        if (value) return value;
      }

      return defaultValue;
    } catch (e) {
      return null;
    }
  }

  static getStorageBool(key: string, defaultValue = false) {
    defaultValue = defaultValue || false;
    const value = Browser.getStorageItem(key, defaultValue);
    if (value && value != undefined)
      return value === true || value == 'true' || value == '1';
    return false;
  }

  static _getRouteParam($route: any, key: string, defaultValue: any) {
    if ($route) {
      if ($route.params) {
        const value = $route.params[key] || null;
        if (value && value != '') return value;
      }

      if ($route.query) {
        const value = $route.query[key] || null;
        if (value && value != '') return value;
      }

      return Browser.getParam(key, defaultValue);
    }
  }

  static getRouteParam<T>($route: any, key: string, defaultValue: T): T {
    const value = Browser._getRouteParam($route, key, defaultValue);
    if (value && value != '') {
      if (typeof defaultValue == 'boolean') {
        return ((value == '1' || value == 'true') as any) as T;
      }

      if (typeof defaultValue == 'number') {
        return (parseInt(value, 10) as any) as T;
      }
    }
    return value as T;
  }

  static getRouteParamEscaped(
    $route: any,
    key: string,
    defaultValue: any
  ): string {
    const value = Browser._getRouteParam($route, key, defaultValue);

    if (value && value != defaultValue) return decodeURI(value);

    return value;
  }

  static getBoolRouteParam(
    $route: any,
    key: string,
    defaultValue: boolean
  ): boolean {
    const value = Browser._getRouteParam($route, key, defaultValue);
    return value == 'true' || value == '1';
  }

  static getIntRouteParam(
    $route: any,
    key: string,
    defaultValue: number
  ): number {
    const value = Browser._getRouteParam($route, key, defaultValue);
    return parseInt(value, 10);
  }

  static getParam(key: string, defaultValue: any) {
    try {
      key = key.toLowerCase();

      let queryStr = window.location.search || null;

      // vue router doesn not populate the window.location.search
      if (!queryStr) {
        queryStr = window.location.href || '';
        const idx = queryStr.indexOf('?');
        if (idx == -1) return defaultValue;
        queryStr = queryStr.substr(idx);
      }

      const params = queryStr.replace('?', '');
      let idx = queryStr
        .toLowerCase()
        .replace('?', '')
        .indexOf(key + '=');
      if (idx != -1) {
        idx += key.length + 1;
        let idxEnd = params.indexOf('&', idx);
        if (idxEnd == -1) idxEnd = params.length;
        const value = params.substr(idx, idxEnd - idx);
        if (value && value != '') return value;
      }
    } catch (e) {
      Debug.error('getParam error', e);
    }
    return defaultValue;
  }

  static getParamEscaped(key: string, defaultValue: any = null) {
    const value = Browser.getParam(key, defaultValue);
    if (value && value != defaultValue) {
      return decodeURI(value);
    }
    return value;
  }

  static getBoolParam(key: string, defaultValue = false) {
    try {
      const value = Browser.getParam(key, '');
      if (value == '') return defaultValue;
      return value == 'true' || value == '1';
    } catch (e) {
      Debug.error('getBoolParam error', e);
    }
    return defaultValue;
  }

  static getIntParam(key: string, defaultValue = 0) {
    try {
      const value = Browser.getParam(key, '');
      if (value == '') return defaultValue;
      return parseInt(value, 10);
    } catch (e) {
      Debug.error('getIntParam error', e);
    }
    return defaultValue;
  }

  static openUrl(url: string, target = '_blank') {
    const win = window.open(url, target);
    win.focus();
  }

  static encode(s: string) {
    return encodeURIComponent(s);
  }

  static decode(s: string) {
    return decodeURIComponent(s);
  }
}
