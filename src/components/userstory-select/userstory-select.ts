/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Env } from "@/support/environment";

import { $userStoryService } from "@/services/azure-devops/user-story.service";
import { UserStoryData } from "@/services/azure-devops/user-story.int";
import Fuse from "fuse.js";

function parseInteger(value: string) {
  try {
    return parseInt(value);
  } catch {
    return 0;
  }
}

@Component({
  name: "userstory-select",
})
export default class UserStorySelectComponent extends Vue {
  @Prop() originalWorkItemId: number;
  @Prop() row: any;
  @Prop() busy: boolean;
  @Prop() classes: string;
  @Prop() showDropDown: boolean;

  userStoryUrl = `https://dev.azure.com/${Env.VUE_APP_API_ORGANIZATION}/${Env.VUE_APP_API_PROJECT}/_workitems/edit`;
  userStory: UserStoryData = null;
  model = {
    workItemId: 0,
  };

  get userStories() {
    return $userStoryService.userStories;
  }

  get workItemId() {
    return isNaN(this.model.workItemId) ? 0 : this.model.workItemId;
  }

  set workItemId(value) {
    if (typeof value === "string") {
      value = parseInt(value);
    }
    this.model.workItemId = value;
  }

  get isWorkItemIdValid() {
    try {
      const workItemId = this.workItemId.toFixed(0);
      return (
        this.workItemId >= 10000 && workItemId == this.workItemId.toString()
      );
    } catch (err) {
      return false;
    }
  }

  onUserStoryChanged() {
    this.workItemId = this.userStory.workItemId;
    this.$emit("changed", this.workItemId, this.userStory.url, this.row);
  }

  @Watch("originalWorkItemId")
  onOriginalWorkItemId() {
    this.model.workItemId = this.originalWorkItemId;
  }

  created() {
    Debug.setDebugModule("userstory-select", this);
    this.onOriginalWorkItemId();
  }

  mounted() {
    if (this.workItemId) {
      this.userStory = this.userStories.find(
        (item) => item.workItemId == this.workItemId
      );
    }
  }

  async createOption(option: string) {
    const workItemId = parseInteger(option);
    if (workItemId > 9999) {
      let userStory = this.userStories.find(
        (item) => item.workItemId == workItemId
      );
      if (userStory) {
        return;
      }

      const result = await $userStoryService.getUserStory(workItemId);
      if (!result) {
        Debug.error(`Did not find user story ${workItemId}`);
        return null;
      }

      $userStoryService.addUserStory(workItemId, result.title, result.url);

      userStory = this.userStories.find(
        (item) => item.workItemId == workItemId
      );

      if (userStory) {
        this.$emit("option:created", userStory);
        return userStory;
      }
    }
  }

  filterUserStories(options: UserStoryData[], search: string) {
    const fuse = new Fuse(options, {
      keys: ["workItemId", "title"],
      shouldSort: true,
    });
    return search.length
      ? fuse.search(search).map(({ item }) => item)
      : options;
  }
}
