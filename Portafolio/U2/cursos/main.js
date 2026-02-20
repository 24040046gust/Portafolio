const form = document.getElementById('formCurso');
const tabla = document.getElementById('tablaCursos');

document.addEventListener('DOMContentLoaded', cargarCursos);

function obtenerCursos(){
    return JSON.parse(localStorage.getItem('cursos') || '[]');
}

function guardarCursos(cursos){
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function crearFilaHTML(c){
return `
<tr data-id="${c.id}">
<td><input class="nombre-curso" value="${c.nombre_curso}"></td>
<td><input class="nombre-instructor" value="${c.nombre_instructor}"></td>
<td><input class="horas" type="number" value="${c.horas}"></td>
<td>
<select class="nivel">
<option ${c.nivel==='Básico'?'selected':''}>Básico</option>
<option ${c.nivel==='Intermedio'?'selected':''}>Intermedio</option>
<option ${c.nivel==='Avanzado'?'selected':''}>Avanzado</option>
</select>
</td>
<td><input class="fecha-inicio" type="date" value="${c.fecha_inicio}"></td>
<td><input class="costo" type="number" value="${c.costo}"></td>
<td>
<button class="editar">Guardar</button>
<button class="eliminar">Borrar</button>
</td>
</tr>`;
}

function cargarCursos(){
const cursos = obtenerCursos();
tabla.innerHTML = cursos.map(crearFilaHTML).join('');
}

form.addEventListener('submit', e=>{
e.preventDefault();

const nuevo={
id:Date.now(),
nombre_curso:nombreCurso.value,
nombre_instructor:nombreInstructor.value,
horas:horas.value,
nivel:nivel.value,
fecha_inicio:fechaInicio.value,
costo:costo.value
};

const cursos=obtenerCursos();
cursos.unshift(nuevo);
guardarCursos(cursos);
cargarCursos();
form.reset();
toastr.success("Curso guardado");
});

tabla.addEventListener('click', e=>{
const tr=e.target.closest('tr');
const id=Number(tr.dataset.id);
let cursos=obtenerCursos();

if(e.target.classList.contains('eliminar')){
cursos=cursos.filter(c=>c.id!==id);
guardarCursos(cursos);
cargarCursos();
}

if(e.target.classList.contains('editar')){
const c=cursos.find(x=>x.id===id);
c.nombre_curso=tr.querySelector('.nombre-curso').value;
c.nombre_instructor=tr.querySelector('.nombre-instructor').value;
c.horas=tr.querySelector('.horas').value;
c.nivel=tr.querySelector('.nivel').value;
c.fecha_inicio=tr.querySelector('.fecha-inicio').value;
c.costo=tr.querySelector('.costo').value;
guardarCursos(cursos);
toastr.success("Actualizado");
}
});
