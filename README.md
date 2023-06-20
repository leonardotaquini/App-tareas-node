# Aplicación de Tareas en Node.js

Esta es una aplicación de práctica en la que puedes hacer un CRUD de tareas.

## Descarga y ejecución en localhost

Para ejecutar la página en tu localhost, sigue los siguientes pasos:

1. Clona el proyecto.
2. Navega a la carpeta del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:
    ```
    npm install
    ```
4. Crea la base de datos MySQL que se utilizará.
5. Crea un archivo `.env` en el que agregarás los siguientes datos:

    ```
    DB_NAME=nombre-de-la-db
    DB_USERNAME=nombre-de-usuario-de-tu-db
    DB_PASSWORD=contraseña-de-tu-db
    DB_HOST=localhost
    DB_DIALECT=mysql
    ```

6. ¡Listo! Ahora puedes ejecutar el siguiente comando en la consola:
    ```
    npm run dev
    ```

7. Abre tu navegador y visita la siguiente URL: [http://localhost:3000](http://localhost:3000)

