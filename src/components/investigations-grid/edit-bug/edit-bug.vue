<template functional>
  <div class="edit-bug">
    <div class="edit-bug-message">
      <a
        v-if="props.value"
        class="bug-id"
        :href="props.url"
        target="_blank"
        :title="'Navigate to bug: ' + props.url"
        @click="$options.navigateToUrl(props)"
        >{{ props.value }}</a
      >
      <span
        v-else
        class="bug-id-missing"
        title="Click to select / edit bug."
        @click="$options.onShowEdit(true, props)"
        >&nbsp;&nbsp;&nbsp;</span
      >
    </div>

    <button
      class="btn btn-link edit-bug-btn"
      @click="props.onChanged(0, null, props.row)"
      title="Remove bug"
    >
      <font-awesome-icon icon="trash" />
    </button>

    <button
      class="btn btn-link edit-bug-btn"
      @click="$options.onShowEdit(true, props)"
      title="Edit or Select bug"
    >
      <font-awesome-icon icon="edit" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    url: String,
    row: Object,
    id: Number,
    onShowEdit: Function,
    onChanged: Function,
  },

  onShowEdit(value, props) {
    props.onShowEdit(value, props.row);
  },

  navigateToUrl(props) {
    if (props.url) {
      window.open(props.url, "_blank");
    }
  },
};
</script>

<style scoped>
.bug-id-missing {
  cursor: pointer;
}

.edit-bug {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.edit-bug .edit-bug-message {
  width: 10rem;
}

.edit-bug span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  align-items: center;
}

.edit-bug .edit-bug-btn {
  visibility: hidden;
  margin: 0;
  padding: 0;
  padding-right: 0.25rem;
}

.edit-bug:hover .edit-bug-btn {
  visibility: visible;
}
</style>
