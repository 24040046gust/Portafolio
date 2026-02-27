

// Elementos del DOM
const coursesContainer = document.getElementById('coursesContainer');
const loginSection = document.getElementById('loginSection');
const adminSection = document.getElementById('adminSection');
const showLoginBtn = document.getElementById('showLoginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const addCourseForm = document.getElementById('addCourseForm');
const logoutBtn = document.getElementById('logoutBtn');
const startBtn = document.getElementById('startBtn');

// SCROLL SUAVE AL HACER CLICK EN COMENZAR
startBtn.addEventListener('click', () => {
    document.getElementById('coursesSection').scrollIntoView({ behavior: 'smooth' });
});

// EFECTO DE APARICIÓN (SCROLL)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Mostrar/ocultar modal de Login
showLoginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// =========================================================
// SIMULACIÓN DE BASE DE DATOS (Con LocalStorage)
// =========================================================

// 1. Inicializar algunos cursos de prueba si la "DB" está vacía
if (!localStorage.getItem('courses_db')) {
    const cursosIniciales = [
        { title: "Desarrollo Web Fullstack", description: "Aprende HTML, CSS, JS y Node.js desde cero." },
        { title: "Python para Ciencia de Datos", description: "Domina el análisis de datos y Machine Learning." }
    ];
    localStorage.setItem('courses_db', JSON.stringify(cursosIniciales));
}

// 2. Cargar cursos en la pantalla
function loadCourses() {
    // Obtenemos los cursos de localStorage
    const courses = JSON.parse(localStorage.getItem('courses_db')) || [];
    coursesContainer.innerHTML = '';
    
    if (courses.length === 0) {
        coursesContainer.innerHTML = '<p>Próximamente nuevos cursos...</p>';
    } else {
        courses.forEach((course, index) => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <p class="step-num">CURSO #0${index + 1}</p>
                <h3>${course.title}</h3>
                <p>${course.description || 'Sin descripción'}</p>
            `;
            coursesContainer.appendChild(card);
        });
    }
    observer.observe(coursesContainer);
}

// 3. Revisar si hay una sesión activa
function checkSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
    } else {
        loginSection.style.display = 'block';
        adminSection.style.display = 'none';
    }
}

// 4. Lógica de Login Simulada
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validamos las credenciales directamente aquí
    if (email === 'admin@gmail.com' && password === '1234') {
        localStorage.setItem('isLoggedIn', 'true'); // Guardamos la sesión
        loginModal.style.display = 'none';
        loginForm.reset();
        checkSession(); // Actualizamos la vista para mostrar el panel admin
    } else {
        alert('Credenciales incorrectas. Intenta con admin@gmail.com / 1234');
    }
});

// 5. Agregar un curso nuevo a la "DB" simulada
addCourseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Traemos los cursos actuales, agregamos el nuevo y guardamos
    const courses = JSON.parse(localStorage.getItem('courses_db')) || [];
    courses.push({ title, description });
    localStorage.setItem('courses_db', JSON.stringify(courses));

    loadCourses(); // Recargamos la vista de cursos
    addCourseForm.reset();
});

// 6. Cerrar sesión
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn'); // Borramos la sesión
    checkSession(); // Ocultamos el panel admin
});

checkSession();
loadCourses();
