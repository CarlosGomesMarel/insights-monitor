import { EventBus } from '@/support/event-bus';

const ApiKeyNames = {
  AzureTimeTracker: 'ApiKey-7Pace',
  AzureDevOps: 'ApiKey-AzureDevOps',
};

export default class ApiKey {
  static getAzureTimeTrackerApiKey() {
    //if (window.localStorage) return null;

    return window.localStorage.getItem(ApiKeyNames.AzureTimeTracker);
  }

  static saveAzureTimeTrackerApiKey(value: string) {
    window.localStorage.setItem(ApiKeyNames.AzureTimeTracker, value);
    EventBus.Instance.$emit(EventBus.TimeApiKeyChanged, value);
  }

  static getAzureDevOpsApiKey() {
    //if (window.localStorage) return null;

    return window.localStorage.getItem(ApiKeyNames.AzureDevOps);
  }

  static saveAzureDevOpsApiKey(value: string) {
    window.localStorage.setItem(ApiKeyNames.AzureDevOps, value);
    EventBus.Instance.$emit(EventBus.UserStoryApiKeyChanged, value);
  }
}

Debug.setDebugModule('apiKey', ApiKey);
