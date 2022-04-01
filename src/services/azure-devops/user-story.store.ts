import Vue from "vue";
import { orderBy } from "lodash";
import { UserStoryData } from "./user-story.int";

const UserStoryPrefix = "user-story/";
const UserStoryVersion = {
  key: "user-story-version",
  value: "1.0",
};

interface UserStoryState {
  userStories: UserStoryData[];
}

export default class UserStoryStore {
  private state = Vue.observable<UserStoryState>({
    userStories: [],
  });

  get userStories() {
    return orderBy(this.state.userStories, ["editedTimestamp"], ["desc"]);
  }

  constructor() {
    this.checkVersion();
    this.load();
  }

  public upsertUserStory(userStory: UserStoryData) {
    if (userStory.title && userStory.title != "(N/A)") {
      this.saveUserStory(userStory);
    }
    return this.commitUserStory(userStory);
  }

  public updateUserStory(userStory: UserStoryData) {
    const found = this.state.userStories.find((item) => item == userStory);
    if (!found) {
      Debug.error(
        "updateuserStory missing userStory",
        userStory.workItemId,
        userStory
      );
      return;
    }

    this.saveUserStory(userStory);
  }

  public clearSavedUserStories() {
    for (let idx = window.localStorage.length - 1; idx >= 0; idx--) {
      const key = window.localStorage.key(idx);
      if (key.startsWith("user-story/")) {
        window.localStorage.removeItem(key);
      }
    }
  }

  private checkVersion() {
    const version = window.localStorage.getItem(UserStoryVersion.key);
    if (version != UserStoryVersion.value) {
      Debug.log("Clearing user story stores");

      for (let idx = window.localStorage.length - 1; idx >= 0; idx--) {
        const key = window.localStorage.key(idx);
        if (key.startsWith("user-story/")) {
          window.localStorage.removeItem(key);
        }
      }

      window.localStorage.setItem(UserStoryVersion.key, UserStoryVersion.value);
    }
  }

  private load() {
    for (let idx = window.localStorage.length - 1; idx >= 0; idx--) {
      const key = window.localStorage.key(idx);
      if (key.startsWith("user-story/")) {
        try {
          const json = window.localStorage.getItem(key);
          const userStory = JSON.parse(json) as UserStoryData;
          if (userStory.title) {
            this.commitUserStory(userStory);
          }
        } catch (err) {
          window.localStorage.removeItem(key);
        }
      }
    }
  }

  private commitUserStory(userStory: UserStoryData) {
    userStory = Vue.observable(userStory);

    const found = this.state.userStories.find(
      (item) => item.workItemId == userStory.workItemId
    );

    if (found) {
      const idx = this.state.userStories.indexOf(found);
      this.state.userStories.splice(idx, 1, userStory);
      return found;
    } else {
      this.state.userStories.push(userStory);
      return userStory;
    }
  }

  private loadUserStory(workItemId: number) {
    const key = UserStoryPrefix + workItemId;
    const json = window.localStorage.getItem(key);
    if (!json) return null;

    try {
      return JSON.parse(json) as UserStoryData;
    } catch (err) {
      Debug.error("load", workItemId, err);
    }
    return null;
  }

  private saveUserStory(userStory: UserStoryData) {
    const key = UserStoryPrefix + userStory.workItemId;
    window.localStorage.setItem(key, JSON.stringify(userStory));
  }
}
