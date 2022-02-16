export interface ApiRequestInterface {
  test: boolean;
  language: string;
  command: string;
  merchant: Merchant;
  bankListInformation?: BankListInformation;
}

export interface Merchant {
  apiLogin: string;
  apiKey: string;
}

export interface BankListInformation {
  paymentMethod: string;
  paymentCountry: string;
}

