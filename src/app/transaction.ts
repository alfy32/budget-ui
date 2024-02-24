export interface Transaction {
    id: number,
    bankTransactionId: number,
    account: string,
    date: string,
    description: string,
    comments: string,
    checkNumber: string,
    amount: number,
    category: string,
    tags: string,
    notes: string,
}