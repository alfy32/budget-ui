import { Category } from "./category";

export interface Transaction {
    id: number,
    bankTransactionId: number,
    account: string,
    transactionDate: string,
    description: string,
    comments: string,
    checkNumber: string,
    amount: number,
    category?: Category,
    tags: string,
    notes: string,
}