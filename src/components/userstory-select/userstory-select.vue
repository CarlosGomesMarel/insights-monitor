<template>
  <div class="userstory-select">
    <v-select
      name="workItemId"
      :options="userStories"
      :clearable="false"
      :taggable="true"
      :pushTags="false"
      :createOption="createOption"
      @input="onUserStoryChanged"
      placeholder="Type or Select User Story or Bug"
      v-model="userStory"
      :filter="filterUserStories"
      class="user-stories"
      :class="classes"
      label="workItemId"
      :disabled="busy"
    >
      <template v-slot:selected-option="option">
        <div class="user-story-selected-option">
          <span class="id">{{ option.workItemId }}</span>
          <span class="title">{{ option.title }}</span>
        </div>
      </template>

      <template v-slot:option="option">
        <div class="user-story-option">
          <span class="id">{{ option.workItemId }}</span>
          <span class="title">{{ option.title }}</span>
        </div>
      </template>

      <template v-slot:no-options>
        <span>Missing user stories</span>
      </template>
    </v-select>
  </div>
</template>

<style lang="scss" src="./userstory-select.scss"></style>
<script src="./userstory-select.ts"></script>
