import { $appNamesStore, AppNameDto } from "@/services/insights-api";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class QuerySelectNameComponent extends Vue {
  name: "app-names-select";

  @Prop() private selected: string[];

  value: string[] = [];

  appNamesList: AppNameDto[] = $appNamesStore.appNamesList;

  mounted() {
    this.value = this.selected;
  }

  onChanged() {
    this.$emit("changed", this.value);
  }
}
