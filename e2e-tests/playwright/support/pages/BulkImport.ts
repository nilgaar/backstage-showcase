import { Page } from '@playwright/test';
import { UIhelper } from '../../utils/UIhelper';
import { APIHelper } from '../../utils/APIHelper';
import { uiHelperPo } from '../pageObjects/global-obj';

export class BulkImport {
  private readonly page: Page;
  private readonly uiHelper: UIhelper;

  constructor(page: Page) {
    this.page = page;
    this.uiHelper = new UIhelper(page);
  }

  async searchInOrg(searchText: string) {
    await this.page
      .getByTestId('search-in-organization')
      .getByPlaceholder('Search')
      .fill(searchText);
  }

  async filterAddedRepo(searchText: string) {
    await this.page.getByPlaceholder('Filter').fill(searchText);
  }

  async newGitHubRepo(owner: string, repoName: string) {
    await APIHelper.createGitHubRepo(owner, repoName);
    await APIHelper.initCommit(owner, repoName);
  }

  async selectRepoInTable(repoName: string) {
    await this.page
      .locator(uiHelperPo.rowByText(repoName))
      .getByRole('checkbox')
      .check();
  }

  async fillTextInputByNameAtt(label: string, text: string) {
    await this.page
      .locator(`input[name*="${label}"], textarea[name*="${label}"]`)
      .fill(text);
  }
}
