import { Component } from '@angular/core';
import { Potencia } from '../../model/potencia';
import { Product } from 'src/app/demo/api/product';
import { PotenciaService } from '../../services/potencia.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-potencias',
  templateUrl: './potencias.component.html',
  styleUrls: ['./potencias.component.scss'],
  providers: [MessageService]
})
export class PotenciasComponent {
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

  public editFlag: boolean = false;

  constructor(private potenciaService: PotenciaService, private messageService: MessageService, private productService: ProductService) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.potenciaService.getPotencias().subscribe( (potencia) => {this.potencias = potencia; console.log(this.potencias)  })
  }

  openNew() {
    this.potencia = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(potencia: Potencia) {
    this.potencia = { ...potencia };
    this.trafoDialog = true;
    this.editFlag = true;
}

deleteProduct(potencia: Potencia) {
    this.deleteProductDialog = true;
    this.potencia = { ...potencia };
}

confirmDeleteSelected() {
    //this.deleteProductsDialog = false;
    this.potencias = this.potencias.filter(val => !this.selectedPotencia.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedPotencia = [];
}

confirmDelete() {
    //this.deleteProductDialog = false;
    this.potencias = this.potencias.filter(val => val.codigo !== this.potencia.codigo);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.potencia = {};
}

hideDialog() {
    //this.trafoDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;


    // if (this.trafo.NroCIA?.trim()) {
    //     if (this.trafo.id) {
    //         // @ts-ignore
    //         this.trafo.inventoryStatus = this.trafo.inventoryStatus.value ? this.trafo.inventoryStatus.value : this.trafo.inventoryStatus;
    //         this.products[this.findIndexById(this.trafo.id)] = this.trafo;
    //         this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador actualizado con Éxito.', life: 3000 });
    //     } else {
    //         this.trafo.id = this.createId();
    //         this.trafo.code = this.createId();
    //         this.trafo.image = 'product-placeholder.svg';
    //         // @ts-ignore
    //         this.trafo.inventoryStatus = this.trafo.inventoryStatus ? this.trafo.inventoryStatus.value : 'INSTOCK';
    //         this.products.push(this.trafo);
    //         this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador creado con Éxito.', life: 3000 });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.trafo = {};
    // }
    
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

    //const filteredTrafos = this.trafos.filter((trafo) => trafo.cia?.toLowerCase().includes(filterValue));

      return (
        (potencia.codigo?.toLowerCase().includes(filterValue)) ||
        (potencia.descripcion?.toLowerCase().includes(filterValue)) ||
        (potencia.descripcion?.toLowerCase().includes(filterValue))
      );
    });

      if (filterValue) {
        this.filterApplied = true;
      }else {
        this.filteredPotencias = [...this.potencias];
        this.filterApplied = false;
      }

    this.filteredPotencias = filteredPotencias;
  }

}
