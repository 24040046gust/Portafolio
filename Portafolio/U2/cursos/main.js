const form = document.getElementById('formCurso');
const tabla = document.getElementById('tablaCursos');

document.addEventListener('DOMContentLoaded', cargarCursos);

/* =========================
   LOCAL STORAGE
========================= */

function obtenerCursos(){
return JSON.parse(localStorage.getItem('cursos')||'[]');
}

function guardarCursos(cursos){
localStorage.setItem('cursos',JSON.stringify(cursos));
}

/* =========================
   RENDER FILA
========================= */

function crearFilaHTML(c){
return `
<tr data-id="${c.id}">
<td><input class="inp-table nombre-curso" value="${c.nombre_curso}"></td>
<td><input class="inp-table nombre-instructor" value="${c.nombre_instructor}"></td>
<td><input class="inp-table horas" type="number" value="${c.horas}"></td>

<td>
<select class="inp-table nivel">
<option ${c.nivel==='Básico'?'selected':''}>Básico</option>
<option ${c.nivel==='Intermedio'?'selected':''}>Intermedio</option>
<option ${c.nivel==='Avanzado'?'selected':''}>Avanzado</option>
</select>
</td>

<td><input class="inp-table fecha-inicio" type="date" value="${c.fecha_inicio}"></td>
<td><input class="inp-table costo" type="number" value="${c.costo}"></td>

<td>
<div class="acciones">
<button class="btn-action btn-guardar editar">Guardar</button>
<button class="btn-action btn-borrar eliminar">Borrar</button>
</div>
</td>
</tr>`;
}

function cargarCursos(){
const cursos = obtenerCursos();
tabla.innerHTML = cursos.map(crearFilaHTML).join('');
}

/* =========================
   REGISTRAR
========================= */

form.addEventListener('submit',e=>{
e.preventDefault();

const datos={
id:Date.now(),
nombre_curso:nombreCurso.value.trim(),
nombre_instructor:nombreInstructor.value.trim(),
horas:horas.value,
nivel:nivel.value,
fecha_inicio:fechaInicio.value,
costo:costo.value
};

if(Object.values(datos).slice(1).some(v=>!v)){
toastr.warning("Completa todos los campos");
return;
}

const cursos=obtenerCursos();
cursos.unshift(datos);
guardarCursos(cursos);
cargarCursos();
form.reset();

toastr.success("Curso registrado correctamente");
});

/* =========================
   EDITAR / ELIMINAR
========================= */

tabla.addEventListener('click',e=>{
const tr=e.target.closest('tr');
if(!tr) return;

const id=Number(tr.dataset.id);
let cursos=obtenerCursos();
const curso=cursos.find(c=>c.id===id);

/* ===== ELIMINAR ===== */

if(e.target.classList.contains('eliminar')){

toastr.clear();
toastr.info(
'<br><button id="confirmDelete" class="btn-action btn-borrar">Sí eliminar</button> '+
'<button id="cancelDelete" class="btn-action btn-guardar">Cancelar</button>',
'¿Eliminar curso?',
{allowHtml:true,timeOut:0,extendedTimeOut:0}
);

document.getElementById('confirmDelete').onclick=()=>{
cursos=cursos.filter(c=>c.id!==id);
guardarCursos(cursos);
cargarCursos();
toastr.clear();
toastr.success("Curso eliminado");
};

document.getElementById('cancelDelete').onclick=()=>toastr.clear();
}

/* ===== ACTUALIZAR ===== */

if(e.target.classList.contains('editar')){

toastr.clear();
toastr.info(
'<br><button id="confirmEdit" class="btn-action btn-guardar">Sí guardar</button> '+
'<button id="cancelEdit" class="btn-action btn-borrar">Cancelar</button>',
'¿Guardar cambios?',
{allowHtml:true,timeOut:0,extendedTimeOut:0}
);

document.getElementById('confirmEdit').onclick=()=>{

curso.nombre_curso=tr.querySelector('.nombre-curso').value;
curso.nombre_instructor=tr.querySelector('.nombre-instructor').value;
curso.horas=tr.querySelector('.horas').value;
curso.nivel=tr.querySelector('.nivel').value;
curso.fecha_inicio=tr.querySelector('.fecha-inicio').value;
curso.costo=tr.querySelector('.costo').value;

guardarCursos(cursos);
toastr.clear();
toastr.success("Curso actualizado");
};

document.getElementById('cancelEdit').onclick=()=>toastr.clear();
}

});
