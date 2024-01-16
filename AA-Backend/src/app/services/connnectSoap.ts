import { createClientAsync, Client } from 'soap';

const soapServiceUrl = process.env.SOAP_SERVICE_URL;

const options = {};

const createSoapClient = () => {
  return createClientAsync(soapServiceUrl)
};

export default createSoapClient;