<template>
  <div>
    <modal
      height="650"
      width="500"
      :clickToClose="false"
      key="api-key-form"
      name="api-key-form"
      ref="modal"
    >
      <div class="api-key-form">
        <h4>Enter Access Tokens</h4>

        <h5>Time Instructions</h5>
        <span>
          1. Navigate to
          <a
            :href="configurationUrl"
            title="Time Tracker Configuration"
            target="_blank"
          >
            Time Tracker Configuration
            <font-awesome-icon icon="share-square" />
          </a>
        </span>

        <span>
          2. Click on
          <b>Reporting & REST API</b>.
        </span>

        <span>
          3. Click
          <b>Create New Token</b>.
        </span>

        <span>4.Copy API Token and paste below.</span>

        <form class="input-form" action="javascript:void(0);">
          <label for="time-api-key">Time Token</label>
          <input
            name="time-api-key"
            v-model="timeApiKey"
            placeholder="Api Token"
            class="form-control"
            autocomplete="off"
            type="password"
          />

          <span title="Invalid Api Key">
            <font-awesome-icon
              v-show="showTimeApiKeyError"
              icon="exclamation-triangle"
            />
          </span>
        </form>

        <h5>Personal Access Token Instructions</h5>
        <span>
          1. Navigate to
          <a
            :href="personalAccessTokenUrl"
            title="Personal Access Tokens"
            target="_blank"
          >
            Personal Access Tokens
            <font-awesome-icon icon="share-square" />
          </a>
        </span>

        <span>
          2. Click on
          <b>New Token</b>.
        </span>

        <span>
          3. Enter Name, ie.)
          <b>Time Tracker Token</b>.
        </span>

        <span>4. Configure Expiration, suggest 1 year.</span>

        <span>
          5. Under Scopes, check
          <b>Custom defined</b>.
        </span>

        <span>
          5. Under Work Items, check
          <b>Read</b>.
        </span>

        <span>
          5. Click
          <b>Create</b>.
        </span>

        <span>4. Copy token and paste below.</span>

        <form class="input-form" action="javascript:void(0);">
          <label for="user-story-api-key">Token</label>
          <input
            name="user-story-api-key"
            v-model="userStoryApiKey"
            placeholder="Personal Access Token"
            class="form-control"
            autocomplete="off"
            type="password"
          />

          <span title="Invalid Api Key">
            <font-awesome-icon
              v-show="showUserStoryApiKeyError"
              icon="exclamation-triangle"
            />
          </span>

          <span></span>
          <div>
            <button class="btn btn-default" type="cancel" @click="cancel">
              Cancel
            </button>

            <button
              class="btn btn-primary"
              type="submit"
              :disabled="disabled"
              @click="saveApiKey"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./api-key-form.scss"></style>
<script src="./api-key-form.ts"></script>
