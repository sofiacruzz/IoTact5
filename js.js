// Crear una instancia del objeto Particle para interactuar con la API de Particle
var particle = new Particle();
var token; // Variable para almacenar el token de acceso

// Iniciar sesión en la API de Particle con credenciales del usuario
particle.login({ username: 'ccruz4@ucol.mx', password: 'Lilo2024' }).then(
    function(data) {
        // Si el inicio de sesión es exitoso, guardar el token de acceso en la variable 'token'
        token = data.body.access_token;
    },
    function (err) {
        // Si hay un error durante el inicio de sesión, mostrar el error en la consola
        console.log('Could not log in.', err);
    }
);

// Función para actualizar el estado de la luz y el interruptor basado en el estado recibido
function updateLight(status) {
    // Obtener el elemento de salida que mostrará el estado
    var output = document.getElementById('state1');
    output.innerHTML = status; // Mostrar el estado en el elemento de salida

    // Obtener el elemento del interruptor
    var toggle = document.getElementById('toggle');
    // Actualizar el estado del interruptor basado en el estado recibido
    if (status == '1') {
        toggle.checked = true;
    } else {
        toggle.checked = false;
    }

    // Llamar a la función del dispositivo en la API de Particle para controlar el LED
    particle.callFunction({ 
        deviceId: '1c002a000847313037363132', // ID del dispositivo
        name: 'led', // Nombre de la función a llamar en el dispositivo
        argument: status, // Argumento a pasar a la función (estado de la luz)
        auth: token, // Token de autenticación para la llamada
    });
}

// Añadir un evento de escucha al interruptor para manejar cambios en su estado
document.getElementById('toggle').addEventListener('change', function() {
    // Determinar el nuevo estado basado en si el interruptor está marcado o no
    var status = this.checked ? '1' : '0';
    // Llamar a la función para actualizar la luz con el nuevo estado
    updateLight(status);
});
