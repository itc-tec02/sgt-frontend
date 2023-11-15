import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Usuario } from '../../model/usuario';
import { Product } from 'src/app/demo/api/product';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss'],
  providers: [MessageService]
})
export class ListUsuariosComponent {
  public usuarios: Usuario[]= [];
  usuario : Usuario = {};
  deleteProductDialog: boolean = false;
  filterApplied: boolean = false;
  filteredUsuarios: Usuario[] = [];
  cols: any[] = [];

  deleteProductsDialog: boolean = false;
  submitted: boolean = false;
  trafoDialog: boolean = false;
  products: Product[] = [];
  selectedUsuario: Usuario[] = [];

  public editFlag: boolean = false;

  constructor(private usuarioService: UsuariosService, private messageService: MessageService, private productService: ProductService) { }

  ngOnInit() {
    // this.productService.getProducts().then(data => this.products = data);
    // console.log(this.products);
    this.usuarioService.getUsuarios().subscribe( (usuario) => {this.usuarios = usuario; console.log(this.usuarios)  })
  }

  openNew() {
    this.usuario = {};
    this.submitted = false;
    this.trafoDialog = true;
    this.editFlag = false;
}

deleteSelectedProducts() {
    this.deleteProductsDialog = true;
}

editProduct(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.trafoDialog = true;
    this.editFlag = true;
}

deleteProduct(usuario: Usuario) {
    this.deleteProductDialog = true;
    this.usuario = { ...usuario };
}

confirmDeleteSelected() {
    //this.deleteProductsDialog = false;
    this.usuarios = this.usuarios.filter(val => !this.selectedUsuario.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformadores inactivados con Éxito.', life: 3000 });
    this.selectedUsuario = [];
}

confirmDelete() {
    //this.deleteProductDialog = false;
    this.usuarios = this.usuarios.filter(val => val.CodUsuario !== this.usuario.CodUsuario);
    this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Transformador inactivado con Éxito.', life: 3000 });
    this.usuario = {};
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
    for (let i = 0; i < this.usuarios.length; i++) {
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

    const filteredPotencias = this.usuarios.filter((usuario) => {

    //const filteredTrafos = this.trafos.filter((trafo) => trafo.cia?.toLowerCase().includes(filterValue));

      return (
        (usuario.CodUsuario?.toString().toLowerCase().includes(filterValue)) ||
        (usuario.Nombres?.toLowerCase().includes(filterValue)) ||
        (usuario.Apellidos?.toString().toLowerCase().includes(filterValue)) ||
        (usuario.Estado?.toString().toLowerCase().includes(filterValue)) ||
        (usuario.CodUsuarioSOR?.toString().toLowerCase().includes(filterValue)) ||
        (usuario.NombreCR?.toString().toLowerCase().includes(filterValue)) ||
        (usuario.NombreCRPadre?.toString().toLowerCase().includes(filterValue))
      );
    });

      if (filterValue) {
        this.filterApplied = true;
      }else {
        this.filteredUsuarios = [...this.usuarios];
        this.filterApplied = false;
      }

    this.filteredUsuarios = filteredPotencias;
  }
}
