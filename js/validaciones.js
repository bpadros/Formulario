function validarCampoRequerido(input){
    console.log(input);
    if(input.value.trim() != '' ){
        console.log('el dato es correcto');
        input.className = 'form-control is-valid';
    }else{
        console.log('corregir el dato');
        input.className = 'form-control is-invalid';
    }
}

function validarNumeros(input){
    // creamos la expresion regular
    let patron = /^[0-9]{1,3}$/;
    if(patron.test(input.value)){
        input.className = 'form-control is-valid';
    }else{
        input.className = 'form-control is-invalid';
    }
}


// traer los input/textarea

let codigo = document.querySelector('#codigo');
let cantidad = document.querySelector('#cantidad');

// le agregamos el evento
codigo.addEventListener('blur', () => { validarCampoRequerido(codigo) });
cantidad.addEventListener('blur', ()=>{ validarNumeros(cantidad) });