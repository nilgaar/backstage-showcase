import { expect, request } from '@playwright/test';

export class RhdhApi {
  private _myContext = request.newContext({
    baseURL: process.env.BASE_URL + '/api/',
  });

  private async getGuestToken() {
    const context = await this._myContext;
    const req = await context.post('auth/guest/refresh');
    expect(req.status).toBe(200);
    return (await req.json()).backstageIdentity.token;
  }

  public auth() {
    return {
      getGuestAuthHeader: async () => {
        const token = this.getGuestToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return headers;
      },
    };
  }
}
