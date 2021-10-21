import {
  validarCodigo,
  validarCampoRequerido,
  validarURL,
  validarNumeros,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

// traer los input/textarea
let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
let listaProductos = [];
let productoExistente = false; //si es false significa que tengo que agregar un nuevo producto
// true significa que tengo que modificar un  producto existente
let btnNuevoProducto = document.querySelector("#btnNuevoProducto");

cargarInicial();

// le agregamos el evento
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
formulario.addEventListener("submit", guardarProducto);
btnNuevoProducto.addEventListener("click", limpiarFormulario);

function guardarProducto(e) {
  e.preventDefault();
  // verificar que pase todas las validaciones
  if (validarGeneral()) {
    // aqui pregunto cual es el estado de mi variable productoExistente
    if (productoExistente === false) {
      // tengo que crear el producto
      console.log("aqui creo el producto");
      agregarProducto();
    } else {
      // tengo que modificar un producto
      console.log("aqui quiero modificar el producto");
      actualizarProducto();
    }
  } else {
    //aqui no hacemos nada
    console.log("no deberia hacer nada");
  }
}

function agregarProducto() {
  // crear un objeto Producto
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  // cargar el producto dentro del arreglo
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //al arreglo de productos lo almaceno en localstorage
  localStorage.setItem("arregloProductos", JSON.stringify(listaProductos));
  // limpiar el formulario
  limpiarFormulario();
  // cargar el producto nuevo en la fila de la tabla
  crearFilas(productoNuevo);

  //mostrar un mensaje al usuario
}

function limpiarFormulario() {
  // limpia los value de mis input
  formulario.reset();
  //limpiar los estilos
  codigo.className = "form-control";
  cantidad.className = "form-control";
  url.className = "form-control";
  producto.className = "form-control";
  descripcion.className = "form-control";
  //TAREA: resetear las clases del resto de los inputs
  // resetear el valor de la variable booleana
  productoExistente = false;
}

function cargarInicial() {
  // traer los productos del localstorage si existieran sino dejar el arreglo vacio.
  listaProductos = JSON.parse(localStorage.getItem("arregloProductos")) || [];
  // si hay productos dentro del arreglo entonces los muestro en la tabla
  listaProductos.forEach((itemProducto) => {
    // codigo que se ejecuta por cada el elemento del arreglo
    crearFilas(itemProducto);
  });
}

function crearFilas(itemProducto) {
  let tabla = document.querySelector("#tablaProducto");
  console.log(itemProducto);
  tabla.innerHTML += ` <tr>
    <th scope="row">${itemProducto.codigo}</th>
    <td>${itemProducto.nombre}</td>
    <td>${itemProducto.descripcion}</td>
    <td>${itemProducto.cantidad}</td>
    <td>${itemProducto.url}</td>
    <td>
      <button class="btn btn-warning" onclick="prepararEdicion('${itemProducto.codigo}')">Editar</button>
      <button class="btn btn-danger">Borrar</button>
    </td>
  </tr>`;
}

window.prepararEdicion = (codigoProducto) => {
  console.log(codigoProducto);
  // buscar el objeto
  let productoBuscado = listaProductos.find((itemProducto) => {
    return itemProducto.codigo == codigoProducto;
  });
  console.log(productoBuscado);
  // mostrarlo en el formulario
  codigo.value = productoBuscado.codigo;
  cantidad.value = productoBuscado.cantidad;
  descripcion.value = productoBuscado.descripcion;
  url.value = productoBuscado.url;
  producto.value = productoBuscado.nombre;
  // cambio el valor de la variable productoExistente
  productoExistente = true;
};

function actualizarProducto() {
  // buscar la posicion del elemento a editar dentro del arreglo
  let posicionProducto = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == codigo.value;
  });
  console.log(posicionProducto);
  // modificar los datos de esa posicion del arreglo
  listaProductos[posicionProducto].nombre = producto.value;
  listaProductos[posicionProducto].cantidad = cantidad.value;
  listaProductos[posicionProducto].descripcion = descripcion.value;
  listaProductos[posicionProducto].url = url.value;
  // modificar el localstorage
  localStorage.setItem('arregloProductos', JSON.stringify(listaProductos))
  // volver a dibujar la tabla
  borrarFilas();
  listaProductos.forEach((itemProducto)=>{ crearFilas(itemProducto) })
// limpiar formulario
 limpiarFormulario();
}


function borrarFilas(){
  let tabla = document.querySelector("#tablaProducto");
  tabla.innerHTML= '';
}

