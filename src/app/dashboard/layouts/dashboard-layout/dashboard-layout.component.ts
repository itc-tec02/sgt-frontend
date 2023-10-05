import { Component, OnInit, ViewChild, computed, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';



import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';


@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  providers: [MessageService]
})
export class DashboardLayoutComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  // Varaibles Trafos
  public editFlag: boolean = false;
  public fabricante: any[] = []
  public propietario: any[] = []
  public indistria: any[] = []
  public marca: any[] = []
  public estadoEquipo: any[] = []

  constructor(private productService: ProductService, private messageService: MessageService) { }

  ngOnInit() {
      // this.productService.getProducts().then(data => this.products = data);
      // console.log(this.products);
      this.products = [
        {
          id: 'ITC ID',
          code: 'test01',
          name: 'Edson',
          description: 'Prueba',
          price: 5000,
          quantity: 2,
          inventoryStatus: { label:'pruebita', value:'Holis' },
          category: 'consultores',
          image: 'Logo_IT _Vector.png',
          rating: 10,
        }
      ]
      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];
      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
      this.fabricante = [
        { label: 'ABB', value: 'abb' }
      ];
      this.propietario = [
        { label:'Cobee', value: 'cobee' },
        { label:'Desconocido', value: 'desconocido' },
        { label:'Dlp', value: 'dlp' },
        { label:'Emprelpaz', value: 'emprelpaz' },
        { label:'Epz', value: 'epz' },
        { label:'Ham', value: 'ham' },
        { label:'Otro', value: 'otro' },
        { label:'Particular', value: 'particular' },
        { label:'Prefectura', value: 'prefectura' },
        { label:'Sin Datos', value: 'sin datos' },
      ];
      this.indistria = [

        { label:'ALEMANA', value: 'alemana' },
        { label:'AMERICANA', value: 'americana' },
        { label:'ARGENTINA', value: 'argentina' },
        { label:'BOLIVIANA', value: 'boliviana' },
        { label:'BRASILERA', value: 'brasilera' },
        { label:'CANADIENSE', value: 'canadiense' },
        { label:'CHILENA', value: 'chilena' },
        { label:'COLOMBIANA', value: 'colombiana' },
        { label:'ESPAÑOLA', value: 'española' },
        { label:'JAPONESA', value: 'japonesa' },
        { label:'OTROS', value: 'otros' },
        { label:'PERUANA', value: 'peruana' },
        { label:'VENEZOLANA', value: 'venezolana' },
      ];
      this.marca = [
        { label:'ABB', value: 'abb' },
        { label:'ACEC', value: 'acec' },
        { label:'AEG', value: 'aeg' },
        { label:'AICHI', value: 'aichi' },
        { label:'ALKARGO', value: 'alkargo' },
        { label:'ARIMET', value: 'arimet' },
        { label:'ARTRANS SRTL', value: 'artrans srtl' },
        { label:'BRUCE PEBLES', value: 'bruce pebles' },
        { label:'GORDON', value: 'gordon' },
        { label:'HACKBRIDGE', value: 'hackbridge' },
        { label:'IDENSON', value: 'idenson' },
        { label:'ITB', value: 'itb' },
        { label:'MALONEY ELECTRIC', value: 'maloney electric' },
        { label:'TAMURA', value: 'tamura' },
      ]

  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
      this.editFlag = false;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
      this.editFlag = true
  }

  deleteProduct(product: Product) {
      this.deleteProductDialog = true;
      this.product = { ...product };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
      this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
      this.product = {};
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name?.trim()) {
          if (this.product.id) {
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador actualizado con Éxito.', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.code = this.createId();
              this.product.image = 'product-placeholder.svg';
              // @ts-ignore
              this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador creado con Éxito.', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
