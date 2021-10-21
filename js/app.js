let listaProductos = [];

cargarInicial();

function cargarInicial() {
  // revisar los datos del localstorage
  listaProductos = JSON.parse(localStorage.getItem("arregloProductos")) || [];
  // dibujar las columas con sus respectivas cards
  if(listaProductos.length > 0){
      listaProductos.forEach(itemProducto => {
        crearColumna(itemProducto);
      });
  }
}

function crearColumna(producto) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
        <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
        </div>
      </div>
</div>`;
}
