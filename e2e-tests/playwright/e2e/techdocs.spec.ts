import { test } from '@playwright/test';
import { UIhelper } from '../utils/UIhelper';
import { Common } from '../utils/Common';
import { SidebarOptions } from '../support/components/Sidebar';

test.describe('TechDocs', () => {
  let common: Common;
  let uiHelper: UIhelper;

  test.beforeEach(async ({ page }) => {
    uiHelper = new UIhelper(page);
    common = new Common(page);
    await common.loginAsGuest();
  });

  test('Verify that TechDocs is visible in sidebar', async () => {
    await uiHelper.openSidebar(SidebarOptions.Docs);
  });

  test('Verify that TechDocs for Backstage Showcase works', async ({
    page,
  }) => {
    await uiHelper.openSidebar(SidebarOptions.Docs);
    await page.getByRole('link', { name: 'Backstage Showcase' }).click();
  });
});
