import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { Orden } from '../../interfaces/ott.interface';
import { OttService } from '../../services/ott-service.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  // selector: 'app-list-orden',
  templateUrl: './list-orden.component.html',
  styleUrls: ['./list-orden.component.scss'],
  providers: [MessageService]
})
export class ListOrdenComponent implements OnInit {

  orderDialog: boolean = false;
  public orders: Orden[]= []

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];
  order: Orden = {};
  selectedOrders: Orden[] = [];

  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  filteredOrders: Orden[] = []
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
    private ottService: OttService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
      // const currentUser = this.authService.currentUser()

      this.ottService.getOtts(this.authService.currentUser()!.id).subscribe( (orden) => {this.orders = orden; console.log(this.orders) })
      // this.authService.currentUser.id

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
      //this.order = {};
      //this.submitted = false;
      //this.orderDialog = true;
      this.editFlag = false;
      this.router.navigate(['ott/add']);
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editProduct(orden: Orden) {
      this.editFlag = true
      this.order = { ...orden };
      //this.orderDialog = true;      
      const ottId = this.order.estado;
      console.log(ottId);
       this.router.navigate([`ott/edit/${ottId}`]);
  }

  deleteProduct(orden: Orden) {
      this.deleteProductDialog = true;
      this.order = { ...orden };
  }

  confirmDeleteSelected() {
      this.deleteProductsDialog = false;
      this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Ordenes inactivados con Éxito.', life: 3000 });
      this.selectedOrders = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.orders = this.orders.filter(val => val.ott !== this.order.ott);
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
      this.order = {};
  }

  hideDialog() {
      this.orderDialog = false;
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
      for (let i = 0; i < this.products.length; i++) {
          if (this.orders[i].ott === id) {
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

      //const filteredOrders = this.orders.filter((orders) => orders.ott?.toLowerCase().includes(filterValue));

      const filteredOrders = this.orders.filter((orders) => {
        return (
          (orders.ott?.toLowerCase().includes(filterValue)) ||
          (orders.areaResponsable?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filterValue)) ||
          (orders.descripcion?.toLowerCase().includes(filterValue)) ||
          (orders.estado?.toLowerCase().includes(filterValue)) ||
          (orders.etapaOtt?.toLowerCase().includes(filterValue)) ||
          (orders.fecRecepcion?.toLowerCase().includes(filterValue)) ||
          (orders.personResponsable?.toLowerCase().includes(filterValue)) ||
          (orders.usrCreador?.toLowerCase().includes(filterValue))
          );
        });

      if (filterValue) {
        this.filterApplied = true;
        console.log("true")
      }else {
        this.filteredOrders = [...this.orders];
        this.filterApplied = false;
      }

      this.filteredOrders = filteredOrders;
    }

  onRowClick(order: any) {
    const isSelected = this.isSelected(order);

    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedOrders = this.selectedOrders.filter(item => item !== order);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedOrders = [...this.selectedOrders, order];
    }

    console.log("check");
  }
  editSelected() {
    if (this.selectedOrders.length === 1) {
      const selectedOrder = this.selectedOrders[0];
      this.editProduct(selectedOrder);
    } else if (this.selectedOrders.length === 0) {
      console.log('Ningún elemento seleccionado.');
    } else {
      console.log('Selecciona solo un elemento para editar.');
    }
  }
  
  

  isSelected(order: any): boolean {
      return this.selectedOrders.includes(order);
  }

}
