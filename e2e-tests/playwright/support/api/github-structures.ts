export class GetOrganizationResponse {
  reposUrl: string;
  constructor(response: any) {
    enum OrganizationResponseAttributes {
      reposUrl = 'repos_url',
    }
    this.reposUrl = response[OrganizationResponseAttributes.reposUrl];
  }
}

export enum ItemStatus {
  open = 'open',
  closed = 'closed',
  all = 'all',
}
