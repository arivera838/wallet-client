# README - Desarrollo de Servidor SOAP, Servicios Serverless y Frontend Wallet

Este README tiene como objetivo proporcionar una guía detallada sobre el desarrollo de un proyecto que consta de tres componentes principales: un Servidor SOAP en Node.js y Express, un Servicio Serverless en Node.js y AWS, y un Frontend en React.js. El proyecto final es una billetera digital (wallet) que utiliza un Servicio Serverless para comunicarse con el Servidor SOAP y proporcionar una interfaz de usuario atractiva en el Frontend.

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Servidor SOAP](#servidor-soap)
   - [Tecnologías Utilizadas](#tecnologías-utilizadas)
   - [Estructura del Proyecto](#estructura-del-proyecto)
   - [Principios y Buenas Prácticas](#principios-y-buenas-prácticas)
3. [Servicio Serverless](#servicio-serverless)
   - [Tecnologías Utilizadas](#tecnologías-utilizadas-1)
   - [Arquitectura](#arquitectura)
   - [Construcción del API](#construcción-del-api)
4. [Frontend Wallet](#frontend-wallet)
   - [Tecnologías Utilizadas](#tecnologías-utilizadas-2)
   - [Adaptación de un Proyecto Libre](#adaptación-de-un-proyecto-libre)
   - [Interfaz de Usuario](#interfaz-de-usuario)
5. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
6. [Contribuciones](#contribuciones)
7. [Licencia](#licencia)

## Introducción
Este proyecto se centra en el desarrollo de una billetera digital que permite a los usuarios realizar transacciones y gestionar su saldo. Para lograrlo, se han implementado tres componentes clave: un Servidor SOAP, un Servicio Serverless y un Frontend en React.js. Estos componentes trabajan en conjunto para proporcionar una experiencia completa de billetera digital.

## Servidor SOAP
### Tecnologías Utilizadas
- Node.js
- Express.js
- SOAP npm
- TypeScript

### Estructura del Proyecto
El Servidor SOAP se encuentra en la carpeta `server-soap`. La estructura del proyecto se intenta seguir con  las mejores prácticas de organización de código.

```plaintext
server-soap/
|-- src/
├───commons
│   ├───constants
│   ├───helpers
│   └───Interfaces
├───components
│   └───user
└───repository
|-- package.json
|-- tsconfig.json
|-- README.md
```

### Principios y Buenas Prácticas
El código del Servidor SOAP sigue los principios de diseño de RESTful API, utiliza TypeScript para proporcionar tipado seguro y se adhiere a las buenas prácticas de seguridad y documentación.

## Servicio Serverless
### Tecnologías Utilizadas
- Node.js
- AWS (Lambda, API Gateway)
- Serverless Framework

### Arquitectura
El Servicio Serverless se encuentra en la carpeta `AA-Backend`. Utiliza AWS Lambda para ejecutar funciones sin servidor y API Gateway para crear una API REST.

```plaintext
AA-Backend/
|-- src/
|--   ──app
|--   ├───commons
|--   |--  ├───helpers
|--   |--  ├───Interfaces
|--   |--  └───models
|--   ├───components
|--   |--  └───user
|--   └───services
|-- package.json
|-- README.md
```

### Construcción del API
El API REST construido con AWS Lambda y API Gateway se encarga de comunicarse con el Servidor SOAP para realizar transacciones y gestionar el saldo de la billetera. El archivo `serverless.yml` contiene la configuración de las funciones Lambda y las rutas de la API.

## Frontend Wallet
### Tecnologías Utilizadas
- React.js
- JavaScript/TypeScript
- HTML/CSS

### Adaptación de un Proyecto Libre
El Frontend se basó en un proyecto de código abierto de GitHub, que se encuentra en la carpeta `react-wallet`. Se realizaron modificaciones y adaptaciones para cumplir con los requisitos de la billetera digital.

```plaintext
react-wallet/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- App.js
|-- package.json
|-- README.md
```

### Interfaz de Usuario
La interfaz de usuario proporciona a los usuarios una experiencia intuitiva para realizar transacciones, ver el saldo y administrar su billetera. Se utilizaron componentes React reutilizables para crear una interfaz atractiva y funcional.

## Cómo Ejecutar el Proyecto
Para ejecutar este proyecto en su totalidad, siga las instrucciones detalladas en los respectivos README de cada componente (Servidor SOAP, Servicio Serverless y Frontend Wallet).

## Contribuciones
¡Las contribuciones son bienvenidas! Si desea mejorar este proyecto o solucionar problemas, no dude en crear una solicitud de extracción o informar sobre problemas en el repositorio.

## Licencia
Este proyecto se encuentra bajo la [Licencia MIT](LICENSE), lo que significa que es de código abierto y puede utilizarlo según sus necesidades.

¡Gracias por ser parte de este emocionante proyecto de billetera digital! Si tiene alguna pregunta o necesita ayuda, no dude en ponerse en contacto con nosotros.

---