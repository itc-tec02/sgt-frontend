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

  @ViewChild('dt') dt: Table;

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


  constructor(private cdRef: ChangeDetectorRef, private productService: ProductService, private messageService: MessageService, private trafoService: TrafoService, private router: Router) {
    this.dt = {} as Table
   }

  ngOnInit() {
      // this.productService.getProducts().then(data => this.products = data);
      // console.log(this.products);
      this.trafoService.getTrafos().subscribe( (trafo) => {this.trafos = trafo; console.log(this.trafos)  })

      //this.filteredTrafos = [...this.trafos];


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
      //* Provisional despues se tomará del servicio de Trafo
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
      this.industria = [

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
      //! Es provisional despues se tomaran todos los dropdown de la base de datos
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
      ];
      this.estadoEquipo = [
        { label:'CHATARRA', value:'chatarra' },
        { label:'MALOGRADO', value:'malogrado' },
        { label:'NUEVO', value:'nuevo' },
        { label:'USADO', value:'usado' },
      ];
      this.modelo = [
        { label:'MODELO 1', value:'modelo 1' },
      ];
      this.potNominal = [
        { label: 900, value: 900 },
        { label: 1000, value: 1000 },
        { label: 1200, value: 1200 },
        { label: 1250, value: 1250 },
        { label: 1300, value: 1300 },
        { label: 1500, value: 1500 },
        { label: 1600, value: 1600 },
        { label: 2000, value: 2000 },
        { label: 2300, value: 2300 },
        { label: 2500, value: 2500 },
      ];
      this.estaInst = [
        { label:'DESCONOCIDO', value:'desconocido' },
        { label:'EN SERVICIO', value:'en servicio' },
        { label:'FUERA DE SERVICIO', value:'fuera de servicio' },
        { label:'PROYECTO PARA REEMPLZAR', value:'proyecto para reemplzar' },
        { label:'PROYECTADO PARA RETIRO', value:'proyectado para retiro' },
        { label:'PROYECTADO PARA SERVICIO', value:'proyectado para servicio' },
        { label:'RETIRADO', value:'retirado' },
        { label:'SIN DATOS', value:'sin datos' },
      ];
      this.tipoTrafo = [
        { label:'Monofásico', value:'sin datos' },
        { label:'Trifásico', value:'sin datos' },
      ]
      // public tipoTrafo: any[] = []
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
      this.deleteProductsDialog = false;
      this.trafos = this.trafos.filter(val => !this.selectedTrafos.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
      this.selectedTrafos = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.trafos = this.trafos.filter(val => val.idxfoTransformador !== this.trafo.idxfoTransformador);
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
      this.trafo = {};
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

  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);

    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedTrafos = this.selectedTrafos.filter(item => item !== trafo);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedTrafos = [...this.selectedTrafos, trafo];
    }

    console.log("check");
}

isSelected(trafo: any): boolean {
    return this.selectedTrafos.includes(trafo);
}

}
