import { createClientAsync, Client } from 'soap';

const soapServiceUrl = 'http://localhost:3000/wallet?wsdl';

const options = {};

const createSoapClient = () => {
  return createClientAsync(soapServiceUrl)
};

export default createSoapClient;