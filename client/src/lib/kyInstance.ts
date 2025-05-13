import ky from 'ky';

export const kyInstance = ky.create({ prefixUrl: 'http://localhost:5000/', headers: { 'Content-Type': 'application/json' }, credentials: 'include' })






