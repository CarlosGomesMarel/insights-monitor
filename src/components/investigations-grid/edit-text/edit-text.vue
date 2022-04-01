<template functional>
  <div class="edit-text">
    <div class="edit-text-message">
      <textarea
        rows="3"
        cols="30"
        :id="'edit-text-textarea-' + props.row.id"
        v-if="props.showEdit"
        :value="props.value"
        v-on:input="props.onValueChanged($event.target.value, props.row)"
        v-on:blur="props.onChanged(props.row)"
      />
      <span
        v-else
        :title="'Click to edit: ' + props.value"
        :class="props.className"
        @click="$options.onShowEdit(true, props)"
      >
        {{ props.value }}
      </span>
    </div>
    <button
      class="btn btn-secondary edit-text-btn"
      @click="$options.onShowEdit(true, props)"
    >
      <font-awesome-icon icon="edit" />
    </button>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";

export default {
  props: {
    value: String,
    row: Object,
    showEdit: Boolean,
    id: Number,
    className: String,
    onValueChanged: Function,
    onChanged: Function,
    onShowEdit: Function,
  },

  onShowEdit(value, props) {
    props.onShowEdit(value, props.row);

    Vue.nextTick(() => {
      const id = `edit-text-textarea-${props.row.id}`;
      const textarea = document.getElementById(id);
      if (textarea) {
        textarea.focus();
      }
    });
  },
};
</script>

<style scoped>
.edit-text {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.edit-text .edit-text-message {
  width: 230rem;
  cursor: pointer;
}

.edit-text span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  align-items: center;
}

.edit-text .edit-text-btn {
  visibility: hidden;
}

.edit-text:hover .edit-text-btn {
  visibility: visible;
}
</style>
