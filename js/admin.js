
import {validarCodigo, validarCampoRequerido, validarURL, validarNumeros, validarGeneral} from './validaciones.js';
import {Producto} from './productoClass.js';

// traer los input/textarea
let codigo = document.querySelector('#codigo');
let cantidad = document.querySelector('#cantidad');
let url = document.querySelector('#url');
let producto = document.querySelector('#producto');
let descripcion = document.querySelector('#descripcion');
let formulario = document.querySelector('#formProducto');
//   console.log(formulario);
//  console.log(descripcion);


// le agregamos el evento
codigo.addEventListener('blur', () => { validarCodigo(codigo) });
cantidad.addEventListener('blur', ()=>{ validarNumeros(cantidad) });
url.addEventListener('blur', () => { validarURL(url)});
producto.addEventListener('blur', ()=>{ validarCampoRequerido(producto)});
descripcion.addEventListener('blur', ()=>{ validarCampoRequerido(descripcion)});
formulario.addEventListener('submit', guardarProducto);

function guardarProducto(e){
    e.preventDefault();
    // verificar que pase todas las validaciones
    if(validarGeneral()){
        // tengo que crear el producto
        console.log('aqui creo el producto')
        agregarProducto();
    }else{
        //aqui no hacemos nada
        console.log('no deberia hacer nada')
    }
}

function agregarProducto(){
    // crear un objeto Producto
    let productoNuevo = new Producto(codigo.value, producto.value, descripcion.value, cantidad.value, url.value);
    console.log(productoNuevo)
}