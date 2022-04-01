/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Vue } from "vue-property-decorator";
import { InvestigationDto } from "@/services/insights-api/models/investigation.model";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";

@Component({
  name: "edit-text-form",
})
export default class EditTextFormComponent extends Vue {
  name: "edit-text-form";

  originalValue: string;
  value: string = null;
  row: InvestigationDto;

  $refs = {
    modal: {} as Modal,
  };

  get disabled() {
    return false; //!this.value;
  }

  get id() {
    return this.row?.id ? this.row.id : new Date().getTime();
  }

  get key() {
    return `edit-text-form-${this.id}-${new Date().getTime()}`;
  }

  async created() {
    Debug.setDebugModule("edit-text-form", this);
  }

  show(value: string, row: InvestigationDto) {
    this.value = value;
    this.originalValue = value;
    this.row = row;

    $appInsightsService.trackPageView("edit-text-form");
    this.$modal.show(this.key);
  }

  hide() {
    this.$modal.hide(this.key);
  }

  async onChanged() {
    if (this.value !== this.originalValue) {
      this.$emit("changed", this.value, this.row);
    }
    this.hide();
  }

  cancel() {
    this.hide();
  }
}
