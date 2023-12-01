import { Component } from '@angular/core';
import { Puesto } from '../../interface/puesto';
import { MessageService } from 'primeng/api';
import { PuestoService } from '../../services/puesto-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupo } from 'src/app/grupos/model/grupo';
import { GrupoService } from 'src/app/grupos/services/grupo.service';

@Component({
  selector: 'app-addeditpuesto',
  templateUrl: './addeditpuesto.component.html',
  styleUrls: ['./addeditpuesto.component.css'],
  providers: [MessageService],
})
export class AddeditpuestoComponent {
  puestos: Puesto[] = [];
  puesto : Puesto = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPuesto: Puesto[] = [];
  puestoId: any;
  //potenciaData: Puesto;
  editFlag: boolean;
  trafoDialog: boolean = false;
  public fase: any[] = [];
  public conexion: any[] = [];
  public montaje: any[] = [];
  public servicio: any[] = [];

  constructor(
    private puestoService: PuestoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private grupoService: GrupoService
  ) {
    //this.potenciaData = {} as Puesto
    this.puestoId= this.route.snapshot.paramMap.get('id');
    this.editFlag = !!this.puestoId;
    //console.log(this.editFlag)
  }
  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.puestoService.getById(this.puestoId).subscribe((response: any) => {
        this.puesto = response
        console.log(this.puesto)
        //console.log('ngoninit addedit',this.editFlag)
      })
    }

    this.opcionesCascade("pos_fase","fase");
    this.opcionesCascade("tipcnxxfo","conexion");
    this.opcionesCascade("tipmontaje","montaje");
    this.opcionesCascade("tipserv","servicio");
  }

  openNew() {
    this.puesto = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(puesto: Puesto) {
    this.deleteProductDialog = true;
    this.puesto = { ...puesto };
  }

  confirmDeleteSelected() {
    this.puestos = this.puestos.filter((val) => !this.selectedPuesto.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformadores inactivados con Éxito.',
      life: 3000,
    });
    this.selectedPuesto = [];
  }

  confirmDelete() {
    this.puestos = this.puestos.filter((val) => val.idxfoPuesto !== this.puesto.idxfoPuesto);
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformador inactivado con Éxito.',
      life: 3000,
    });
    this.puesto = {};
  }

  hideDialog1() {
    this.trafoDialog = false;
    this.submitted = false;
    this.router.navigateByUrl('/puesto')
  }


  saveProduct() {
    this.submitted = true;
  
    if (this.editFlag) {
      //console.log('edit',this.editFlag)
      this.puestoService.update(this.puestoId, this.puesto).subscribe((reponse)=>console.log(this.puesto))
    } else {
      //console.log('new',this.editFlag)
      this.puestoService.create(this.puesto).subscribe((reponse)=>console.log(this.puesto))
    }
    this.router.navigateByUrl('/puestos')
  }

  opcionesCascade(value1: string, value2: string) {
    this.grupoService.getGrupos(value1).subscribe((grupos: Grupo[]) => {
      const gruposActivos = grupos.filter(grupo => grupo.Estado === 'A');
      
      this[value2 as keyof AddeditpuestoComponent] = gruposActivos.map(grupo => ({ label: grupo.Descripcion, value: grupo.Codigo }));
    });
  }
}
