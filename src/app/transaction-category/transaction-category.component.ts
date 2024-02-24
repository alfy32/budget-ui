import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-category.component.html',
  styleUrl: './transaction-category.component.css'
})
export class TransactionCategoryComponent implements OnInit {
  transactionId: number = -1;
  needsCategorized: boolean = false;
  categoryForm: FormGroup = new FormGroup({});
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
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
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  saveCategory(name: string): void {
    this.transactionService.setTransactionCategory(this.transactionId, name).subscribe(() => {
      this.router.navigate(['/transactions/' + this.transactionId], {
        queryParams: {
          needsCategorized: this.needsCategorized
        }
      });
    });
  }
}