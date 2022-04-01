export interface AzureUserStoryFields {
  'System.Title': string;
}

export interface AzureUserStory {
  id: string;
  rev: null;
  fields: AzureUserStoryFields;
  _links: Map<string, object>;
}

export interface AzureUser {
  uniqueName: string;
  displayName: null;
  vstsId: string;
  vstsCollectionId: string;
  email: string;
  name: string;
  id: string;
}

export interface AzureWorkLog {
  timestamp: string;
  length: number;
  billableLength: null;
  workItemId: number;
  comment: null;
  user: AzureUser;
  addedByUser: AzureUser;
  editedByUser: AzureUser;
  createdTimestamp: Date;
  editedTimestamp: Date;
  activityType: {
    color: string;
    name: string;
    id: string;
  };
  flags: {
    isTracked: boolean;
    isManuallyEntered: boolean;
    isChanged: boolean;
    isTrackedExtended: boolean;
    isImported: boolean;
    isFromApi: boolean;
    isBillable: boolean;
  };
}

export interface WorkLog extends AzureWorkLog {
  id: string;
  date: string;
  datetime: Date;
  week: number;
  hours: number;
  title: string;
  busy: boolean;
}
