export const homePagePO = {
  searchBar: 'input[aria-label="Search"]',
  muiAccordion: 'div[class*="MuiAccordion-root-"]',
};

export const catalogImportPO = {
  componentURL: 'input[name="url"]',
};

export const backstageShowcasePO = {
  tableNextPage: 'button[aria-label="Next Page"]',
  tablePreviousPage: 'button[aria-label="Previous Page"]',
  tableLastPage: 'button[aria-label="Last Page"]',
  tableFirstPage: 'button[aria-label="First Page"]',
  tableRows: 'table[class*="MuiTable-root-"] tbody tr',
  tablePageSelectBox: 'div[class*="MuiTablePagination-input"]',
};

export const settingsPagePO = {
  userSettingsMenu: 'button[data-testid="user-settings-menu"]',
  signOut: 'li[data-testid="sign-out"]',
};

export const roleFormPO = {
  roleName: 'input[name="name"]',
  roledescription: 'input[name="description"]',
  addUsersAndGroups: 'input[name="add-users-and-groups"]',
  addPermissionPolicy: 'button[name="add-permission-policy"]',
  selectMember: (label: string) => `span[data-testid="${label}"]`,
  selectPermissionPolicyPlugin: (row: number) =>
    `input[name="permissionPoliciesRows[${row}].plugin"]`,
  selectPermissionPolicyPermission: (row: number) =>
    `input[name="permissionPoliciesRows[${row}].permission"]`,
  selectPolicy: (row: number, policy: number, policyName: string) =>
    `input[name="permissionPoliciesRows[${row}].policies[${policy}].policy-${policyName}"]`,
};

export const roleListPO = {
  editRole: (name: string) => `span[data-testid="update-role-${name}"]`,
  deleteRole: (name: string) => `span[data-testid="delete-role-${name}"]`,
};

export const deleteRolePO = {
  roleName: 'input[name="delete-role"]',
};

export const roleOverviewPO = {
  updatePolicies: 'span[data-testid="update-policies"]',
  updateMembers: 'span[data-testid="update-members"]',
};
