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
  selectedOptionCrGroups: any;
  groups: any[] = [];
  option : any;
  valuee: any;
  crId: any;

  public editFlag: boolean = false;

  constructor(private crService: CrsService, private messageService: MessageService, private productService: ProductService, private router: Router) {
    this.option = 'alm';
   }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.crService.getCrs(this.option).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })

    this.groups = [
      { label: 'Almacén', value: 'alm' },
      { label: 'Administrador del Sistema', value: 'adm' },      
      { label: 'Centro de Operación e Información', value: 'coi' },
      { label: 'Contratista Pruebas Técnicas', value: 'cpt' },
      { label: 'Operador Mantenimiento Redes', value: 'omr' }
    ];
  }

  openNew() {
    this.cr = {};
    this.submitted = false;
    //this.trafoDialog = true;
    this.editFlag = false;

    if(this.option !== null || this.selectedOptionCrGroups.value === 'cr/alm'){
      this.router.navigate([`cr/${this.option}/add`, { option: this.option }]);
    }else{
      this.router.navigate([`cr/alm/add`, { option: this.option }]);
    }

    //this.router.navigate([`cr/${this.option}/add`]);
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(cr: Cr) {
    this.cr = { ...cr };
    //this.trafoDialog = true;
    this.editFlag = true;
    const crId = this.cr.CodCR;
    if(this.option !== null || this.selectedOptionCrGroups.value === 'cr/alm'){
      this.router.navigate([`cr/${this.option}/edit/${crId}`, { option: this.option }]);
    }else{
      this.router.navigate([`cr/alm/edit/${crId}`,{ option: this.option }]);
    }
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
    this.crs = this.crs.filter(val => val.CodCR !== this.cr.CodCR);
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
        if (this.crs[i].CodCR === id) {
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
        (cr.CodCR?.toLowerCase().includes(filterValue)) ||
        (cr.abreviatura?.toLowerCase().includes(filterValue)) ||
        (cr.NombreCR?.toLowerCase().includes(filterValue))
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

  onCascadeSelectChange(){
    console.log('Opción seleccionada:', this.selectedOptionCrGroups);
    this.option = this.selectedOptionCrGroups.value
    this.router.navigate([`cr/${this.option}`]);
    switch (this.option) {
      case 'alm':
        this.crService.getCrs(this.option.toString().toLowerCase()).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
        
        break;
      case 'adm':
        this.crService.getCrs(this.option.toString()).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
        break;
      case 'coi':
        this.crService.getCrs(this.option.toString()).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
        break;
      case 'cpt':
        this.crService.getCrs(this.option.toString()).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
        break;
      case 'omr':
        this.crService.getCrs(this.option.toString()).subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
        break;
      default:
        this.crService.getCrs('').subscribe(cr => this.crs = cr);
        break;
    }
    
  }  

  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);
    
    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedCr = this.selectedCr.filter(item => item !== trafo);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedCr = [...this.selectedCr, trafo];
    }

    console.log("check");
}

isSelected(trafo: any): boolean {
    return this.selectedCr.includes(trafo);
}
}
