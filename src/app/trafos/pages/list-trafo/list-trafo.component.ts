import { ChangeDetectorRef, Component, OnInit, ViewChild, computed, inject } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { TrafoService } from '../../services/trafo-service.service';
import { Trafo } from '../../interfaces/trafo.inerface';
import { Router } from '@angular/router';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SelectItem } from 'primeng/api';


@Component({
  templateUrl: './list-trafo.component.html',
  styleUrls: ['./list-trafo.component.css'],
  providers: [MessageService]
})
export class ListTrafoComponent implements OnInit {

  // @ViewChild('dt') dt: Table;

  trafoDialog: boolean = false;
  public trafos: Trafo[]= []

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  trafo: Trafo = {};

  selectedTrafos: Trafo[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  filteredTrafos: Trafo[] = [];

  filterApplied: boolean = false;


  // Varaibles Trafos
  public editFlag: boolean = false;
  public fabricante: any[] = []
  public propietario: any[] = []
  public industria: any[] = []
  public marca: any[] = []
  public estadoEquipo: any[] = []
  public modelo: any[] = []
  public potNominal: any[] = []
  public estaInst: any[] = []
  public tipoTrafo: any[] = []


  constructor(
    private messageService: MessageService,
    private trafoService: TrafoService,
    private router: Router) { }

  ngOnInit() {
      // this.productService.getProducts().then(data => this.products = data);
      // console.log(this.products);
      this.trafoService.getTrafos().subscribe( (trafo) => {this.trafos = trafo; console.log(this.trafos)  })

      //this.filteredTrafos = [...this.trafos];
  }

  openNew() {
      // this.trafo = {};
      // this.submitted = false;
      // this.trafoDialog = true;
      this.editFlag = false;
      this.router.navigate(['trafo/add']);
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(trafo: Trafo) {
    this.editFlag = true;
     this.trafo = { ...trafo };
     const trafoId = this.trafo.idxfoTransformador;

       this.router.navigate([`trafo/edit/${trafoId}`]);

  }

  deleteProduct(trafo: Trafo) {
    this.deleteProductDialog = true;
    this.trafo = { ...trafo };
    
  }

  confirmDeleteSelected() {
    //this.potencias = this.potencias.filter(val => !this.selectedPotencia.includes(val));
    //this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedTrafos = [];
    this.deleteProductsDialog = false;
    //this.globalFilter = '';
    //this.potenciaService.getPotencias().subscribe( (potencia) => {this.potencias = potencia; console.log(this.potencias)}) //console.log(this.editFlag)  })
  }

  confirmDelete() {
    if(this.filterApplied){
      this.trafos = this.filteredTrafos.filter(val => val.idxfoTransformador !== this.trafo.idxfoTransformador);
    }else{
    this.trafos = this.trafos.filter(val => val.idxfoTransformador !== this.trafo.idxfoTransformador);}
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    const potenciaId = this.trafo.idxfoTransformador;
    this.trafoService.delete(potenciaId).subscribe((reponse)=>(console.log('eliminado',this.trafo)));
    //this.potencia = {};
    this.deleteProductDialog = false;
    this.deleteProductsDialog = true;
    this.reloadPage()
  }

  hideDialog() {
    this.trafoDialog = false;
    this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.trafo.idxfoTransformador?.toString().trim()) {
        if (this.editFlag) {
          // Actualizar el transformador existente
          this.trafoService.create(this.trafo).subscribe(
              () => {
                  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Transformador actualizado con éxito.', life: 3000 });
                  // Puedes realizar otras acciones después de actualizar el transformador, si es necesario
              },
              (error) => {
                  console.error('Error al actualizar el transformador:', error);
              }
          );
      } else {
          // Crear un nuevo transformador
          this.trafoService.create(this.trafo).subscribe(
              () => {
                  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Transformador creado con éxito.', life: 3000 });
                  // Puedes realizar otras acciones después de agregar el transformador, si es necesario
              },
              (error) => {
                  console.error('Error al agregar el transformador:', error);
              }
          );
      }

        // Restablecer variables y cerrar el diálogo
        this.trafoDialog = false;
        this.submitted = false;
        this.trafo = {};
    }

  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.trafos[i].idxfoTransformador?.toString() === id) {
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

    const filteredTrafos = this.trafos.filter((trafo) => {
      const cleanFilterValue = filterValue.replace(/\s/g, '');
      const cleanKvaValue = trafo.PotNominal?.toString().replace(/\s/g, '');

    //const filteredTrafos = this.trafos.filter((trafo) => trafo.cia?.toLowerCase().includes(filterValue));

      return (
        (trafo.NroCIA?.toLowerCase().includes(filterValue)) ||
        (trafo.NroSerie?.toLowerCase().includes(filterValue)) ||
        (trafo.Marca?.toLowerCase().includes(filterValue)) ||
        (trafo.EstadoTrafo?.toLowerCase().includes(filterValue)) ||
        (trafo.Fabricante?.toString().includes(filterValue)) ||
        (trafo.PotNominal?.toLowerCase().includes(filterValue)) ||
        (trafo.Modelo?.toLowerCase().includes(filterValue)) ||
        //(trafo.ott?.toLowerCase().includes(filterValue)) ||
        (trafo.Propiedad?.toLowerCase().includes(filterValue)) ||
        (trafo.responsable?.toLowerCase().includes(filterValue)) ||
        (trafo.TipoXfo?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filterValue)) ||
        //(trafo.ubicacionActual?.toLowerCase().includes(filterValue)) ||
        (filterValue.endsWith("kva") && cleanKvaValue?.includes(cleanFilterValue.slice(0, -3)))
      );
    });

      if (filterValue) {
        this.filterApplied = true;
      }else {
        this.filteredTrafos = [...this.trafos];
        this.filterApplied = false;
      }

    this.filteredTrafos = filteredTrafos;
  }

  containsNumber(value: any): boolean {
    const stringValue = value.toString();
    return /\d/.test(stringValue);
  }

  onRowClick(order: any) {
    const isSelected = this.isSelected(order);

    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedTrafos = this.selectedTrafos.filter(item => item !== order);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedTrafos = [...this.selectedTrafos, order];
    }

    console.log("check");
  }
  editSelected() {
    if (this.selectedTrafos.length === 1) {
      const selectedOrder = this.selectedTrafos[0];
      this.editProduct(selectedOrder);
    } else if (this.selectedTrafos.length === 0) {
      console.log('Ningún elemento seleccionado.');
    } else {
      console.log('Selecciona solo un elemento para editar.');
    }
  }
  deleteSelected() {
    if (this.selectedTrafos.length === 1) {
      const selectedOrder = this.selectedTrafos[0];
      this.deleteProduct(selectedOrder);
    } else if (this.selectedTrafos.length === 0) {
      console.log('Ningún elemento seleccionado.');
    } else {
      console.log('Selecciona solo un elemento para editar.');
    }
  }

isSelected(trafo: any): boolean {
    return this.selectedTrafos.includes(trafo);
}
reloadPage() {
  window.location.reload();
}

}
