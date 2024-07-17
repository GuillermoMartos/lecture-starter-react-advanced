import { BASE_URL } from '../common/constants';
import { Http } from './http/http.service';
import { Trips } from './trips/trips.service';
import { Users } from './users/users.service';

const http = new Http();
export const usersService = new Users({ http, baseUrl: BASE_URL });
export const tripsService = new Trips({ http, baseUrl: BASE_URL });
