import { SismoConnectResponse } from "@sismo-core/sismo-connect-react";

// const API_BASE_URL = process.env.API_PRODUCTION_URL ? process.env.API_PRODUCTION_URL : 'http://localhost:3050';
const API_BASE_URL = 'https://zuko-server-api.onrender.com';
//const API_BASE_URL = "http://localhost:3050"
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
        console.log(url, 'wats url???, response:', response);

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
    },

    fetchUser: async (vault_id: string) => {
        const url = `${API_BASE_URL}/v1/user/${vault_id}`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        };

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return { username: data.username, vaultId: vault_id };
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchUsers: async () => {
        const url = `${API_BASE_URL}/v1/user/`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }
        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchCommunity: async (group_id: string) => {
        const url = `${API_BASE_URL}/v1/community/group/${group_id}`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchCommunities: async () => {
        const url = `${API_BASE_URL}/v1/community/`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchCommunityByVaultId: async (vault_id: string) => {
        const url = `${API_BASE_URL}/v1/community/vault/${vault_id}`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchPostsByGroupId: async (group_id: string) => {
        const url = `${API_BASE_URL}/v1/post/${group_id}`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    fetchCommentsByPostId: async (post_id: number) => {
        const url = `${API_BASE_URL}/v1/comment/${post_id}`;
        const options = {
            method: ApiMethods.GET,
            headers: HEADERS,
        }

        const response = await fetch(url, options);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    createPost: async (title: string, content: string, vault_id: string, group_id: string) => {
        const url = `${API_BASE_URL}/v1/post/`;
        const options = {
            method: ApiMethods.POST,
            headers: HEADERS,
            body: JSON.stringify({
                title,
                content,
                vault_id,
                group_id,
                comments_count: 0,
                likes_count: 0,
                timestamp: Math.floor(Date.now() / 1000), // Using Unix timestamp
            }),
        };

        const response = await fetch(url, options);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    },

    // Define other API methods here
};

export default ApiService;
