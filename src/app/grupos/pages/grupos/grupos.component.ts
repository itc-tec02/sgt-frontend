import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Grupo } from '../../model/grupo';
import { Product } from 'src/app/demo/api/product';
import { GrupoService } from '../../services/grupo.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';

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

  public editFlag: boolean = false;
  gruposs: any[] = [];

  constructor(private grupoService: GrupoService, private messageService: MessageService, private productService: ProductService) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.grupoService.getGrupos().subscribe( (grupo) => {this.grupos = grupo; console.log(this.grupos)  })

    this.gruposs = [
      {
          name: 'Parámetros de Configuración',
          code: 'AU',
          states: [
              {
                  cname: 'Rutas de Trabajo del Sistema',
                  code: 'RTS'
              }
          ]
      },
      {
          name: 'Datos del Puesto',
          code: 'CA',
          states: [
            {
                cname: 'Posición Fase',
                code: 'PF'
            },
            {
                cname: 'Tipo Conexión Transformador',
                code: 'TCT'
            },
            {
                cname: 'Tipo de Montaje',
                code: 'TM'
            },
            {
                cname: 'Tipo de Servicio',
                code: 'TS'
            }
          ]
      },
      {
          name: 'Datos del Transformador',
          code: 'DT',
          states: [
            {
                cname: 'Estado Flujo de Actividades OTT',
                code: 'EFAO'
            },
            {
                cname: 'Estado Transformador',
                code: 'ET'
            },
            {
                cname: 'Fases del Transformador',
                code: 'FaT'
            },
            {
                cname: 'Filtro por Ensayos de los Transformadores',
                code: 'FET'
            },
            {
                cname: 'Filtros del Transformador',
                code: 'FiT'
            },
            {
                cname: 'Marca',
                code: 'M'
            },
            {
                cname: 'Material de Bobinado',
                code: 'MB'
            },
            {
                cname: 'Modelo',
                code: 'M'
            },
            {
                cname: 'Posición de Conmutación',
                code: 'PC'
            },
            {
                cname: 'Solicitud de Apertura - Personal',
                code: 'SAP'
            },
            {
                cname: 'Solicitud de Apertura - Recursos Empleados',
                code: 'SARE'
            },
            {
                cname: 'Tensión Nominal Primario',
                code: 'TNP'
            },
            {
                cname: 'Tensión Nominal Secundario',
                code: 'TNS'
            },
            {
                cname: 'Tipo de Fabricante',
                code: 'TDF'
            },
            {
                cname: 'Tipo de Industria',
                code: 'TDI'
            },
            {
                cname: 'Tipo de Medición de Calidad de Producto',
                code: 'TMCP'
            }
          ]
      }
  ];
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

editProduct(grupo: Grupo) {
    this.grupo = { ...grupo };
    this.trafoDialog = true;
    this.editFlag = true;
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
    this.grupos = this.grupos.filter(val => val.codigo !== this.grupo.codigo);
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
        (grupo.codigo?.toLowerCase().includes(filterValue)) ||
        (grupo.descripcion?.toLowerCase().includes(filterValue)) ||
        (grupo.descripcion?.toLowerCase().includes(filterValue))
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
}
