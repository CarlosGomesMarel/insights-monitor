/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

import { InvestigationDto } from "../insights-api/models/investigation.model";

export class InvestigationBugService {
  async createBugDescription(row: InvestigationDto) {
    const title = this.createTitle(row);
    const timestamp =
      row.timestamp.toISOString().replace("T", " ").replace("Z", " ") + "UTC";
    const issueCount = row.issueCount.toLocaleString("en-US");

    let description =
      `
    <b>${title}</b><br/>
    <br/>
    <table>
` +
      this.addTableRow("Message", row.message, true) +
      this.addTableRow("Context", row.context, true) +
      this.addTableRow("Message", row.additionalMessage, true) +
      this.addTableRow("Timestamp", timestamp) +
      this.addTableRow("Issue Count", issueCount) +
      this.addTableRow("Name", row.name) +
      this.addTableRow("Cloud Role", row.cloudRoleName) +
      this.addTableRow("Operation", row.operationName) +
      this.addTableRow("Area", row.area) +
      this.addTableRow("SiteId", row.siteId) +
      this.addTableRow("itemId", row.itemId) +
      this.addTableRow("query", row.query) +
      this.addTableRow("Hash Code", row.hashCode.toString()) +
      `</table>`;

    if (row.jsonData) {
      description += `
    <br/>
    <b>Properties:</b>
<pre>${JSON.stringify(row.jsonData, null, 3)}</pre><br/>
          `;
    }
    return description.trim();
  }

  private addTableRow(key: string, value: string, pre = false) {
    if (!value) {
      return "";
    }

    const padding =
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    if (pre) {
      return `
<tr><td>${key}${padding}</td><td><pre>${value}</pre></td></tr>
              `;
    } else {
      return `
<tr><td>${key}${padding}</td><td>${value}</td></tr>
              `;
    }
  }

  createTitle(row: InvestigationDto) {
    if (row.title) {
      return row.title;
    }

    const parts = [];
    if (row.method) {
      parts.push(row.method);
    }
    if (row.name) {
      parts.push(row.name);
    }

    if (parts.length < 2) {
      if (row.message) {
        parts.push(row.message);
      }
    }

    const title = parts.join(" - ");
    return title;
  }
}

export const $investigationBugService = new InvestigationBugService();

Debug.setDebugModule("investigationBugService", $investigationBugService);
