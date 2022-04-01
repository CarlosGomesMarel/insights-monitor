/* eslint-disable @typescript-eslint/ban-types */
/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

interface ObjectConstructor {
  assign(target: any, source: any): any;
  assign<T>(target: any, source: T): T;
}

interface Modal extends Vue {
  show(name?: string): void;
  hide(name?: string): void;
}

interface DebugModule {
  debugMode: boolean;
  verboseMode: boolean;
  log: Function;
  verbose: Function;
  debug: Function;
  error: Function;
  dumpCallStack: Function;
  setVue: (vue: Vue) => void;
  setDebugModule: (key: string, value: any, item?: number) => void;
}

declare let Debug: DebugModule;

declare module "element-ui/lib/locale/lang/en";
declare module "vue-select";
