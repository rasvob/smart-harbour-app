
const API_BASEURl = import.meta.env.VITE_API_BASEURl
const API_RAW_BASEURl = import.meta.env.VITE_API_RAW_BASEURl
const API_LOGIN_URL = '/login/access-token';
const API_CURRENT_USER_URL = '/login/current-user';
const API_STATES_URL = '/states';
const API_ADD_STATE_URL = '/state';
const API_GET_DASHBOARD_DATA = '/dashboard';
const API_UPDATE_PAYMENT_STATE_URL = '/state/payment';
const API_UPDATE_IDENTIFIER_STATE_URL = '/state/identifier';
const WS_URL = API_RAW_BASEURl + '/ws';

const fetchWithTimeout = (resource, options = {}, timeout = 5000) => { // timeout in milliseconds
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const { signal } = controller;

    return fetch(resource, { ...options, signal })
        .catch(error => {
            if (error.name === 'AbortError') {
                throw new Error('Požadavek na server trval příliš dlouho. Kontaktujte správce aplikace.');
            }
            throw error;
        })
        .finally(() => clearTimeout(id));
};

const getAccessToken = async (username, password) => {
    if (username.length === 0 || password.length === 0) 
        return [false, 'Uživatelské jméno a heslo musí být vyplněny'];

    const data = new URLSearchParams({
        grant_type: '',
        scope: '',
        client_id: '',
        client_secret: '',
        username: username,
        password: password,
    });

    try {
        const response = await fetchWithTimeout(API_BASEURl + API_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            },
            body: data.toString()
        });

        if (response.ok) {
            const { token_type, access_token } = await response.json();
            return [true, `${token_type} ${access_token}`];
        } else {
            const { detail } = await response.json();
            return [false, detail];
        }
    } catch (error) {
        return [false, error.message];
    }
};

const getCurrentUser = async (token) => {
    const response = await fetch(API_BASEURl + API_CURRENT_USER_URL, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        return await response.json();
    }
    return null;
};

const getDashboardData = async (token) => {
    const response = await fetch(API_BASEURl + API_GET_DASHBOARD_DATA, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

const getAllStates = async (token) => {
    const response = await fetch(API_BASEURl + API_STATES_URL, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': token
        }
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
}

const addNewBoatState = async (token, boatState) => {
    const response = await fetch(API_BASEURl + API_ADD_STATE_URL, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boatState)
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

const updatePaymentStatus = async (token, id, status) => {
    const response = await fetch(API_BASEURl + API_UPDATE_PAYMENT_STATE_URL, {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': id, 'payment_status': status })
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

const updateBoatStateIdentifier = async (token, id, best_detected_identifier) => {
    const response = await fetch(API_BASEURl + API_UPDATE_IDENTIFIER_STATE_URL, {
        method: 'PATCH',
        headers: {
            'accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': id, 'best_detected_identifier': best_detected_identifier })
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

const updateBoatState = async (token, boatState) => {
    const response = await fetch(API_BASEURl + API_ADD_STATE_URL, {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(boatState)
    });

    if (response.ok) {
        return await response.json();
    }

    return null;
};

export {
    getAccessToken,
    getCurrentUser,
    getAllStates,
    addNewBoatState,
    updatePaymentStatus,
    updateBoatStateIdentifier,
    updateBoatState,
    getDashboardData,
    WS_URL, API_BASEURl
};