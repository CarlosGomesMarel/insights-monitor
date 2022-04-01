/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import { $appInsightsService } from "../app-insights/app-insights.service";

import { Env } from "@/support/environment";
import { AppNameDto, InvestigationDto, QueryDto, StatusDto } from ".";

interface FetchOptions {
  method?: string;
  body?: string;
  fields?: string[];
}

export class InsightsApiService {
  /**
   * Fetch AppNames rows.
   */
  async appNames() {
    return await this.fetchData<AppNameDto[]>("api/insights/ui/app-names");
  }

  /**
   * Fetch Investigations rows.
   */
  async investigations() {
    const results = await this.fetchData<InvestigationDto[]>(
      "api/insights/ui/investigations"
    );

    results.forEach((investigation) => {
      this.mapInvestigationDateTimeFields(investigation);
    });

    return results;
  }

  /**
   * Fetch Investigations rows.
   */
  async saveInvestigation(model: InvestigationDto) {
    const results = await this.fetchData<InvestigationDto[]>(
      "api/insights/ui/investigation",
      {
        method: "PUT",
        body: JSON.stringify(model),
      }
    );

    results.forEach((investigation) => {
      this.mapInvestigationDateTimeFields(investigation);
    });

    return results;
  }

  /**
   * Fetch query rows.
   */
  async query() {
    return await this.fetchData<QueryDto[]>("api/insights/ui/query");
  }

  /**
   * Fetch status rows.
   */
  async status() {
    return await this.fetchData<StatusDto[]>("api/insights/ui/status");
  }

  private mapInvestigationDateTimeFields(model: InvestigationDto) {
    model.timestamp = new Date(model.timestamp + "Z");
    model.changedTimestamp = new Date(model.changedTimestamp);
    model.uploadedTimestamp = new Date(model.uploadedTimestamp);

    if (model.jsonData) {
      model.jsonData = JSON.parse(<any>model.jsonData);
    }
  }

  private async fetchData<T>(api: string, options: FetchOptions = {}) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: options.method || "GET",
      headers: headers,
      redirect: "follow",
      body: options.body,
    };

    const url = `${Env.INSIGHTS_API_URL}${api}`;

    try {
      const response = await fetch(url, requestOptions as RequestInit);
      const data = await response.json();
      return <T>data;
    } catch (err) {
      Debug.error("Fetch error", api, err);
      $appInsightsService.trackException(api, { err: err });
      return null;
    }
  }
}

export const $insightsApiService = new InsightsApiService();

Debug.setDebugModule("insightsApiService", $insightsApiService);
