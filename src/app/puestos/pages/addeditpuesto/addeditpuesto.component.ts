import { Component } from '@angular/core';
import { Puesto } from '../../interface/puesto';
import { MessageService } from 'primeng/api';
import { PuestoService } from '../../services/puesto-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private potenciaService: PuestoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
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
      this.potenciaService.getById(this.puestoId).subscribe((response: any) => {
        this.puesto = response
        console.log(this.puesto)
        //console.log('ngoninit addedit',this.editFlag)
      })
    }
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
      this.potenciaService.update(this.puestoId, this.puesto).subscribe((reponse)=>console.log(this.puesto))
    } else {
      //console.log('new',this.editFlag)
      this.potenciaService.create(this.puesto).subscribe((reponse)=>console.log(this.puesto))
    }
    this.router.navigateByUrl('/puestos')
  }
}
