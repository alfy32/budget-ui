import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from '../categories.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });


  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = [];
      for (let i = 0; i < categories.length; i++) {
        this.categories.push({
          object: categories[i],
          form: new FormGroup({
            name: new FormControl(categories[i].name)
          })
        })
      }
    });
  }

  addCategory(): void {
    this.categoriesService.addCategory(this.categoryForm.value.name).subscribe(() => this.getCategories());
  }

  updateCategory(category: any): void {
    this.categoriesService.updateCategory(category.object.id, category.form.value.name).subscribe(() => this.getCategories());
  }

  deleteCategory(id: number): void {
    this.categoriesService.deleteCategory(id).subscribe(() => this.getCategories());
  }

}
