import { Component, NgZone, EventEmitter, Output } from '@angular/core';
import { Potencia } from '../../model/potencia';
import { Product } from 'src/app/demo/api/product';
import { PotenciaService } from '../../services/potencia.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-potencias',
  //templateUrl: './potencias.component.html',
  templateUrl: './potencias.component.html',
  styleUrls: ['./potencias.component.scss'],
  providers: [MessageService]
})
export class PotenciasComponent {
  @Output() showDialogEvent = new EventEmitter<Potencia>();
  public potencias: Potencia[]= [];
  potencia : Potencia = {};
  deleteProductDialog: boolean = false;
  filterApplied: boolean = false;
  filteredPotencias: Potencia[] = [];
  cols: any[] = [];

  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  trafoDialog: boolean = false;
  products: Product[] = [];
  selectedPotencia: Potencia[] = [];
  potenciaId: any;

  public editFlag: Boolean;

  constructor(private potenciaService: PotenciaService, private messageService: MessageService, private productService: ProductService, private cdRef: ChangeDetectorRef, private router: Router, private ngZone: NgZone) {
    this.editFlag = false
   }

  ngOnInit() {
    this.potenciaService.getPotencias().subscribe( (potencia) => {this.potencias = potencia; console.log(this.potencias), console.log(this.editFlag)  })
  }

  openNew() {
    this.editFlag = false;
    // this.potencia = {};
    // this.submitted = false;
    // this.trafoDialog = true;    
    console.log('into openew')
    this.router.navigate(['potn/add']);
    console.log('opennew',this.editFlag)
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(potencia: Potencia) {
    this.deleteProductDialog = true;
    this.potencia = { ...potencia };
    
  }

  confirmDeleteSelected() {
    //this.potencias = this.potencias.filter(val => !this.selectedPotencia.includes(val));
    //this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedPotencia = [];
    this.deleteProductsDialog = false;
  }

  confirmDelete() {
    this.potencias = this.potencias.filter(val => val.Codigo !== this.potencia.Codigo);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    const potenciaId = this.potencia.Codigo;
    this.potenciaService.delete(potenciaId).subscribe((reponse)=>(console.log('eliminado',this.potencia)));
    this.deleteProductDialog = false;
    this.deleteProductsDialog = true;
  }

  hideDialog() {
    this.trafoDialog = false;
    this.submitted = false;
  }

  editProduct(potencia: Potencia) {
    this.editFlag = true;
     this.potencia = { ...potencia };
     const potenciaId = this.potencia.Codigo;

       this.router.navigate([`potn/edit/${potenciaId}`]);

  }

  reloadPage() {
    window.location.reload();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.potencias.length; i++) {
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
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    const filteredPotencias = this.potencias.filter((potencia) => {
      return (
        (potencia.Codigo?.toString().toLowerCase().includes(filterValue)) ||
        (potencia.Descripcion?.toLowerCase().includes(filterValue)) ||
        (potencia.Valor?.toString().toLowerCase().includes(filterValue))
      );
    });

    if (filterValue) {
      this.filterApplied = true;
    } else {
      this.filteredPotencias = [...this.potencias];
      this.filterApplied = false;
    }

    this.filteredPotencias = filteredPotencias;
  }

  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);

    if (isSelected) {
      this.selectedPotencia = this.selectedPotencia.filter(item => item !== trafo);
    } else {
      this.selectedPotencia = [...this.selectedPotencia, trafo];
    }
  }

  isSelected(trafo: any): boolean {
    return this.selectedPotencia.includes(trafo);
  }
}
