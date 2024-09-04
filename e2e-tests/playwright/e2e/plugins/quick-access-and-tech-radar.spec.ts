import { test } from '@playwright/test';
import { HomePage } from '../../support/pages/HomePage';
import { Common } from '../../utils/Common';
import { UIhelper } from '../../utils/UIhelper';
import { TechRadar } from '../../support/pages/TechRadar';
import { SidebarOptions } from '../../support/components/Sidebar';

// Pre-req: Enable backstage-plugin-tech-radar Plugin

test.describe('Test Customized Quick Access and tech-radar plugin', () => {
  test.beforeEach(async ({ page }) => {
    const common = new Common(page);
    await common.loginAsGuest();
  });

  test('Verify Customized Quick Access', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyQuickAccess('COMMUNITY', 'Website', true);
    await homePage.verifyQuickAccess('MONITORING TOOLS', 'Grafana', true);
    await homePage.verifyQuickAccess('SECURITY TOOLS', 'Keycloak', true);
  });

  test('Verify tech-radar', async ({ page }) => {
    const uiHelper = new UIhelper(page);
    const techRadar = new TechRadar(page);

    await uiHelper.openSidebar(SidebarOptions.TechRadar);
    await uiHelper.verifyHeading('Tech Radar');
    await uiHelper.verifyHeading('Company Radar');

    await techRadar.verifyRadarDetails('Languages', 'JavaScript');
    await techRadar.verifyRadarDetails('Storage', 'AWS S3');
    await techRadar.verifyRadarDetails('Frameworks', 'React');
    await techRadar.verifyRadarDetails('Infrastructure', 'ArgoCD');
  });
});
