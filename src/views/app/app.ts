import { Component, Vue, Watch } from "vue-property-decorator";

import Browser from "@/support/browser";
import { Env } from "@/support/environment";
import { EventBus } from "@/support/event-bus";

import ApiKeyFormComponent from "@/components/api-key-form/api-key-form.vue";
import InputFormComponent from "@/components/input-form/input-form.vue";
import InvestigationsGridComponent from "@/components/investigations-grid/investigations-grid.vue";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";
import { $userStoryService } from "@/services/azure-devops/user-story.service";

@Component({
  components: {
    "api-key-form": ApiKeyFormComponent,
    "input-form": InputFormComponent,
    "investigations-grid": InvestigationsGridComponent,
  },
})
export default class AppComponent extends Vue {
  options = {
    showApiKey: Browser.getBoolParam("showApiKey"),
  };

  $refs = {
    apiKeyForm: {} as Modal,
  };

  hasAccess = {
    userStory: {
      value: false,
      loaded: false,
    },
  };

  monthlyUrl = `https://dev.azure.com/${Env.VUE_APP_API_ORGANIZATION}/${Env.VUE_APP_API_PROJECT}/_apps/hub/7pace.Timetracker.Monthly`;
  helpLink = `mailto:carlos.gomes@marel.com?subject=Time Tracker Help`;

  get showUserLink() {
    return this.hasAccess.userStory.loaded && !this.hasAccess.userStory.value;
  }

  @Watch("hasAccess", { immediate: true, deep: true })
  onHasAccessChanged() {
    if (!this.hasAccess.userStory) {
      this.showApiKeyForm();
    }
  }

  created() {
    Debug.setDebugModule("app", this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $appInsightsService.setVueInstance((this as any).$appInsights);
    $appInsightsService.trackPageView("app");

    EventBus.Instance.$on(EventBus.UserStoryApiKeyChanged, async () => {
      await this.checkUserStoryAccess();
    });

    EventBus.Instance.$on(EventBus.WorkItemsLoaded, async () => {
      // Check user story access once have user stories
      await this.checkUserStoryAccess();
      this.hasAccess.userStory.loaded = true;
    });

    /*
    this.checkUserStoryAccess();
    */
  }

  mounted() {
    if (this.options.showApiKey) {
      this.showApiKeyForm();
    }
  }

  showApiKeyForm() {
    if (this.$refs.apiKeyForm) {
      this.$refs.apiKeyForm.show();
    }
  }

  hideApiKeyForm() {
    if (this.$refs.apiKeyForm) {
      this.$refs.apiKeyForm.hide();
    }
  }

  private async checkUserStoryAccess() {
    this.hasAccess.userStory.value = await $userStoryService.checkAccess();
  }
}
