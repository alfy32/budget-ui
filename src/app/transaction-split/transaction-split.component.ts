import { Component, NgModule, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Split } from '../split';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { SplitTransaction } from '../splitTransaction';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-transaction-split',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxCurrencyDirective],
  templateUrl: './transaction-split.component.html',
  styleUrl: './transaction-split.component.css'
})
export class TransactionSplitComponent implements OnInit {
  id: string;
  split?: Split;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService,
  ) {
    this.id = '';
    this.categories = [];
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getTransactions();
    this.getCategories();
  }

  getTransactions(): void {
    this.transactionService.getSplit(this.id).subscribe(split => this.split = split);
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  getOriginalAmount(): number {
    if (this.split && this.split.bankTransaction) {
      return this.split.bankTransaction.amount / 100;
    }

    return 0;
  }

  addTransaction(): void {
    this.split?.transactions.push({
      id: '',
      description: this.split.transactions[0].description,
      categoryId: this.split.transactions[0].categoryId,
      amount: 0,
    });
  }

  removeTransaction(index: number): void {
    this.split?.transactions.splice(index, 1);
    this.updateTotals();
  }

  updateTotals(): void {
    if (this.split) {
      let remaining = this.split.bankTransaction?.amount || 0;
      if (remaining < 0) {
        remaining = -remaining;
      }
      remaining = remaining;
      console.log(remaining);
      for (let i = 1; i < this.split.transactions.length; i++) {
        console.log(this.split.transactions[i].amount);
        remaining -= this.split.transactions[i].amount * 100;
      }
      this.split.transactions[0].amount = remaining / 100;
    }
  }

  saveSplit(): void {
    this.transactionService.saveSplit(this.split).subscribe(split => {
      this.split = split
    });
  }

}
