import { Component } from '@angular/core';
import { Trafo } from '../../interfaces/trafo.inerface';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TrafoService } from '../../services/trafo-service.service';
import { Grupo } from 'src/app/grupos/model/grupo';
import { GrupoService } from 'src/app/grupos/services/grupo.service';

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
  public opciones: any[] = []
  public fab: any[]=[]


  constructor(
    private trafoService: TrafoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService
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
    this.opcionesCascade("marca","marca");
    this.opcionesCascade("tip_fab","fabricante");
    this.opcionesCascade("tip_ind","industria"); 
    this.opcionesCascade("est_xfo","estadoEquipo"); 
    this.opcionesCascade("modelo","modelo");    
    this.opcionesCascade("fases","tipoTrafo");    
    
  //* Provisional despues se tomará del servicio de Trafo
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
    { label:'Sin Datos', value: 'sin datos' },
  ];
  //! Es provisional despues se tomaran todos los dropdown de la base de datos
  this.estaInst = [
    { label:'DESCONOCIDO', value:'desconocido' },
    { label:'EN SERVICIO', value:'SER' },
    { label:'FUERA DE SERVICIO', value:'FSE' },
    { label:'PROYECTO PARA REEMPLZAR', value:'proyecto para reemplzar' },
    { label:'PROYECTADO PARA RETIRO', value:'proyectado para retiro' },
    { label:'PROYECTADO PARA SERVICIO', value:'proyectado para servicio' },
    { label:'RETIRADO', value:'RET' },
    { label:'SIN DATOS', value:'sin datos' },
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
  opcionesCascade(value1: string, value2: string) {
    this.grupoService.getGrupos(value1).subscribe((grupos: Grupo[]) => {
      const gruposActivos = grupos.filter(grupo => grupo.Estado === 'A');
      
      this[value2 as keyof AddedittrafoComponent] = gruposActivos.map(grupo => ({ label: grupo.Descripcion, value: grupo.Codigo }));
    });
  }
}
