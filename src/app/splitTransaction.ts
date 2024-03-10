import { BankTransaction } from "./bankTransaction";
import { Category } from "./category";

export interface SplitTransaction {
    id: string,
    description: string,
    categoryId?: string,
    amount: number,
}