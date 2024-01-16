import parseXML from 'xml-parse-from-string'

const getErrorXml = (str) => {
    const oject = parseXML(str.response.data)
    return oject
}

export default getErrorXml