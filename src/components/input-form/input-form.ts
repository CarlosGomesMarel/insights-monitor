import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import UserStorySelectComponent from "@/components/userstory-select/userstory-select.vue";

import { $userStoryService } from "@/services/azure-devops/user-story.service";
import LocalData from "@/support/local-storage";

function parseInteger(value: string) {
  try {
    return parseInt(value);
  } catch {
    return 0;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEmptyNumber(value: any) {
  return value == "" || value == null || isNaN(value);
}

@Component({
  name: "input-form",
  components: {
    "userstory-select": UserStorySelectComponent,
  },
})
export default class InputFormComponent extends Vue {
  @Prop() private datetime!: Date;

  title: string = null;
  hours = parseInteger(window.localStorage.getItem("input-form-hours"));
  workItemId = LocalData.getInt("input-form-workItemId");
  busy = false;

  get disabled() {
    return !this.isHoursValid || !this.isWorkItemIdValid;
  }

  get userStories() {
    return $userStoryService.userStories;
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

  get isHoursValid() {
    try {
      const hours = this.hours.toFixed(0);
      return (
        this.hours > 0 && this.hours <= 12 && hours == this.hours.toString()
      );
    } catch (err) {
      return false;
    }
  }

  get showHoursError() {
    return !isEmptyNumber(this.hours) && !this.isHoursValid;
  }

  onUserStoryChanged(workItemId: number) {
    this.workItemId = workItemId;

    if (!isEmptyNumber(this.workItemId) && this.isWorkItemIdValid) {
      window.localStorage.setItem(
        "input-form-workItemId",
        this.workItemId.toFixed(0)
      );
    }
  }

  @Watch("datetime")
  onDateTimeChanged() {
    this.title = this.datetime.toStringEx("MM-dd-yyyy");
  }

  @Watch("hours")
  onHoursChanged() {
    if (!isEmptyNumber(this.hours) && this.isHoursValid) {
      window.localStorage.setItem("input-form-hours", this.hours.toFixed(0));
    }
  }

  created() {
    Debug.setDebugModule("input-form", this);
  }

  mounted() {
    this.onDateTimeChanged();
  }
}
