<div id="top"></div>
<!-- Template para readme tomado de: https://github.com/othneildrew/Best-README-Template -->

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Este proyecto fue desarrollado para la prueba como backend engineer de tyba. 
A continuación se puede encontrar la información sobre el proyecto, dependencias y manual de instalación.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

Se utilizaron las siguientes tecnologías y modulos para el desarrollo de este proyecto:

* [Node js](https://nodejs.org/en/)
  * [Express](https://expressjs.com/)
  * [axios](https://www.npmjs.com/package/joi)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  * [md5](https://www.npmjs.com/package/md5)
  * [pg](https://www.npmjs.com/package/pg)
* [Postgresql](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

A continuación se presenta la información necesaria para correr el proyecto en un local host.

### Prerequisites

Para desplegar el proyecto es necesario contar con nodeJS instalado y en una instancia de postgresql corriendo ambos en sus puertos por defecto y en el mismo host. Sin embargo se puede utilizar la configuración de docker-compose andjunta para desplegar un container con todo configurado.

### Installation

1. Obtener una API KEY para [GCP](https://console.cloud.google.com/apis/library/places-backend.googleapis.com?project=sacred-brace-350403) con el API para lugares.
2. Clone el repositorio de github con el proyecto
   ```sh
   git clone https://github.com/linkhl09/test-tyba
   ```
3. Inserte el API KEY en la configuración del environment (linea 30) del archivo [docker-compose.yaml](docker-compose.yaml)
   ```js
   GOOGLE_KEY={aqui}
   ```
4. Ejecute el docker-compose
   ```sh
   docker-compose up
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

A continuación se presentan los endpoints de la app.
|Función| dirección | parametros| cabeceras|
|-|-|-|-|
|SignUp | ...api/users/register | username, email, password, passwordConf|Ninguna|
|SignIn | .../api/users/login | username, password|Ninguna|
|Buscar | .../api/locations | latitud, longitud, radio | access-token: Token de acceso|
|Historial | .../api/history | ---|access-token: Token de acceso|

**radio**: Se debe ingresar un valor en metros.

Adicionalmente se adjunta en la carpeta de [collections](./collections/) las colecciones de Postman donde se pueden probar cada uno de los endpoint junto con un preview de los errores.
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Implementar endpoints
  - [x] Registro de usuario
  - [x] Login de usuario
  - [x] Endpoint restaurantes
    - [x] Formatear bonito respuesta del endpoint
  - [x] Transacciones
- [x] Realizar pruebas de enpoints
  - [x] Exportar al proyecto
- [x] Montar Docker compose
- [/] Documentar (quedo incompleta)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Andres Hernández- [LinkedIn](https://www.linkedin.com/in/andreshernan/) - af.hernandezl@hotmail.com

Project Link: [https://github.com/linkhl09/test-tyba](https://github.com/linkhl09/test-tyba)

<p align="right">(<a href="#top">back to top</a>)</p>