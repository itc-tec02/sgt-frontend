import { Component } from '@angular/core';
import { Grupo } from '../../model/grupo';
import { GrupoService } from '../../services/grupo.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedit-grupo',
  templateUrl: './addedit-grupo.component.html',
  styleUrls: ['./addedit-grupo.component.css'],
  providers: [MessageService]
})
export class AddeditGrupoComponent {
  grupos: Grupo[] = [];
  grupo : Grupo = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPotencia: Grupo[] = [];
  grupoId: any;
  potenciaData: Grupo;
  editFlag: boolean;
  trafoDialog: boolean = false;
  selectedOptionCrGroups: any;
  option: any;
  optionExist: boolean = true;

  constructor(
    private crService: GrupoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.potenciaData = {} as Grupo
    this.grupoId= this.route.snapshot.paramMap.get('id');
    this.option = this.route.snapshot.paramMap.get('option');
    this.editFlag = !!this.grupoId;
    this.optionExist = !this.grupoId;
    //console.log(this.editFlag)
  }

  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.crService.getGrupoById(this.option,this.grupoId).subscribe((response: any) => {
        this.grupo = response
        //console.log('ngoninit addedit',this.editFlag)
        console.log(this.option);
        console.log(this.optionExist);
        console.log(this.editFlag);
      })
    }
  }

  openNew() {
    this.grupo = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(potencia: Grupo) {
    this.deleteProductDialog = true;
    this.grupo = { ...potencia };
  }

  confirmDeleteSelected() {
    this.grupos = this.grupos.filter((val) => !this.selectedPotencia.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformadores inactivados con Éxito.',
      life: 3000,
    });
    this.selectedPotencia = [];
  }

  confirmDelete() {
    this.grupos = this.grupos.filter((val) => val.Codigo !== this.grupo.Codigo);
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformador inactivado con Éxito.',
      life: 3000,
    });
    this.grupo = {};
  }

  hideDialog1() {
    this.trafoDialog = false;
    this.submitted = false;
    this.optionExist = true;
    this.router.navigate([`/grupos/${this.option}`, { option: this.option }]);
  }


  saveProduct() {
    this.submitted = true;
    if (this.editFlag) {
      //console.log('edit',this.editFlag)
      this.crService.updateGrupo(this.option, this.grupoId, this.grupo).subscribe((reponse)=>console.log(this.grupo))
    } else {
      this.crService.createGrupo(this.option, this.grupo).subscribe((reponse)=>console.log(this.grupo))
    }
    this.router.navigateByUrl('/grupos/path')
  }
}
