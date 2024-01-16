Aplicación Serverless con Node.js en AWS

Aplicación serverless utilizando Node.js en AWS. La aplicación actúa como intermediario entre un servidor SOAP existente y un API REST para la comunicación entre el frontend y la base de datos. Cubriremos la estructura del proyecto, cómo crear las APIs y cómo inicializar el proyecto desde cero utilizando Serverless Framework.

## Estructura del Proyecto

La estructura de carpetas y archivos de nuestro proyecto serverless podría verse de la siguiente manera:

```
my-serverless-app/
  ├── src/
  │   ├── handlers/
  │   │   ├── soapHandler.js       # Manejador para la comunicación con el servidor SOAP
  │   │   ├── restHandler.js       # Manejador para la API REST
  │   ├── services/
  │   │   ├── soapService.js       # Lógica para interactuar con el servidor SOAP
  │   │   ├── databaseService.js   # Lógica para interactuar con la base de datos
  ├── serverless.yml               # Configuración del proyecto Serverless
  ├── package.json                 # Dependencias del proyecto
  ├── README.md                    # Este archivo
```

## Creación de las APIs

Para crear las APIs en AWS Lambda y API Gateway, utilizaremos el Serverless Framework. Asegúrate de tener Node.js y npm instalados en tu máquina.

1. Instala el Serverless Framework globalmente si aún no lo has hecho:

   ```bash
   npm install -g serverless
   ```

2. Configura tus credenciales de AWS utilizando el comando `serverless config credentials` y sigue las instrucciones para proporcionar las credenciales de AWS.

3. Define las funciones Lambda y las rutas de la API en el archivo `serverless.yml`. Por ejemplo:

   ```yaml
   service: my-serverless-app
   provider:
     name: aws
     runtime: nodejs14.x

   functions:
    registerClient:
        handler: src/app/components/user/register-user.registerUser
        events:
        - http:
            path: client/register
            method: POST
            cors: true

    loadWalletClient:
        handler: src/app/components/user/load-wallet.loadWallet
        events:
        - http:
            path: wallet/load
            method: POST
            cors: true
    
    getWalletClient:
        handler: src/app/components/user/get-wallet.getWallet
        events:
        - http:
            path: wallet/get
            method: POST
            cors: true

    payItemClient:
        handler: src/app/components/user/pay-item.payItem
        events:
        - http:
            path: wallet/pay
            method: POST
            cors: true
    
    payConfirmClient:
        handler: src/app/components/user/pay-confirm.payConfirm
        events:
        - http:
            path: wallet/pay/confirm
            method: POST
            cors: true
   ```

4. Implementa tu proyecto en AWS usando el comando:

   ```bash
   serverless deploy
   ```

Esto creará las funciones Lambda y las configuraciones necesarias en AWS API Gateway.

## Inicialización del Proyecto

Para inicializar el proyecto desde cero en tu máquina, sigue estos pasos:


1. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Configura tus credenciales de AWS si aún no lo has hecho:

   ```bash
   serverless config credentials --provider aws --key AKIAQSSLSH3FFCGBNIHN --secret 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
   ```

4. Utiliza el comando `serverless deploy` para desplegar la aplicación en tu cuenta de AWS.

## Uso de la Aplicación

Una vez que la aplicación serverless esté desplegada, puedes usarla para comunicarte entre el servidor SOAP y el API REST para la base de datos. Asegúrate de que tu frontend esté configurado para interactuar con las rutas definidas en la configuración de AWS API Gateway.

## Comandos Útiles

- Iniciar sesión en Serverless Framework:

  ```bash
  serverless login
  ```

- Desplegar la aplicación en AWS:

  ```bash
  serverless deploy
  ```

- Eliminar la aplicación de AWS:

  ```bash
  serverless remove
  ```

Este README proporciona una base sólida para crear y desplegar una aplicación serverless en AWS utilizando Node.js y Serverless Framework. Asegúrate de personalizar la configuración según las necesidades específicas de tu proyecto y de seguir las mejores prácticas de seguridad y gestión de recursos en AWS