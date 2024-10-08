export const waitsObjs = {
  muiLinearProgress: 'div[class*="MuiLinearProgress-root"]',
  muiCircularProgress: '[class*="MuiCircularProgress-root"]',
};

export const uiHelperPo = {
  muiButtonLabel: 'span[class^="MuiButton-label"]',
  muiToggleButtonLabel: 'span[class^="MuiToggleButton-label"]',
  muiBoxLabel: 'div[class*="MuiBox-root"] label',
  muiTableHead: 'th[class*="MuiTableCell-root"]',
  muiTableCell: 'td[class*="MuiTableCell-root"]',
  muiTableRow: 'tr[class*="MuiTableRow-root"]',
  muiTypographyColorPrimary: '.MuiTypography-colorPrimary',
  muiSwitchColorPrimary: '.MuiSwitch-colorPrimary',
  muiButtonTextPrimary: '.MuiButton-textPrimary',
  muiCard: cardHeading =>
    `//div[contains(@class,'MuiCardHeader-root') and descendant::*[text()='${cardHeading}']]/..`,
  muiTable: 'table.MuiTable-root',
  muiCardHeader: 'div[class*="MuiCardHeader-root"]',
  muiInputBase: 'div[class*="MuiInputBase-root"]',
  muiTypography: 'span[class*="MuiTypography-root"]',
  muiAlert: 'div[class*="MuiAlert-message"]',
  tabs: '[role="tab"]',
  rowByText: (text: string) => `tr:has(:text-is("${text}"))`,
};
