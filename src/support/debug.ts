/*eslint @typescript-eslint/no-empty-function: ["off"]*/
/*eslint @typescript-eslint/no-explicit-any: ["off"]*/
/*eslint no-console: "off"*/

Debug.debugMode = process.env.NODE_ENV !== 'production';
Debug.verboseMode = process.env.VUE_APP_API_VERBOSE_MODE == '1';

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default class DebugModule {
  static initialized = false;

  static ensureCalled() {}

  static initializeDebug() {
    if (!Debug.debugMode || false) return;

    if (console && console.log) {
      try {
        Debug.log = console.log.bind(window.console);
      } catch (err) {
        Debug.log = console.log;
      }
      try {
        Debug.log('Debug Mode');
      } catch (err) {
        Debug.log = () => {};
      }

      try {
        Debug.debug = console.debug.bind(window.console);
      } catch (err) {
        Debug.debug = console.debug;
      }

      if (!Debug.debug) Debug.debug = Debug.log;
    }

    if (console && console.error) {
      try {
        Debug.error = console.error.bind(window.console);
      } catch (err) {
        Debug.error = console.error;
      }
      try {
        // Debug.error("");
      } catch (err) {
        Debug.error = () => {};
      }
    }
    if (Debug.log) {
      Debug.dumpCallStack = () => {
        const stack = new Error().stack;
        Debug.log('PRINTING CALL STACK');
        Debug.log(stack);
      };
    }

    if (!Debug.log) Debug.log = () => {};
    if (!Debug.error) Debug.error = () => {};
    if (!Debug.dumpCallStack) Debug.dumpCallStack = () => {};

    Debug.verbose = Debug.verboseMode ? Debug.log : () => {};

    Debug.setVue = function (vue: Vue) {
      const windowObj = window as any;
      windowObj['g_Vue'] = vue;
    };

    Debug.setDebugModule = function (key, value, item) {
      const windowObj = window as any;

      let name = key;
      value = value || null;

      const parts = key.replace(/([^a-z0-9-]+)/gi, '').split('-');
      const capitalized = parts.map((item) => capitalize(item)).join('');

      if (item) {
        name = 'g_' + capitalized;
        if (!windowObj[name]) windowObj[name] = {};

        windowObj[name][item] = value;
        return;
      }

      switch (key.toLowerCase()) {
        case 'app':
          name = 'g_App';
          break;
        case 'serverdata':
          name = 'g_ServerData';
          break;
        case 'wizard':
          name = 'g_Wizard';
          break;
        default:
          name = 'g_' + capitalized;
          break;
      }

      windowObj[name] = value;
      //Debug.log('setDebugModule', name, value);
    };
  }
}

if (!DebugModule.initialized) {
  DebugModule.initialized = true;
  DebugModule.initializeDebug();
}
