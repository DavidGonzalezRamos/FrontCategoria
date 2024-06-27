import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormGroup,FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { DialogModule } from 'primeng/dialog';





@Component({
    selector: 'app-body',
    standalone: true,
    templateUrl: './body.component.html',
    imports: [HeaderComponent, InputGroupModule, InputGroupAddonModule, 
        InputTextModule, ButtonModule, TableModule,ReactiveFormsModule,DialogModule, ]
})

export class BodyComponent {
    productos : Array<Producto>
    formularioProducto: FormGroup
    display: boolean

    constructor(private fb: FormBuilder, private pService: ProductoService){
        this.productos = new Array<Producto>()
        this.display = false
        this.formularioProducto = fb.group({
            idDelProducto: new FormControl('', [Validators.required]),
            nombreProducto: new FormControl('', [Validators.required]),
            categoriaProducto: new FormControl('', [Validators.required]),
            precioProducto: new FormControl('', [Validators.required]),
        })
    }

    //CrearProducto
    crearProducto(){
        if(this.formularioProducto.valid){
            let producto = new Producto()
            producto.idDelProducto = this.formularioProducto.get('idDelProducto')?.value
            producto.nombreProducto= this.formularioProducto.get('nombreProducto')?.value
            producto.categoriaProducto= this.formularioProducto.get('categoriaProducto')?.value
            producto.precioProducto= this.formularioProducto.get('precioProducto')?.value
            this.pService.crearProducto(producto).subscribe(res => {
                this.getProductos()
                this.formularioProducto.reset()
            })
        }
    }


    //Get productos
    getProductos(){
        this.pService.getProductos().subscribe(res =>{
            this.productos = res
        })
    }


    //Eliminar Producto
    eliminarProducto(idProducto: number){
        this.pService.eliminarProducto(idProducto). subscribe(res =>{
            this.getProductos()
        })

    }


    activador(producto: Producto){
        this.formularioProducto.get('idDelProducto')?.setValue(producto.idDelProducto)
        this.formularioProducto.get('nombreProducto')?.setValue(producto.nombreProducto)
        this.formularioProducto.get('categoriaProducto')?.setValue(producto.categoriaProducto)
        this.formularioProducto.get('precioProducto')?.setValue(producto.precioProducto)

        this.display =! false
    }

    //Actualizar Producto
    actualizarProducto(){
        if(this.formularioProducto.valid){
            let producto = new Producto()
            producto.idDelProducto = this.formularioProducto.get('idDelProducto')?.value
            producto.nombreProducto= this.formularioProducto.get('nombreProducto')?.value
            producto.categoriaProducto= this.formularioProducto.get('categoriaProducto')?.value
            producto.precioProducto= this.formularioProducto.get('precioProducto')?.value
            this.pService.actualizarProducto(producto).subscribe(res => {
                this.getProductos()
                this.formularioProducto.reset()
                this.display=! true
            })
        }
    }
}
