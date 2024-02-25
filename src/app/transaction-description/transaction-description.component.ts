import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TransactionService } from '../transaction.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-description',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-description.component.html',
  styleUrl: './transaction-description.component.css'
})
export class TransactionDescriptionComponent implements OnInit {
  transactionId: number = -1;
  needsCategorized: boolean = false;
  originalDescription: string = '';
  descriptionForm = new FormGroup({
    description: new FormControl(''),
  });

  @Output() saved = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      this.needsCategorized = params['needsCategorized'];
    });
  }

  ngOnInit(): void {
    this.transactionService.getTransactionDescription(this.transactionId).subscribe(transaction => {
      this.descriptionForm.setValue({ description: transaction.description });
      this.originalDescription = transaction?.originalDescription;
    });
  }

  saveDescription(): void {
    const description = String(this.descriptionForm.value.description);
    this.transactionService.setTransactionDescription(this.transactionId, description).subscribe(result => {
      this.saved.emit(true);
    });
  }

  resetDescription(): void {
    console.log(this.originalDescription);
    this.descriptionForm.setValue({
      description: this.originalDescription
    });
  }

}
