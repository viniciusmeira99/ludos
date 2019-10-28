import { baseURL } from 'api';

export default user => user.image ? `${baseURL}${user.image}` : undefined;
