/* eslint-disable @typescript-eslint/no-inferrable-types */
import AzureDevOps from "./azure-devops";
import ApiKey from "@/support/api-key";
import { UserStoryData } from "./user-story.int";
import UserStoryStore from "./user-story.store";

class UserStoryService {
  api: AzureDevOps;

  store = new UserStoryStore();

  get userStories(): UserStoryData[] {
    return this.store.userStories;
  }

  constructor(apiKey: string) {
    this.api = new AzureDevOps(apiKey);
  }

  set apiKey(apiKey: string) {
    this.api = new AzureDevOps(apiKey);
  }

  async getUserStory(workItemId: number) {
    let userStory = this.findUserStory(workItemId);
    if (userStory) {
      return userStory;
    }

    const response = await this.api.getUserStory(workItemId);
    if (response) {
      userStory = {
        workItemId: workItemId,
        title: response.title,
        url: response.url,
        timestamp: new Date(),
        editedTimestamp: null,
      };

      return this.store.upsertUserStory(userStory);
    }

    return null;
  }

  addUserStory(workItemId: number, title: string, url: string) {
    const userStory: UserStoryData = {
      workItemId: workItemId,
      title: title,
      url: url,
      timestamp: new Date(),
      editedTimestamp: null,
    };

    this.store.upsertUserStory(userStory);
  }

  async checkAccess(apiKey: string = null) {
    apiKey = apiKey || ApiKey.getAzureDevOpsApiKey();
    if (!apiKey) {
      Debug.error("missing user story api-key");
      return false;
    }

    this.api.setApiKey(apiKey);

    Debug.log("checkAccess - don't know case");
    return true; // Don't know if have access.
  }

  async upsertUserStory(
    title: string,
    description: string,
    area: string,
    iterationPath: string,
    workItemId: number = 0
  ) {
    return this.api.upsertUserStory(
      title,
      description,
      area,
      iterationPath,
      workItemId
    );
  }

  findUserStory(workItemId: number) {
    const userStory = this.userStories.find(
      (item) => item.workItemId == workItemId
    );
    if (userStory) {
      return userStory;
    }
    return null;
  }
}

export const $userStoryService = new UserStoryService(
  ApiKey.getAzureDevOpsApiKey()
);

Debug.setDebugModule("userStoryService", $userStoryService);
