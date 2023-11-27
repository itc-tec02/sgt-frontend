import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Grupo } from '../../model/grupo';
import { Product } from 'src/app/demo/api/product';
import { GrupoService } from '../../services/grupo.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
  providers: [MessageService]
})
export class GruposComponent {
  public grupos: Grupo[]= [];
  grupo : Grupo = {};
  deleteProductDialog: boolean = false;
  filterApplied: boolean = false;
  filteredGrupos: Grupo[] = [];
  cols: any[] = [];

  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  trafoDialog: boolean = false;
  products: Product[] = [];
  selectedGrupo: Grupo[] = [];
  selectedOptionGR: Grupo[] = [];
  selectedOptionCrGroups: any;

  public editFlag: boolean = false;
  gruposs: any[] = [];
  option: any;

  constructor(private grupoService: GrupoService, private messageService: MessageService, private productService: ProductService, private router: Router) {
    this.option = 'path'
   }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.grupoService.getGrupos(this.option).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })

    this.gruposs = [
      {
          name: 'Parámetros de Configuración',
          code: 'AU',
          states: [
              {
                  cname: 'Rutas de Trabajo del Sistema',
                  code: 'path'
              }
          ]
      },
      {
          name: 'Datos del Puesto',
          code: 'CA',
          states: [
            {
                cname: 'Posición Fase',
                code: 'pos_fase'
            },
            {
                cname: 'Tipo Conexión Transformador',
                code: 'tipcnxxfo'
            },
            {
                cname: 'Tipo de Montaje',
                code: 'tipmontaje'
            },
            {
                cname: 'Tipo de Servicio',
                code: 'tipserv'
            }
          ]
      },
      {
          name: 'Datos del Transformador',
          code: 'DT',
          states: [
            {
                cname: 'Estado Flujo de Actividades OTT',
                code: 'est_flujo'
            },
            {
                cname: 'Estado Transformador',
                code: 'est_xfo'
            },
            {
                cname: 'Fases del Transformador',
                code: 'fases'
            },
            {
                cname: 'Filtro por Ensayos de los Transformadores',
                code: 'fil_ensayo'
            },
            {
                cname: 'Filtros del Transformador',
                code: 'filtro_xfo'
            },
            {
                cname: 'Marca',
                code: 'marca'
            },
            {
                cname: 'Material de Bobinado',
                code: 'mat_bobi'
            },
            {
                cname: 'Modelo',
                code: 'modelo'
            },
            {
                cname: 'Posición de Conmutación',
                code: 'posconmu'
            },
            {
                cname: 'Solicitud de Apertura - Personal',
                code: 'sa_per'
            },
            {
                cname: 'Solicitud de Apertura - Recursos Empleados',
                code: 'sa_rec'
            },
            {
                cname: 'Tensión Nominal Primario',
                code: 'nivten_mt'
            },
            {
                cname: 'Tensión Nominal Secundario',
                code: 'nivten_bt'
            },
            {
                cname: 'Tipo de Fabricante',
                code: 'tip_fab'
            },
            {
                cname: 'Tipo de Industria',
                code: 'tip_ind'
            },
            {
                cname: 'Tipo de Medición de Calidad de Producto',
                code: 'tip_med'
            }
          ]
      }
  ];
  }

  openNew() {
    this.grupo = {};
    this.submitted = false;
    //this.trafoDialog = true;
    this.editFlag = false;
    if(this.option !== null || this.selectedOptionCrGroups.value === 'grupos/path'){
      this.router.navigate([`grupos/${this.option}/add`, { option: this.option }]);
    }else{
      this.router.navigate([`grupos/path/add`, { option: this.option }]);
    }
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(grupo: Grupo) {
    this.grupo = { ...grupo };
    //this.trafoDialog = true;
    this.editFlag = true;
    const grupoId = this.grupo.Codigo;
    if(this.option !== null || this.selectedOptionCrGroups.value === 'grupos/path'){
      this.router.navigate([`grupos/${this.option}/edit/${grupoId}`, { option: this.option }]);
    }else{
      this.router.navigate([`grupos/path/edit/${grupoId}`,{ option: this.option }]);
    }
}

deleteProduct(grupo: Grupo) {
    this.deleteProductDialog = true;
    this.grupo = { ...grupo };
}

confirmDeleteSelected() {
    //this.deleteProductsDialog = false;
    this.grupos = this.grupos.filter(val => !this.selectedGrupo.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedGrupo = [];
}

confirmDelete() {
    //this.deleteProductDialog = false;
    this.grupos = this.grupos.filter(val => val.Codigo !== this.grupo.Codigo);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.grupo = {};
}

hideDialog() {
    //this.trafoDialog = false;
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
    for (let i = 0; i < this.grupos.length; i++) {
        if (this.products[i].id === id) {
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

    const filteredPotencias = this.grupos.filter((grupo) => {

    //const filteredTrafos = this.trafos.filter((trafo) => trafo.cia?.toLowerCase().includes(filterValue));

      return (
        (grupo.Codigo?.toLowerCase().includes(filterValue)) ||
        (grupo.Descripcion?.toLowerCase().includes(filterValue)) ||
        (grupo.Estado?.toLowerCase().includes(filterValue))
      );
    });

      if (filterValue) {
        this.filterApplied = true;
      }else {
        this.filteredGrupos = [...this.grupos];
        this.filterApplied = false;
      }

    this.filteredGrupos = filteredPotencias;
  }

  onCascadeSelectChange(){
    console.log('Opción seleccionada:', this.selectedOptionCrGroups);
    this.option = this.selectedOptionCrGroups?.code;
    this.router.navigate([`grupos/${this.option}`]);
    switch (this.option) {
      case 'path':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'pos_fase':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tipcnxxfo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tipmontaje':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tipserv':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'est_flujo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'est_xfo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'fases':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'fil_ensayo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'filtro_xfo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'marca':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'mat_bobi':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'modelo':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'posconmu':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'sa_per':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'sa_rec':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'nivten_mt':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'nivten_bt':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tip_fab':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tip_ind':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      case 'tip_med':
        this.grupoService.getGrupos(this.option.toString()).subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
      default:
        this.grupoService.getGrupos('').subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })
        break;
    }
  }  

  onRowClick(trafo: any) {
    const isSelected = this.isSelected(trafo);
    
    if (isSelected) {
        // Si está seleccionado, quitarlo de la lista de selección
        this.selectedGrupo = this.selectedGrupo.filter(item => item !== trafo);
    } else {
        // Si no está seleccionado, agregarlo a la lista de selección
        this.selectedGrupo = [...this.selectedGrupo, trafo];
    }

    console.log("check");
}

isSelected(trafo: any): boolean {
    return this.selectedGrupo.includes(trafo);
}
}


