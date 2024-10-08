import { Page, expect } from '@playwright/test';
import { homePagePO } from '../pageObjects/page-obj';
import { UIhelper } from '../../utils/UIhelper';

export class HomePage {
  private readonly page: Page;
  private readonly uiHelper: UIhelper;

  constructor(page: Page) {
    this.page = page;
    this.uiHelper = new UIhelper(page);
  }
  async verifyQuickSearchBar(text: string) {
    const searchBar = this.page.locator(homePagePO.searchBar);
    await searchBar.waitFor();
    await searchBar.fill('');
    await searchBar.type(text + '\n'); // '\n' simulates pressing the Enter key
    await this.uiHelper.verifyLink(text);
  }

  async verifyQuickAccess(
    section: string,
    quickAccessItem: string,
    expand = false,
  ) {
    await this.page.waitForSelector(homePagePO.muiAccordion, {
      state: 'visible',
    });

    const sectionLocator = this.page
      .locator(homePagePO.muiAccordion)
      .filter({ hasText: section });

    if (expand) {
      await sectionLocator.click();
      await this.page.waitForTimeout(500);
    }

    const itemLocator = sectionLocator
      .locator('a div[class*="MuiListItemText-root"]')
      .filter({ hasText: quickAccessItem });

    await itemLocator.waitFor({ state: 'visible' });

    const isVisible = await itemLocator.isVisible();
    expect(isVisible).toBeTruthy();
  }
}
