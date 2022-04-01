<template>
  <div class="create-bug-form">
    <form action="javascript:void(0);">
      <div class="fieldset">
        <label for="title">Title</label>
        <input
          name="title"
          v-model="title"
          placeholder="Bug title"
          class="form-control"
          autocomplete="on"
          :disabled="busy"
        />

        <label for="areaPath">Area Path</label>
        <div>
          <input
            name="areaPath"
            v-model="areaPath"
            placeholder="Enter area path"
            class="form-control"
            autocomplete="on"
            :disabled="busy"
          />
        </div>

        <label for="iterationPath">Iteration Path</label>
        <div>
          <input
            name="iterationPath"
            v-model="iterationPath"
            placeholder="Enter iteration path"
            class="form-control"
            autocomplete="on"
            :disabled="busy"
          />
        </div>

        <label for="description">Description</label>
        <div class="description" v-html="description"></div>

        <span></span>

        <button
          class="btn btn-primary"
          type="submit"
          @click="createBug"
          :disabled="disabled"
        >
          {{ createText }}
          <font-awesome-icon v-show="busy" icon="spinner" spin />
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="./create-bug-form.scss"></style>
<script src="./create-bug-form.ts"></script>
