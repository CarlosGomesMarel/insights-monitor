<template>
  <div class="input-form">
    <form target="no_submit_frame" action="about:blank" method="post">
      <div class="fieldset">
        <legend>Create New Entry</legend>

        <label for="date">Date</label>
        <input
          name="date"
          v-model="title"
          placeholder="Date"
          class="form-control"
          autocomplete="on"
          :disabled="busy"
          readonly
        />

        <label for="hours">Hours</label>
        <div>
          <input
            name="hours"
            v-model.number="hours"
            placeholder="Enter # of hours. (1-12)"
            class="form-control"
            autocomplete="on"
            type="number"
            :disabled="busy"
            :readonly="busy"
          />
          <span class="error" v-show="showHoursError"
            >Only numbers 1-12 allowed.</span
          >
        </div>

        <label for="workItemId">User Story</label>
        <userstory-select
          :originalWorkItemId="workItemId"
          :busy="busy"
          @changed="onUserStoryChanged"
        />

        <span></span>
        <button
          class="btn btn-primary"
          type="submit"
          @click="createWorkLog"
          :disabled="disabled"
        >
          Add
          <font-awesome-icon v-show="busy" icon="spinner" spin />
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="./input-form.scss"></style>
<script src="./input-form.ts"></script>
