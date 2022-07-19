import http from 'k6/http';
import { check } from 'k6';

import { PATHS } from '../microservices/endpoint_paths.js';

import { epoch } from '../utils/epoc_date.js';
import { generateRandomString } from '../utils/dynamic_data.js';

const FIREBASE_URL = __ENV.FIREBASE_URL
const FIREBASE_TREINTA_KEY = __ENV.FIREBASE_TREINTA_KEY
const FIREBASE_USER = __ENV.FIREBASE_USER
const FIREBASE_USER_PASSWORD = __ENV.FIREBASE_USER_PASSWORD
const ORCH_BASE_URL = __ENV.ORCH_BASE_URL
const USER_ID = __ENV.USER_ID
const STORE_ID = __ENV.STORE_ID
const API_KEY = __ENV.API_KEY

const TRANSACTION = PATHS.TRANSACTIONS

export const options = {
  vus: 1,
  duration: '1s'
};

export function setup() {
    const AUTH_URL = `${FIREBASE_URL}${FIREBASE_TREINTA_KEY}`
    const HEADERS = {
        'content-type': 'application/json',
    }
    const PAYLOAD = JSON.stringify({
        email: `${FIREBASE_USER}`,
        password: `${FIREBASE_USER_PASSWORD}`,
        returnSecureToken: true
    })
    const request = http.post(AUTH_URL, PAYLOAD, { headers: HEADERS})
    return { token: request.json().idToken}
}

export default function (token) {
    const BASE_URL = `${ORCH_BASE_URL}${TRANSACTION.CREATE_TRANSACTION}`
    const HEADERS = {
        'content-type': 'application/json',
        'x-api-key': `${API_KEY}`, 
        'Authorization': `Bearer ${JSON.stringify(token)}`
    }

    let PAYLOAD = JSON.stringify([
        {
            value: 1,
            is_offline: false,
            user_id: `${USER_ID}`,
            store_id: `${STORE_ID}`,
            description: `From K6 ${generateRandomString()}`,
            transaction_status_id: 1,
            payment_type_id: 1,
            transaction_type_id: 1,
            date: epoch(),
            contact_id: null
        }
    ])

    const request = http.post(BASE_URL, PAYLOAD, { headers: HEADERS})
    check( request, {
        'Endpoint responses is status 201': (r) => r.status === 201
    })
}