import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-notes.component.html',
  styleUrl: './transaction-notes.component.css'
})
export class TransactionNotesComponent implements OnInit {
  transactionId: number;
  needsCategorized: boolean;
  notesForm = new FormGroup({
    notes: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {
    this.transactionId = -1;
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
    });

    this.needsCategorized = false;
    this.route.queryParams.subscribe(params => {
      this.needsCategorized = params['needsCategorized'];
    });
  }

  ngOnInit(): void {
    this.transactionService.getTransaction(this.transactionId).subscribe(transaction => {
      this.notesForm.setValue({ notes: transaction.notes });
    });
  }

  save(): void {
    const notes = String(this.notesForm.value.notes);
    this.transactionService.setTransactionNotes(this.transactionId, notes).subscribe(result => {
      this.router.navigate(['/transactions/' + this.transactionId], {
        queryParams: {
          needsCategorized: this.needsCategorized
        }
      });
    });
  }

}
