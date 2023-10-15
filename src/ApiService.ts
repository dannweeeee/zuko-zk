import { SismoConnectResponse } from "@sismo-core/sismo-connect-react";

// ApiService.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://production-api-url.com' : 'http://localhost:3050';

const HEADERS = {
    'Content-Type': 'application/json',
};

const ApiMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const ApiService = {
    verifySismoProofBackend: async (sismoResponse: SismoConnectResponse) => {
        const url = `${API_BASE_URL}/v1/auth`;
        const options = {
            method: ApiMethods.POST,
            headers: HEADERS,
            body: JSON.stringify(sismoResponse),
        };

        const response = await fetch(url, options);

        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    createUser: async (vault_id: string, username: string) => {
        const url = `${API_BASE_URL}/v1/user`;
        const options = {
            method: ApiMethods.POST,
            headers: HEADERS,
            body: JSON.stringify({ vault_id, username }),
        };

        const response = await fetch(url, options);

        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    }

    // Define other API methods here
};

export default ApiService;
