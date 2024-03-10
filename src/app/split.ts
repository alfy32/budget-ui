import { BankTransaction } from "./bankTransaction";
import { SplitTransaction } from "./splitTransaction";
import { Transaction } from "./transaction";

export interface Split {
    bankTransaction?: BankTransaction,
    transactions: SplitTransaction[],
}