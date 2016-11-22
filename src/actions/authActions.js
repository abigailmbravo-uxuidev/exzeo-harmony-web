import * as types from './actionTypes';
import Auth0 from 'auth0-js';

let auth0 = new Auth0({
    domain:       'harmony.auth0.com',
    clientID:     'Xhs1oIytMrij0k3ixyLalsPEz7d2K1ME',
    callbackURL:  '/',
    callbackOnLocationHash: true,
    response: 'token'
});

export const authenticating = (state) => {
    return { type: types.AUTHENTICATING, state }
}

export const authenticated = (token) => {
    return { type: types.AUTHENTICATED, token }

}

export const authenticate_error = (error) => {
    return { type: types.TOGGLE_FEATURE, error }
}

export const authenticated_me = (me) => {
    return { type: types.AUTH_ME, me }

}


export const login = creds => {
    return dispatch => {

        auth0.login({
            connection: 'Harmony',
            username: creds.username,
            password: creds.password,
        }, (err, results)=>{
            if(err) {
                dispatch(authenticate_error(err));
            }
            else {
                localStorage.setItem('id_token', results.idToken);
                dispatch(authenticated(results.idToken));
                window.location.href = '/home';
            }
        });

        dispatch(authenticating("athenticating"));
    }
}
