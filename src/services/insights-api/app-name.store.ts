import Vue from "vue";
import { AppNameDto } from ".";
import { $insightsApiService } from "./insights-api.service";

interface AppNameState {
  appNamesList: AppNameDto[];
}

class AppNameStore {
  private state = Vue.observable<AppNameState>({
    appNamesList: [],
  });

  get appNamesList() {
    return this.state.appNamesList;
  }

  constructor() {
    this.load();
  }

  private async load() {
    const appNameList = await $insightsApiService.appNames();
    this.state.appNamesList.splice(0, this.appNamesList.length, ...appNameList);
  }
}

export const $appNamesStore = new AppNameStore();
Debug.setDebugModule("appNamesStore", $appNamesStore);
