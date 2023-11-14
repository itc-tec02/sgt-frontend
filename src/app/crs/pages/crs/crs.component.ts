import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Cr } from '../../model/cr';
import { Product } from 'src/app/demo/api/product';
import { CrsService } from '../../services/crs.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crs',
  templateUrl: './crs.component.html',
  styleUrls: ['./crs.component.scss'],
  providers: [MessageService]
})
export class CrsComponent {
  public crs: Cr[]= [];
  cr : Cr = {};
  deleteProductDialog: boolean = false;
  filterApplied: boolean = false;
  filteredCrs: Cr[] = [];
  cols: any[] = [];

  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  trafoDialog: boolean = false;
  products: Product[] = [];
  selectedCr: Cr[] = [];
  selectedOptionCr: Cr[] = [];
  groups: any[] = [];

  public editFlag: boolean = false;

  constructor(private crService: CrsService, private messageService: MessageService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.crService.getCrs().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })

    this.groups = [
      { label: 'Administrador del Sistema', value: 'admsist' },
      { label: 'Almacén', value: 'alm' },
      { label: 'Centro de Operación e Información', value: 'opeinf' },
      { label: 'Contratista Pruebas Técnicas', value: 'prutec' },
      { label: 'Operador Mantenimiento Redes', value: 'mantred' }
    ];
  }

  openNew() {
    this.cr = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(cr: Cr) {
    this.cr = { ...cr };
    this.trafoDialog = true;
    this.editFlag = true;
}

deleteProduct(potencia: Cr) {
    this.deleteProductDialog = true;
    this.cr = { ...potencia };
}

confirmDeleteSelected() {
    //this.deleteProductsDialog = false;
    this.crs = this.crs.filter(val => !this.selectedCr.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedCr = [];
}

confirmDelete() {
    //this.deleteProductDialog = false;
    this.crs = this.crs.filter(val => val.codigo !== this.cr.codigo);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.cr = {};
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
    for (let i = 0; i < this.crs.length; i++) {
        if (this.crs[i].codigo === id) {
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

    const filteredCrs = this.crs.filter((cr) => {

    //const filteredTrafos = this.trafos.filter((trafo) => trafo.cia?.toLowerCase().includes(filterValue));

      return (
        (cr.codigo?.toLowerCase().includes(filterValue)) ||
        (cr.abreviatura?.toLowerCase().includes(filterValue)) ||
        (cr.nombre?.toLowerCase().includes(filterValue))
      );
    });

      if (filterValue) {
        this.filterApplied = true;
      }else {
        this.filteredCrs = [...this.crs];
        this.filterApplied = false;
      }

    this.filteredCrs = filteredCrs;
  }

  onCascadeSelectChange(event: any) {
    if (event.value) {
      // Suponiendo que el valor de cada opción corresponde a la ruta deseada
      const selectedOption = event.value.toLowerCase();
      const route = `/cr/${selectedOption}`;
      this.router.navigate([route]);
      console.log(this.router.url)
    }
  }
  

}
