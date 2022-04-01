/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import Util from "@/utility";

interface AppInsightsApi {
  trackEvent(name: any): void;
  trackPageView(data: any): void;
  trackPageViewPerformance(data: any): void;
  trackException(data: any): void;
  trackTrace(data: any): void;
  trackMetric(data: any): void;
  trackDependencyData(data: any): void;
  startTrackPage(data: any): void;
  stopTrackPage(data: any): void;
  startTrackEvent(data: any): void;
  stopTrackEvent(data: any): void;
  flush(): void;
}

export class AppInsightsService {
  appInsights: AppInsightsApi = null;
  name: string = window.localStorage.getItem("app-insights-name");
  email: string = window.localStorage.getItem("app-insights-email");

  setVueInstance(appInsights: AppInsightsApi) {
    this.appInsights = appInsights;
  }

  setName(value: string) {
    this.name = value;
    window.localStorage.setItem("app-insights-name", value);
  }

  setEmail(value: string) {
    this.email = value;
    window.localStorage.setItem("app-insights-email", value);
  }

  get userInfo() {
    return {
      name: Util.obsfucateEmail(this.email),
      email: Util.obsfucateName(this.name),
    };
  }

  trackPageView(name: string) {
    this.appInsights.trackPageView({
      name: name,
      properties: { user: this.userInfo },
    });
  }

  trackEvent(name: string, data: any) {
    try {
      data = data || {};
      data.user = this.userInfo;

      this.appInsights.trackEvent({ name: name, properties: data });
    } catch (err) {
      Debug.error(`trackEvent failed for ${name} ${data}`);
    }
  }

  trackException(name: string, data: any) {
    try {
      data = data || {};
      data.user = this.userInfo;

      this.appInsights.trackEvent({ name: name, properties: data });
    } catch (err) {
      Debug.error(`trackException failed for ${name} ${data}`);
    }
  }
}

export const $appInsightsService = new AppInsightsService();

Debug.setDebugModule("appInsightsService", $appInsightsService);
