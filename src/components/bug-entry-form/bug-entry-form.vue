<template>
  <div>
    <modal
      height="800"
      width="700"
      :clickToClose="true"
      key="bug-entry-form"
      name="bug-entry-form"
      ref="modal"
    >
      <div class="bug-entry-form">
        <h4>{{ createText }} or Select a Bug</h4>
        <hr class="divider" />

        <h4>Select a Bug</h4>
        <div class="userstory-select">
          <userstory-select
            :originalWorkItemId="bugId"
            :row="row"
            @changed="onBugIdChanged"
          />
        </div>

        <hr class="divider" />

        <h4>{{ createText }} Bug {{ bugId }}</h4>

        <create-bug-form :bugId="bugId" :row="row" @changed="onBugIdChanged" />
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./bug-entry-form.scss"></style>
<script src="./bug-entry-form.ts"></script>
