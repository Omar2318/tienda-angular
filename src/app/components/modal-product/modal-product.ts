import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Products } from '../../services/products';

@Component({
  selector: 'app-modal-product',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-product.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProduct {
  private fb = inject(FormBuilder);
  private productsService = inject(Products);

  formProduct: FormGroup;
  openModal = signal(false);
  productSaved = output<void>();

  constructor() {
    this.formProduct = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],

        price: ['', [Validators.required, Validators.min(1)]],

        out_price: ['', [Validators.required, Validators.min(1)]],

        stock: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],

        category: ['', [Validators.required]],

        image_url: ['', [Validators.required]],

        description: ['', [Validators.required, Validators.minLength(30)]],
      },
      {
        validators: this.priceOutGreaterThanPrice,
      },
    );
  }

  priceOutGreaterThanPrice(group: AbstractControl) {
    const price = group.get('price')?.value;
    const priceOut = group.get('out_price')?.value;

    if (!priceOut || !price) return null;

    if (priceOut < price) {
      group.get('out_price')?.setErrors({
        menor: true,
      });
    }

    console.log(group.get('out_price')?.errors);

    return null;
  }

  open() {
    this.openModal.set(true);
  }

  close() {
    this.openModal.set(false);
    this.formProduct.reset();
  }

  async saveProduct() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
      return;
    }

    const newProduct = {
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      out_price: this.formProduct.value.out_price,
      stock: this.formProduct.value.stock,
      category: this.formProduct.value.category,
      url_image: this.formProduct.value.image_url,
      description: this.formProduct.value.description,
    };

    const result = await this.productsService.insertProduct(newProduct);

    if (result) {
      this.close();
      this.productSaved.emit();
    }
  }
}
