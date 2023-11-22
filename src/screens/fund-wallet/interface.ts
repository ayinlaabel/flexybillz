export interface BankAccountItem {
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  userAccountId: number;
}

export interface renderBankAccountProps {
  item: BankAccountItem;
  index?: number;
}
