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
    this.potencias = this.potencias.filter(val => val.Codigo !== this.potencia.Codigo);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.potencia = {};
}

hideDialog() {
    //this.trafoDialog = false;
    this.submitted = false;
}

saveProduct() {
  this.submitted = true;

  // Verificar que todos los campos requeridos tengan valores
  if (this.potencia.Codigo && this.potencia.Valor) {
    if (this.editFlag) {
      this.potenciaService.actualizarPotencia(this.potencia).subscribe(tarea =>{
        console.log("potencia editada", tarea);
      })
    } else {
      // Agregar nueva potencia
      this.potenciaService.agregarPotencia(this.potencia).subscribe(tarea =>{
        console.log("potencia agregada", tarea);
      })
    }

    this.trafoDialog = false;
    this.potencia = {};
  } else {
    // Mostrar mensaje de error o realizar alguna acción si los campos no están completos
    console.error('Todos los campos son obligatorios.');
  }
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
        (potencia.Codigo?.toString().toLowerCase().includes(filterValue)) ||
        (potencia.Descripcion?.toLowerCase().includes(filterValue)) ||
        (potencia.Valor?.toString().toLowerCase().includes(filterValue))
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

  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);
    
    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedPotencia = this.selectedPotencia.filter(item => item !== trafo);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedPotencia = [...this.selectedPotencia, trafo];
    }

    console.log("check");
}

isSelected(trafo: any): boolean {
    return this.selectedPotencia.includes(trafo);
}

}
