<template>
  <div>
    <modal
      height="300"
      width="500"
      :clickToClose="true"
      :key="key"
      :name="key"
      ref="modal"
    >
      <div class="edit-text-form">
        <h4>Edit title</h4>
        <hr class="divider" />

        <div class="edit">
          <textarea
            rows="10"
            cols="50"
            v-model="value"
            v-on:blur="onChanged"
          ></textarea>
        </div>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./edit-text-form.scss"></style>
<script src="./edit-text-form.ts"></script>
