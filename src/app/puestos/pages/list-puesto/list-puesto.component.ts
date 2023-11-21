import { Component, OnInit } from '@angular/core';
import { Puesto } from '../../interface/puesto';
import { PuestoService } from '../../services/puesto-service.service';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-puesto',
  templateUrl: './list-puesto.component.html',
  styleUrls: ['./list-puesto.component.css'],
  providers: [MessageService]
})
export class ListPuestoComponent implements OnInit{
  public puestos: Puesto[]= []
  puesto : Puesto = {};
  deleteProductDialog: boolean = false;
  filteredPuestos: Puesto[] = [];
  cols: any[] = [];
  filterApplied: boolean = false;

  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  trafoDialog: boolean = false;
  products: Product[] = [];
  selectedPuestos: Puesto[] = [];

  public editFlag: boolean = false;

  constructor(private puestoService: PuestoService, private messageService: MessageService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.puestoService.getPuestos().subscribe( (puesto) => {this.puestos = puesto; console.log(this.puestos)  })
  }

  openNew() {
    this.editFlag = false;
    this.router.navigate(['puesto/add']);
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(puesto: Puesto) {
  this.editFlag = true;
  this.puesto = { ...puesto };
  const puestoId = this.puesto.idxfoPuesto;

  this.router.navigate([`puesto/edit/${puestoId}`]);
}

deleteProduct(puesto: Puesto) {
    this.deleteProductDialog = true;
    this.puesto = { ...puesto };
}

confirmDeleteSelected() {
    //this.deleteProductsDialog = false;
    this.puestos = this.puestos.filter(val => !this.selectedPuestos.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedPuestos = [];
}

confirmDelete() {
    //this.deleteProductDialog = false;
    this.puestos = this.puestos.filter(val => val.idxfoPuesto !== this.puesto.idxfoPuesto);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.puesto = {};
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
    for (let i = 0; i < this.puestos.length; i++) {
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
  console.log(filterValue)

  //const filteredOrders = this.orders.filter((orders) => orders.ott?.toLowerCase().includes(filterValue));

  const filteredPuestos = this.puestos.filter((puestos) => {
    const nroFasesValue = puestos.NroFases?.toString();

    // Separa las palabras en el filtro
    const filterWords = filterValue.split(" ");

    // Verifica si 'fase' está presente en las palabras del filtro
    const isFaseWord = filterWords.some(word => word.toLowerCase() === 'fase');

    // Verifica si NroFases incluye el número ingresado en el filtro
    const nroFasesCondition = filterWords.some(word => nroFasesValue?.includes(word.toLowerCase()));

    return (
      (puestos.CodPuesto?.toLowerCase().includes(filterValue)) ||
      (puestos.Direccion?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filterValue)) ||
      (puestos.EstInstal?.toLowerCase().includes(filterValue)) ||
      (puestos.Fase?.toLowerCase().includes(filterValue)) ||
      (puestos.FecPueServ?.toLowerCase().includes(filterValue)) ||
      (puestos.FecRetiro?.toLowerCase().includes(filterValue)) ||
      (puestos.NroEstructura?.toLowerCase().includes(filterValue)) ||
      (puestos.Montaje?.toLowerCase().includes(filterValue)) ||
      (puestos.NroFases?.toString().includes(filterValue)) ||
      (puestos.Propiedad?.toLowerCase().includes(filterValue)) ||
      (puestos.TipoConex?.toLowerCase().includes(filterValue)) ||
      (puestos.TIpoServ?.toLowerCase().includes(filterValue)) ||
      (puestos.ZonaMunicipal?.toLowerCase().includes(filterValue)) ||
      (puestos.NroFases && nroFasesCondition && isFaseWord)
      );
    });

    console.log('Filtered Puestos:', filteredPuestos);

    if (filterValue) {
      this.filterApplied = true;
      console.log("true")
    }else {
      this.filteredPuestos = [...this.puestos];
      this.filterApplied = false;
      return;
    }

    this.filteredPuestos = filteredPuestos;

    console.log('Filtered Puestos after:', filteredPuestos);

  }
  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);
    
    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedPuestos = this.selectedPuestos.filter(item => item !== trafo);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedPuestos = [...this.selectedPuestos, trafo];
    }

    console.log("check");
}

isSelected(trafo: any): boolean {
    return this.selectedPuestos.includes(trafo);
}

}


