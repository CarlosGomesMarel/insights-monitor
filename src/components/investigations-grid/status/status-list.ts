import { Component, Prop, Vue } from "vue-property-decorator";

import {
  $statusStore,
  StatusModel,
} from "@/services/insights-api/status.store";

@Component
export default class StatusListComponent extends Vue {
  name: "status-list";

  @Prop() private statusId: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop() private row: any;

  value = 0;

  statusList: StatusModel[] = $statusStore.statusList;

  mounted() {
    this.value = this.statusId;
  }

  onChanged() {
    const model = this.statusList.find((item) => item.id == this.value);
    this.$emit("changed", model, this.row);
  }
}
