/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue } from "vue-property-decorator";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";

import CreateBugFormComponent from "@/components/create-bug-form/create-bug-form.vue";
import UserStorySelectComponent from "@/components/userstory-select/userstory-select.vue";

@Component({
  components: {
    "create-bug-form": CreateBugFormComponent,
    "userstory-select": UserStorySelectComponent,
  },
})
export default class BugEntryForm extends Vue {
  name: "bug-entry-form";

  @Prop() private row: any;

  $refs = {
    modal: {} as Modal,
  };

  get bugId() {
    return this.row?.bugId;
  }

  get createText() {
    return this.bugId ? "Edit" : "Create";
  }

  created() {
    Debug.setDebugModule("bug-entry-form", this);
  }

  get disabled() {
    return !this.bugId;
  }

  show() {
    $appInsightsService.trackPageView("bug-entry-form");
    this.$modal.show("bug-entry-form");
  }

  hide() {
    this.$modal.hide("bug-entry-form");
  }

  async onBugIdChanged(bugId: number, url: string) {
    this.$emit("changed", bugId, url, this.row);
    this.hide();
  }

  cancel() {
    this.hide();
  }
}
