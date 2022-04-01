import Vue from "vue";
import { StatusDto } from ".";
import { $insightsApiService } from "./insights-api.service";

export interface StatusModel extends StatusDto {
  className: string;
}

interface StatusState {
  statusList: StatusModel[];
}

class StatusStore {
  private state = Vue.observable<StatusState>({
    statusList: [],
  });

  get statusList() {
    return this.state.statusList;
  }

  get newStatus() {
    return this.state.statusList.find((item) => item.name == "New");
  }

  get investigatedStatus() {
    return this.state.statusList.find((item) => item.name == "Investigated");
  }

  constructor() {
    this.load();
  }

  private async load() {
    const status = await $insightsApiService.status();
    const statusList = status.map((status) => {
      const model: StatusModel = <StatusModel>status;
      model.className = this.getClassName(model.name);
      return model;
    });

    this.state.statusList.splice(0, this.statusList.length, ...statusList);
  }

  private getClassName(status: string) {
    return "status-" + status.replace(" ", "-").toLocaleLowerCase();
  }
}

export const $statusStore = new StatusStore();
Debug.setDebugModule("statusStore", $statusStore);
