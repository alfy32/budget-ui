import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionDescriptionComponent } from './transaction-description/transaction-description.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { CategoriesComponent } from './categories/categories.component';

import { TransactionsUploadComponent } from './transactions-upload/transactions-upload.component';
import { TransactionCategoryComponent } from './transaction-category/transaction-category.component';
import { TransactionTagsComponent } from './transaction-tags/transaction-tags.component';
import { TransactionNotesComponent } from './transaction-notes/transaction-notes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    { path: 'transactions', component: TransactionsComponent },
    { path: 'transactions/:id', component: TransactionComponent },
    { path: 'transactions/:id/description', component: TransactionDescriptionComponent },
    { path: 'transactions/:id/category', component: TransactionCategoryComponent },
    { path: 'transactions/:id/tags', component: TransactionTagsComponent },
    { path: 'transactions/:id/notes', component: TransactionNotesComponent },

    { path: 'budgets', component: BudgetsComponent },
    { path: 'categories', component: CategoriesComponent },

    { path: 'transactions-upload', component: TransactionsUploadComponent },
];
