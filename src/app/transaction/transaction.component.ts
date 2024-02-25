import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionDescriptionComponent } from '../transaction-description/transaction-description.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TransactionDescriptionComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit {
  needsCategorized: boolean = false;
  transaction: Transaction = {
    id: -1,
    bankTransactionId: -1,
    account: '',
    date: '',
    description: '',
    comments: '',
    checkNumber: '',
    amount: 0,
    category: '',
    tags: '',
    notes: '',
  };
  editingDescription: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    this.route.params.subscribe(params => this.getTransaction(params['id']));
    this.route.queryParams.subscribe(params => this.needsCategorized = params['needsCategorized'])
  }

  ngOnInit(): void { }

  onClickDescription(): void {
    if (!this.editingDescription) {
      this.editingDescription = true;
    }
  }

  onSavedDescription(): void {
    this.editingDescription = false;
    this.getTransaction(this.route.snapshot.params['id']);
  }

  getTransaction(id: number): void {
    this.transactionService.getTransaction(id).subscribe(transaction => {
      this.transaction = transaction

      if (this.transaction == null) {

      }

      if (this.transaction.category == undefined) {
        this.transaction.category = "Select Category";
      }

      if (this.transaction.tags == undefined) {
        this.transaction.tags = "Add Tags";
      }

      if (this.transaction.notes == undefined) {
        this.transaction.notes = "Add Notes";
      }
    });
  }

}
