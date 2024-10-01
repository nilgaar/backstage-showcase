import { request } from '@playwright/test';

export default class OcApi {
  private static API_URL = process.env.K8S_CLUSTER_API_SERVER_URL;
  private _myContext = request.newContext({
    baseURL: `${OcApi.API_URL}/apis/`,
  });

  private _operators(name?: string) {
    // https://docs.openshift.com/container-platform/4.14//rest_api/operatorhub_apis/operator-operators-coreos-com-v1.html#api-endpoints
    const url = 'operators.coreos.com/v1/operators/';
    if (name) {
      return {};
    } else {
      return {
        get: () => {
          this._myContext.then(c => c.get(url));
        },
        delete: () => this._myContext.then(c => c.delete(url)),
        post: () => this._myContext.then(c => c.post(url)),
      };
    }
  }
}
