import { Component } from '@angular/core';
import { Cr } from '../../model/cr';
import { MessageService } from 'primeng/api';
import { CrsService } from '../../services/crs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedit-cr',
  templateUrl: './addedit-cr.component.html',
  styleUrls: ['./addedit-cr.component.scss'],
  providers: [MessageService]
})
export class AddeditCrComponent {
  crs: Cr[] = [];
  cr : Cr = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPotencia: Cr[] = [];
  crId: any;
  potenciaData: Cr;
  editFlag: boolean;
  trafoDialog: boolean = false;
  selectedOptionCrGroups: any;
  option: any;
  optionExist: boolean = true;

  constructor(
    private crService: CrsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.potenciaData = {} as Cr
    this.crId= this.route.snapshot.paramMap.get('id');
    this.option = this.route.snapshot.paramMap.get('option');
    this.editFlag = !!this.crId;
    this.optionExist = !this.crId
    //console.log(this.editFlag)
  }

  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.crService.getCrById(this.option,this.crId).subscribe((response: any) => {
        this.cr = response
        console.log(this.cr)
        console.log(this.editFlag);
        console.log(this.optionExist);
        
      })
    }
  }

  openNew() {
    this.cr = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  deleteProduct(potencia: Cr) {
    this.deleteProductDialog = true;
    this.cr = { ...potencia };
  }

  confirmDeleteSelected() {
    this.crs = this.crs.filter((val) => !this.selectedPotencia.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformadores inactivados con Éxito.',
      life: 3000,
    });
    this.selectedPotencia = [];
  }

  confirmDelete() {
    this.crs = this.crs.filter((val) => val.CodCR !== this.cr.CodCR);
    this.messageService.add({
      severity: 'success',
      summary: 'Exitoso',
      detail: 'Transformador inactivado con Éxito.',
      life: 3000,
    });
    this.cr = {};
  }

  hideDialog1() {
    console.log(this.option)
    this.trafoDialog = false;
    this.submitted = false;
    this.optionExist = true;
    this.router.navigate([`/cr/${this.option}`, { option: this.option }]);
  }


  saveProduct() {
    this.submitted = true;
    if (this.editFlag) {
      //console.log('edit',this.editFlag)
      this.crService.updateCr(this.option, this.crId, this.cr).subscribe((reponse)=>console.log(this.cr))
    } else {
      this.crService.createCr(this.option, this.cr).subscribe((reponse)=>console.log(this.cr))
    }
    this.router.navigateByUrl(`/cr/${this.option}`)
  }
}
