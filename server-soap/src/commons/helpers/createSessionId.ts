
import { v4 as uuidv4 } from 'uuid';

const createSessionId = () => {
    const sessionID = uuidv4();
    return sessionID
}

export default createSessionId