# README - Creación de un servidor SOAP con Express y Node.js usando TypeScript, conexión con AWS DynamoDB y envío de correos electrónicos con AWS SES

Este repositorio contiene un proyecto de servidor SOAP desarrollado en Node.js utilizando Express y TypeScript. Además, se integra con los servicios de AWS DynamoDB para la gestión de la base de datos y AWS SES para el envío de correos electrónicos.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [AWS CLI](https://aws.amazon.com/cli/) configurado con las credenciales adecuadas
- [DynamoDB local](https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) configurado y en funcionamiento en tu máquina local para el desarrollo en un entorno local.

## Configuración de AWS

Antes de ejecutar la aplicación, debes configurar tus credenciales de AWS y establecer la región por defecto. Utiliza el comando `aws configure` y sigue las instrucciones para establecer las credenciales.

## Iniciar el proyecto

Sigue estos pasos para configurar y ejecutar el proyecto:

##  Instala las dependencias:

```bash
npm install
```

##  Configura las variables de entorno en un archivo `.env`. Debes proporcionar las credenciales de AWS y otros valores necesarios:

```env
REGION="us-east-1"
STAGE="dev"

NAMEFILEWSDL="WalletService.wsdl"
TABLEWALLETCLIENT='wallet-client'
TABLEWALLET='wallet'
TABLEWALLETPAY='wallet-pay'	
```

## Configuración de las Credenciales de AWS

Para configurar las credenciales de AWS en tu máquina local y permitir el acceso a los servicios de AWS desde la línea de comandos, sigue estos pasos:

1. Abre una terminal o línea de comandos en tu máquina.

2. Ejecuta el siguiente comando para configurar las credenciales. Reemplaza `AKIAQSSLSH3FFCGBNIHN` y `rLM0epozMdj4rPcl87XbQZa26ZQAvey0CqjVwjD7` con tus propias credenciales de AWS:

   ```bash
   aws configure

## Ejecuta la aplicación:

```bash
npm start
```

La aplicación se ejecutará en `http://localhost:3000`. Puedes acceder a la interfaz SOAP en esta dirección para interactuar con los servicios proporcionados.

## Uso de los servicios SOAP

Para usar los servicios SOAP proporcionados por este servidor, consulta la documentación o la definición de servicios SOAP proporcionada en el proyecto.
