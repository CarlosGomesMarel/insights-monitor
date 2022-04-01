import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Date {
    is(): any;
    setMilliseconds(arg0: number): void;
    setSeconds(arg0: number): void;
    setMinutes(arg0: number): void;
    setHours(arg0: number): void;
    toStringEx: (value?: string) => string;
    add: (value?: number) => any;
    getWeek(): number;
    setWeek(value: number): Date;
  }
}
