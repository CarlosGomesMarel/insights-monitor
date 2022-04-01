import { Component, Prop, Vue } from "vue-property-decorator";

import { $queryStore, QueryModel } from "@/services/insights-api/query.store";

@Component
export default class QuerySelectComponent extends Vue {
  name: "query-select";

  @Prop() private selected: number[];

  value: number[] = [];

  queryList: QueryModel[] = $queryStore.queryList;

  mounted() {
    this.value = this.selected;
  }

  onChanged() {
    this.$emit("changed", this.value);
  }
}
