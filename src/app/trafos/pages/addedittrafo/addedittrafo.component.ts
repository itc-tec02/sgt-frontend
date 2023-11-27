import { Component } from '@angular/core';
import { Trafo } from '../../interfaces/trafo.inerface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TrafoService } from '../../services/trafo-service.service';
import { Grupo } from 'src/app/grupos/model/grupo';

@Component({
  selector: 'app-addedittrafo',
  templateUrl: './addedittrafo.component.html',
  styleUrls: ['./addedittrafo.component.css'],
  providers: [MessageService]
})
export class AddedittrafoComponent {
  trafos: Trafo[] = [];
  trafo : Trafo = {};
  grupo: Grupo = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPuesto: Trafo[] = [];
  trafoId: any;
  //potenciaData: Puesto;
  editFlag: boolean;
  trafoDialog: boolean = false;
  cols: any[] = [];
  public statuses: any[] = [];
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
    private trafoService: TrafoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //this.potenciaData = {} as Puesto
    this.trafoId= this.route.snapshot.paramMap.get('id');
    this.editFlag = !!this.trafoId;
    //console.log(this.editFlag)
  }
  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.trafoService.getById(this.trafoId).subscribe((response: any) => {
        this.trafo = response
        //console.log('ngoninit addedit',this.editFlag)
      })
    }
    
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
    { label: 'ABB', value: 'ABB' }
  ];
  this.propietario = [
    { label:'Cobee', value: 'cobee' },
    { label:'Desconocido', value: 'desconocido' },
    { label:'Dlp', value: 'dlp' },
    { label:'Emprelpaz', value: 'emprelpaz' },
    { label:'Epz', value: 'EPZ' },
    { label:'Ham', value: 'ham' },
    { label:'Otro', value: 'otro' },
    { label:'Particular', value: 'PAR' },
    { label:'Prefectura', value: 'prefectura' },
    { label:'Sin Datos', value: 'sin datos' },
  ];
  this.industria = [

    { label:'ALEMANA', value: 'GER' },
    { label:'AMERICANA', value: 'USA' },
    { label:'ARGENTINA', value: 'ARG' },
    { label:'BOLIVIANA', value: 'BOL' },
    { label:'BRASILERA', value: 'BRA' },
    { label:'CANADIENSE', value: 'CAN' },
    { label:'CHILENA', value: 'CHI' },
    { label:'COLOMBIANA', value: 'COL' },
    { label:'ESPAÑOLA', value: 'ESP' },
    { label:'JAPONESA', value: 'JAP' },
    { label:'OTROS', value: 'OTR' },
    { label:'PERUANA', value: 'PER' },
    { label:'VENEZOLANA', value: 'VEN' },
    { label:'ECUATORIANA', value: 'ECU' },
    { label:'ITALIANO', value: 'ITA' }
  ];
  //! Es provisional despues se tomaran todos los dropdown de la base de datos
  this.marca = [
    { label:'ABB', value: 'ABB' },
    { label:'ACEC', value: 'ACEC' },
    { label:'AEG', value: 'AEG' },
    { label:'AICHI', value: 'AICHI' },
    { label:'ALKARGO', value: 'ALKARGO' },
    { label:'ARIMET', value: 'ARIMET' },
    { label:'ARTRANS SRTL', value: 'ARTRANS SRT' },
    { label:'BRUCE PEBLES', value: 'BRUCE PEBLES' },
    { label:'GORDON', value: 'GORDON' },
    { label:'HACKBRIDGE', value: 'HACKBRIDGE' },
    { label:'IDENSON', value: 'IDENSON' },
    { label:'ITB', value: 'ITB' },
    { label:'MALONEY ELECTRIC', value: 'MALONEY ELECTRIC' },
    { label:'TAMURA', value: 'TAMURA' },
  ];
  this.estadoEquipo = [
    { label:'CHATARRA', value:'C' },
    { label:'MALOGRADO', value:'M' },
    { label:'NUEVO', value:'N' },
    { label:'USADO', value:'U' },
  ];
  this.modelo = [
    { label:'MODELO 1', value:'MOD1' },
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
    { label:'EN SERVICIO', value:'SER' },
    { label:'FUERA DE SERVICIO', value:'FSE' },
    { label:'PROYECTO PARA REEMPLZAR', value:'proyecto para reemplzar' },
    { label:'PROYECTADO PARA RETIRO', value:'proyectado para retiro' },
    { label:'PROYECTADO PARA SERVICIO', value:'proyectado para servicio' },
    { label:'RETIRADO', value:'RET' },
    { label:'SIN DATOS', value:'sin datos' },
  ];
  this.tipoTrafo = [
    { label:'Monofásico', value:'M' },
    { label:'Trifásico', value:'T' },
  ]
  }

  openNew() {
    this.trafo = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(puesto: Trafo) {
    this.deleteProductDialog = true;
    this.trafo = { ...puesto };
  }

  confirmDeleteSelected() {
    this.trafos = this.trafos.filter((val) => !this.selectedPuesto.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformadores inactivados con Éxito.',
      life: 3000,
    });
    this.selectedPuesto = [];
  }

  confirmDelete() {
    this.trafos = this.trafos.filter((val) => val.idxfoPuesto !== this.trafo.idxfoTransformador);
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformador inactivado con Éxito.',
      life: 3000,
    });
    this.trafo = {};
  }

  hideDialog1() {
    this.trafoDialog = false;
    this.submitted = false;
    this.router.navigateByUrl('/trafo')
  }


  saveProduct() {
    this.submitted = true;
  
    if (this.editFlag) {
      //console.log('edit',this.editFlag)
      this.trafoService.update(this.trafoId, this.trafo).subscribe((reponse)=>console.log(this.trafo))
    } else {
      //console.log('new',this.editFlag)
      this.trafoService.create(this.trafo).subscribe((reponse)=>console.log(this.trafo))
    }
    this.router.navigateByUrl('/trafo')
  }
}
