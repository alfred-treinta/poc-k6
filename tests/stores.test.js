import http from 'k6/http';
import { check } from 'k6';

import { PATHS } from '../microservices/endpoint_paths.js';

import { 
    generateRandomString,
    generateUUID
 } from '../utils/dynamic_data.js';

import { 
    FIREBASE_URL,
    FIREBASE_TREINTA_KEY,
    FIREBASE_USER,
    FIREBASE_USER_PASSWORD,
    ORCH_BASE_URL,
    STORE_ID,
    API_KEY
} from '../utils/constants.js';

const PRODUCT = PATHS.STORES

/* Stress testing stages */
export const options = {
    vus: 10,
    duration: '30s'
    /*stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 }
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 }
    ]*/
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
    const BASE_URL = `${ORCH_BASE_URL}${PRODUCT.CREATE_PRODUCT}`
    const HEADERS = {
        'content-type': 'application/json',
        'x-api-key': `${API_KEY}`, 
        'Authorization': `Bearer ${JSON.stringify(token)}`
    }

    let PAYLOAD = JSON.stringify([
        {
            id: generateUUID(),
            name: `From K6 ${generateRandomString()}`,
            sku: null,
            price: 10,
            cost: 5,
            stock: 10,
            notes: null,
            transactions: 0,
            categories: null,
            imageUrl: "",
            is_visible: true,
            is_offline: false,
            store_id: `${STORE_ID}`,
            inages: null,
            store_categories_id: null
        }
    ])

    const request = http.post(BASE_URL, PAYLOAD, { headers: HEADERS})
    check( request, {
        'Endpoint responses is status 201': (r) => r.status === 201
    })
}