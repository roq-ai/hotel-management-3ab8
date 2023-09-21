interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin'],
  customerRoles: [],
  tenantRoles: ['Admin', 'Hotel Manager'],
  tenantName: 'Hotel',
  applicationName: 'Hotel Management System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage users', 'Manage hotels', 'Manage rooms', 'Manage bookings'],
  getQuoteUrl: 'https://app.roq.ai/proposal/62a4d39f-9823-429c-bf83-ec5435d449d0',
};
