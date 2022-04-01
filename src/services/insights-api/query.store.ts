import Vue from "vue";
import { $insightsApiService } from "./insights-api.service";
import { QueryDto } from "./models/query.model";

export interface QueryModel extends QueryDto {
  className: string;
}

interface QueryState {
  queryList: QueryModel[];
}

class QueryStore {
  private state = Vue.observable<QueryState>({
    queryList: [],
  });

  get queryList() {
    return this.state.queryList;
  }

  constructor() {
    this.load();
  }

  private async load() {
    const query = await $insightsApiService.query();
    const queryList = query.map((query) => {
      const model: QueryModel = <QueryModel>query;
      model.className = this.getClassName(model.name);
      return model;
    });

    this.state.queryList.splice(0, this.queryList.length, ...queryList);
  }

  private getClassName(query: string) {
    return "query-" + query.replace(" ", "-").toLocaleLowerCase();
  }
}

export const $queryStore = new QueryStore();
Debug.setDebugModule("queryStore", $queryStore);
