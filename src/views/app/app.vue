<template>
  <div id="app" class="app">
    <div class="header">
      <h3>Insights Monitor</h3>

      <span></span>

      <button class="btn btn-link" @click="showApiKeyForm">
        <font-awesome-icon icon="cog" />
      </button>

      <button
        class="btn btn-link token-error"
        v-if="showUserLink"
        @click="showApiKeyForm"
      >
        Need Azure Devops Personal Access Token
        <font-awesome-icon icon="exclamation-triangle" />
      </button>

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
      </a>
    </div>

    <div class="app-content">
        <investigations-grid></investigations-grid>
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
