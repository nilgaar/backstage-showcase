import { getOrganizationResponse, ItemStatus } from './github-structures';
import { JANUS_ORG, SHOWCASE_REPO } from '../../utils/constants';
import { APIResponse, request } from '@playwright/test';

export default class GithubApi {
  private static API_URL = 'https://api.github.com';
  private static API_VERSION = '2022-11-28';
  private static AUTH_HEADER = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GH_RHDH_QE_USER_TOKEN}`,
    'X-GitHub-Api-Version': GithubApi.API_VERSION,
  };

  public async getOrganization(
    org = JANUS_ORG,
  ): Promise<getOrganizationResponse> {
    const req = await this._organization(org).get();
    return new getOrganizationResponse(req.json());
  }

  public async getReposFromOrg(org = JANUS_ORG) {
    const req = await this._organization(org).repos();
    return req.json();
  }

  public async getPullRequestsFromRepo(
    prStatus: ItemStatus,
    repo = SHOWCASE_REPO,
    itemsPerPage = 100,
  ) {
    return this._repository(repo).pullRequests(prStatus, itemsPerPage).get();
  }

  public async getIssuesFromRepo(repo = SHOWCASE_REPO) {
    const req = await this._repository(repo).issues().get();
    return req.json();
  }

  public async getIssuesFromRepoPaginated(repo = SHOWCASE_REPO) {
    return this._repository(repo).issues().getPaginated();
  }

  public async deleteRepo(repo = SHOWCASE_REPO) {
    const req = await this._repository(repo).detelete();
    return req.json();
  }

  public async getRunsFromAction(repo = SHOWCASE_REPO) {
    const req = await this._repository(repo).actions().runs();
    return req.json();
  }

  private _myContext = request.newContext({
    baseURL: GithubApi.API_URL,
    extraHTTPHeaders: GithubApi.AUTH_HEADER,
  });

  private async _paginate(url: string, page = 1, response: any[] = []) {
    const context = await this._myContext;
    const res = await context.get(url + `&page=${page}`);
    const body = res.json();

    if (!Array.isArray(body)) {
      throw new Error(
        `Expected array but got ${typeof body}: ${JSON.stringify(body)}`,
      );
    }

    if (body.length === 0) {
      return response;
    }

    response = [...response, ...body];
    this._paginate(url, page + 1, response);
  }

  private _organization(organization: string) {
    const url = '/orgs/';

    return {
      get: async (): Promise<APIResponse> => {
        const context = await this._myContext;
        const path: string = url + organization;
        return context.get(path);
      },

      repos: async (): Promise<APIResponse> => {
        const context = await this._myContext;
        const organizationResponse = await new GithubApi()
          ._organization(organization)
          .get();
        return context.get(organizationResponse['repos_url']);
      },
    };
  }

  private _repository(repo: string) {
    const path = '/repos/' + repo;

    return {
      pullRequests: (state: ItemStatus, perPage: number) => {
        const payload = `/pulls?per_page=${perPage}&state=${state}`;
        return {
          get: async () => {
            const context = await this._myContext;
            return context.get(path + payload);
          },
          getPaginated: async (): Promise<any[]> => {
            return this._paginate(path + payload);
          },
        };
      },

      issues: (
        state: ItemStatus = ItemStatus.open,
        perPage = 100,
        sort = 'updated',
      ) => {
        const payload = `/issues?per_page=${perPage}&sort=${sort}&state=${state}`;
        return {
          get: async (): Promise<APIResponse> => {
            const context = await this._myContext;
            const url = path + payload;
            return await context.get(url);
          },
          getPaginated: (): Promise<any[]> => {
            return this._paginate(path + payload);
          },
        };
      },
      detelete: async (): Promise<APIResponse> => {
        const context = await this._myContext;
        return await context.delete(path);
      },
      actions: () => {
        const actionsPath = '/actions/';
        return {
          runs: async (perPage = 100): Promise<APIResponse> => {
            const context = await this._myContext;
            const runsPath = actionsPath + 'runs';
            const url = runsPath + `?per_page=${perPage}`;
            return await context.get(url);
          },
        };
      },
    };
  }
}
