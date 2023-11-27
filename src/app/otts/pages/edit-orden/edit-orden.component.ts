import { Component } from '@angular/core';
import { Orden } from '../../interfaces/ott.interface';
import { MessageService } from 'primeng/api';
import { OttService } from '../../services/ott-service.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-orden',
  templateUrl: './edit-orden.component.html',
  styleUrls: ['./edit-orden.component.scss'],
  providers: [MessageService]
})
export class EditOrdenComponent {
  orderDialog: boolean = false;
  public orders: Orden[]= []

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  //products: Product[] = [];
  order: Orden = {};
  selectedOrders: Orden[] = [];

  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  filteredOrders: Orden[] = []
  filterApplied: boolean = false;
  editFlag: boolean;
  ottId: any;

  constructor(
    private messageService: MessageService,
    private ottService: OttService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      this.ottId= this.route.snapshot.paramMap.get('id');
      this.editFlag = !!this.ottId;
      
     }

     ngOnInit(): void {
      //console.log('ngoniniiit')
      //console.log('ngoniniiit', this.editFlag)
      if (this.editFlag) {
        //console.log('validacion',this.editFlag)
        this.ottService.getById(this.ottId).subscribe((response: any) => {
          this.order = response
          console.log(this.order);
          //console.log('ngoninit addedit',this.editFlag)
        })
      }
    }

    hideDialog1() {
     // this.trafoDialog = false;
    this.submitted = false;
    this.router.navigateByUrl('/ott')
    }

    saveProduct() {
      this.submitted = true;
      //if(!this.order.ott) return;
  
      if (this.editFlag) {
        //console.log('edit',this.editFlag)
        this.ottService.update(this.ottId, this.order).subscribe((reponse)=>console.log(this.order))
      } else {
        //console.log('new',this.editFlag)
        this.ottService.create(this.order).subscribe((reponse)=>console.log(this.order))
      }
      this.router.navigateByUrl('/ott')
    }
}
