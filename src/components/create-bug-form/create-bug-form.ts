/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import UserStorySelectComponent from "@/components/userstory-select/userstory-select.vue";

import { $userStoryService } from "@/services/azure-devops/user-story.service";
import { InvestigationDto } from "@/services/insights-api/models/investigation.model";
import { $investigationBugService } from "@/services/investigation-bugs/investigation-bug.service";
import LocalData from "@/support/local-storage";

@Component({
  name: "create-bug-form",
  components: {
    "userstory-select": UserStorySelectComponent,
  },
})
export default class CreateBugFormComponent extends Vue {
  @Prop() bugId: number;
  @Prop() row: InvestigationDto;

  title: string = null;
  description: string = "<b>Hi</b>";
  areaPath: string = null;
  iterationPath: string = null;
  busy = false;

  get createText() {
    return this.bugId ? "Edit" : "Create";
  }

  get disabled() {
    return !this.title || !this.description;
  }

  get userStories() {
    return $userStoryService.userStories;
  }

  @Watch("areaPath")
  onAreaPathChanged() {
    if (this.areaPath) {
      LocalData.saveString("create-bug-form.areaPath", this.areaPath);
    }
  }

  @Watch("iterationPath")
  onIterationPathChanged() {
    if (this.iterationPath) {
      LocalData.saveString("create-bug-form.iterationPath", this.iterationPath);
    }
  }

  async created() {
    Debug.setDebugModule("create-bug-form", this);

    this.areaPath = LocalData.getString("create-bug-form.areaPath");
    this.iterationPath = LocalData.getString("create-bug-form.iterationPath");

    this.description = await $investigationBugService.createBugDescription(
      this.row
    );

    this.title = await $investigationBugService.createTitle(this.row);
  }

  async createBug() {
    const results = await $userStoryService.upsertUserStory(
      this.title,
      this.description,
      this.areaPath,
      this.iterationPath,
      this.bugId
    );

    if (results?.id) {
      this.$emit("changed", results.id, results?._links?.html?.href);
      this.$toast.success("Bug created successfully.");

      $userStoryService.getUserStory(results.id);
    } else {
      Debug.error("Failed to create the bug", this.bugId, this.title);
      this.$toast.error("Failed to create the bug");
    }
    return false;
  }
}
