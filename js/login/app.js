import { User, UserWithoutPassword } from './User.js';
import { validatePassword, validateEmail } from '../validators.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

const isLogged = JSON.parse(sessionStorage.getItem('isLogged'));
if (isLogged) {
  // No deberia poder ver la página
  window.location.href = './admin/admin.html';
}

// -----------------------------------------
// 2. Crear usuario por defecto
// -----------------------------------------

const adminUser = new User('admin@gmail.com', 'admin');

// -----------------------------------------
// 3. Seleccionar elementos del DOM
// -----------------------------------------

const formLogin = document.getElementById('form-login');
const emailInput = document.getElementById('email-login');
const passwordInput = document.getElementById('password-login');
const credentialsAlert = document.getElementById('alert-credenciales');

// -----------------------------------------
// 4. Manejar el submit
// -----------------------------------------

formLogin.addEventListener('submit', (e) => {
  // A. Prevenimos comportamiento por defecto
  e.preventDefault();

  // B. Leer valores de los campos
  const email = emailInput.value;
  const password = passwordInput.value;

  // C. Validar los campos (solo el contenido)
  if (
    validateEmail(email, emailInput) &&
    validatePassword(password, passwordInput)
  ) {
    // los campos estan OK pero no sabemos aun si son las credenciales

    // i. Resetear las clases
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');

    // ii. Validamos credenciales
    if (email === adminUser.email && password === adminUser.password) {
      // SOLO ACA el login está ok

      // 1. Ocultar alert
      credentialsAlert.classList.add('d-none');

      // 2. Crear usuario sin contraseña p/ guardarlo
      const loggedUser = new UserWithoutPassword('admin@gmail.com');

      // 3. Guardar estado
      sessionStorage.setItem('isLogged', true);
      sessionStorage.setItem('user', JSON.stringify(loggedUser));

      // 4. Mensaje de exito
      swal
        .fire({
          title: 'Bienvenido',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        })
        .then(() => {
          // 5. Redireccion a admin
          window.location.href = './admin/admin.html';
        });
    } else {
      // Credenciales no validas
      credentialsAlert.classList.remove('d-none');
    }
  }
});
