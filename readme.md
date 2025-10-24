#CLASE 2

Primer login por formulario

¿Cómo lo hacemos? Se levantará un sistema de login completo utilizando router + motor de plantillas Handlebars + base de datos para usuarios y sesiones

Se deberá contar con una estructura de router para sessions en /api/sessions/ el cual contará con métodos para registrar a un usuario y para su respectivo login
Se deberá contar además con un router de vistas en la ruta base / para llevar al formulario de login, de registro y de perfil.

El formulario de registro insertará en la base de datos el usuario. El cual deberá contar con:
first_name
last_name
email
age
password

Se debe contar con el formulario de login el cual corroborará que el usuario exista en la base, y además genere un objeto user en req.session, indicando que puede utilizar la página.
Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.
En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.

ACTIVIDAD EN CLASE

Reajustando autorización

Con base en el proyecto realizado en el Hands on lab:
Cambiar la validación de rutas por middlewares de rutas públicas o privadas. 
Las rutas públicas deben regresar siempre a la pantalla de login en caso de que no se reconozca una session activa.
Las rutas privadas deben regresar siempre a la pantalla de profile en caso de que haya una sesión activa en session.
Realizar un botón “logout” en la vista de perfil, que permita destruir la sesión y redireccionar a la vista de login.
