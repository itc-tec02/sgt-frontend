import { Component } from '@angular/core';
import { Cr } from '../../model/cr';
import { MessageService } from 'primeng/api';
import { CrsService } from '../../services/crs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addedit-cr',
  templateUrl: './addedit-cr.component.html',
  styleUrls: ['./addedit-cr.component.scss']
})
export class AddeditCrComponent {
  crs: Cr[] = [];
  potencia : Cr = {};
  deleteProductDialog = false;
  deleteProductsDialog = false;
  submitted = false;
  selectedPotencia: Cr[] = [];
  potenciaId: any;
  potenciaData: Cr;
  editFlag: boolean;
  trafoDialog: boolean = false;
  selectedOptionCrGroups: any;

  constructor(
    private crService: CrsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.potenciaData = {} as Cr
    this.potenciaId= this.route.snapshot.paramMap.get('id');
    this.editFlag = !!this.potenciaId;
    //console.log(this.editFlag)
  }

  ngOnInit(): void {
    //console.log('ngoniniiit')
    //console.log('ngoniniiit', this.editFlag)
    if (this.editFlag) {
      //console.log('validacion',this.editFlag)
      this.crService.getCrsById('this.potenciaI.toS').subscribe((response: any) => {
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

  deleteProduct(potencia: Cr) {
    this.deleteProductDialog = true;
    this.potencia = { ...potencia };
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
    this.crs = this.crs.filter((val) => val.CodCR !== this.potencia.CodCR);
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
    // this.submitted = true;
    // if(!this.potencia.CodCR) return;

    // if (this.editFlag) {
    //   //console.log('edit',this.editFlag)
    //   switch (this.selectedOptionCrGroups?.value) {
    //     case 'ALM':
    //       this.crService.getAlm().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
    //       break;
    //     case 'ADM':
    //       this.crService.getAdm().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
    //       break;
    //     case 'COI':
    //       this.crService.getCoi().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
    //       break;
    //     case 'CPT':
    //       this.crService.getCpt().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
    //       break;
    //     case 'OMR':
    //       this.crService.getOmr().subscribe( (cr) => {this.crs = cr; console.log(this.crs)  })
    //       break;
    //     default:
    //       this.crService.getCrs('').subscribe(cr => this.crs = cr);
    //       break;
    //   }
    // } else {
    //   //console.log('new',this.editFlag)
    //   //this.potenciaService.agregarPotencia(this.potencia).subscribe((reponse)=>console.log(this.potencia))
    // }
    // this.router.navigateByUrl('/potn')
  }
}
