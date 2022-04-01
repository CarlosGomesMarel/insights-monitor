/* eslint-disable @typescript-eslint/no-inferrable-types */
/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import { Env } from "@/support/environment";
import { AzureUserStory } from "./models";
import { $appInsightsService } from "../app-insights/app-insights.service";

const Api = {
  version: "5.1",
  userStory: "_apis/wit/workitems",
  workItems: "_apis/wit/workitems",
  workItemTypes: "_apis/wit/workitemtypes",
  host: `https://dev.azure.com/${Env.VUE_APP_API_ORGANIZATION}/${Env.VUE_APP_API_PROJECT}`,
};

export enum WorkItemType {
  bug = "$Bug",
  task = "$Task",
  userStory = "$UserStory",
}

export enum WorkItemField {
  areaPath = "System.AreaPath",
  assignedTo = "System.AssignedTo",
  createdBy = "System.CreatedBy",
  description = "System.Description",
  iterationPath = "System.IterationPath",
  parent = "System.Parent",
  reason = "System.Reason",
  state = "System.State",
  title = "System.Title",
  workItemType = "System.WorkItemType",
}

interface FetchOptions {
  method?: string;
  body?: string;
  fields?: string[];
  contentType?: string;
}

export default class AzureDevOps {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  setApiKey(apkiKey: string) {
    this.apiKey = apkiKey;
  }

  async upsertUserStory(
    title: string,
    description: string,
    area: string,
    iterationPath: string,
    workItemId: number = 0
  ) {
    $appInsightsService.trackEvent("upsertUserStory", {
      workItemId: workItemId,
    });

    const body = this.generateUserStoryBody(
      title,
      description,
      area,
      iterationPath
    );

    const url = this.getUpsertUserStoryUrl(workItemId);

    const response = await this.fetchResults(url, {
      method: workItemId ? "PATCH" : "POST",
      body: JSON.stringify(body),
      contentType: "application/json-patch+json",
    });

    return response;
  }

  async getFields(workItemType: WorkItemType) {
    $appInsightsService.trackEvent("getFields", {
      type: workItemType,
    });

    const url = `${Api.workItemTypes}/${workItemType}/fields`;
    const response = await this.fetchResults(url);

    return response;
  }

  async getUserStory(workItemId: number) {
    $appInsightsService.trackEvent("getUserStory", {
      workItemId: workItemId,
    });

    const url = `${Api.userStory}/${workItemId}`;
    const response = await this.fetchUserStory(url, {
      fields: [WorkItemField.title],
    });

    if (response && response.fields && response.fields[WorkItemField.title]) {
      return {
        title: response.fields[WorkItemField.title],
        url: (<any>response?._links)?.html?.href,
      };
    }

    return null;
  }

  private async fetchResults(api: string, options: FetchOptions = {}) {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${btoa(":" + this.apiKey)}`);
    headers.append("Content-Type", options.contentType || "application/json");

    const requestOptions = {
      method: options.method || "GET",
      headers: headers,
      body: options.body,
    };

    let url = `${Api.host}/${api}?api-version=${Api.version}`;

    if (options.fields) {
      const fields = options.fields.join(",");
      url += `&fields=${fields}`;
    }

    try {
      const response = await fetch(url, requestOptions as RequestInit);
      const data = await response.json();
      Debug.verbose(JSON.stringify(data, null, 3));
      return data as any;
    } catch (err) {
      Debug.error("Fetch error", api, err);
      $appInsightsService.trackException(api, { err: err });
      return null;
    }
  }

  private async fetchUserStory(api: string, options: FetchOptions = {}) {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${btoa(":" + this.apiKey)}`);
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: options.method || "GET",
      headers: headers,
      body: options.body,
    };

    let url = `${Api.host}/${api}?api-version=${Api.version}`;

    if (options.fields) {
      const fields = options.fields.join(",");
      url += `&fields=${fields}`;
    }

    try {
      const response = await fetch(url, requestOptions as RequestInit);
      const data = await response.json();
      Debug.verbose(JSON.stringify(data, null, 3));
      return data as AzureUserStory;
    } catch (err) {
      Debug.error("Fetch error", api, err);
      $appInsightsService.trackException(api, { err: err });
      return null;
    }
  }

  private generateUserStoryBody(
    title: string,
    description: string,
    area: string,
    iterationPath: string
  ) {
    const body = [];
    if (title) {
      body.push({
        op: "add",
        path: `/fields/${WorkItemField.title}`,
        from: <any>null,
        value: title,
      });
    }

    if (description) {
      body.push({
        op: "add",
        path: `/fields/${WorkItemField.description}`,
        from: <any>null,
        value: description,
      });
    }

    if (area) {
      body.push({
        op: "add",
        path: `/fields/${WorkItemField.areaPath}`,
        from: <any>null,
        value: area,
      });
    }

    if (iterationPath) {
      body.push({
        op: "add",
        path: `/fields/${WorkItemField.iterationPath}`,
        from: <any>null,
        value: iterationPath,
      });
    }
    return body;
  }

  private getUpsertUserStoryUrl(workItemId: number): string {
    if (workItemId) {
      return `${Api.workItems}/${workItemId}`;
    }

    return `${Api.workItems}/${WorkItemType.bug}`;
  }
}
