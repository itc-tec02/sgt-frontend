import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PotenciaService } from '../../services/potencia.service';
import { MessageService } from 'primeng/api';
import { PotenciasComponent } from '../potencias/potencias.component';
import { TmplAstHoverDeferredTrigger } from '@angular/compiler';
import { Potencia } from '../../model/potencia';

@Component({
  selector: 'app-add-or-edit-potencias',
  templateUrl: './add-or-edit-potencias.component.html',
  styleUrls: ['./add-or-edit-potencias.component.scss'],
  providers: [MessageService]
})
export class AddOrEditPotenciasComponent implements OnInit{
  potencias: Potencia[] = [];
  potencia : Potencia = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPotencia: Potencia[] = [];
  potenciaId: any;
  potenciaData: Potencia;
  editFlag: boolean;
  trafoDialog: boolean = false;

  constructor(
    private potenciaService: PotenciaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.potenciaData = {} as Potencia
    this.potenciaId= this.route.snapshot.paramMap.get('id');
    this.editFlag = !!this.potenciaId;
    //console.log(this.editFlag)
  }

  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.potenciaService.getById(this.potenciaId).subscribe((response: any) => {
        this.potencia = response
        //console.log('ngoninit addedit',this.editFlag)
      })
    }
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

  deleteProduct(potencia: Potencia) {
    this.deleteProductDialog = true;
    this.potencia = { ...potencia };
  }

  confirmDeleteSelected() {
    this.potencias = this.potencias.filter((val) => !this.selectedPotencia.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformadores inactivados con Éxito.',
      life: 3000,
    });
    this.selectedPotencia = [];
  }

  confirmDelete() {
    this.potencias = this.potencias.filter((val) => val.Codigo !== this.potencia.Codigo);
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformador inactivado con Éxito.',
      life: 3000,
    });
    this.potencia = {};
  }

  hideDialog1() {
    this.trafoDialog = false;
  this.submitted = false;
  this.router.navigateByUrl('/potn')
  }


  saveProduct() {
    this.submitted = true;
  
    if (this.editFlag) {
      //console.log('edit',this.editFlag)
      this.potenciaService.actualizarPotencia(this.potenciaId, this.potencia).subscribe((reponse)=>console.log(this.potencia))
    } else {
      //console.log('new',this.editFlag)
      this.potenciaService.agregarPotencia(this.potencia).subscribe((reponse)=>console.log(this.potencia))
    }
    this.router.navigateByUrl('/potn')
  }
}
