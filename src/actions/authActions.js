import * as types from './actionTypes';
import Auth0 from 'auth0-js';


let auth0 = new Auth0({
    domain:       'harmony.auth0.com',
    clientID:     'Xhs1oIytMrij0k3ixyLalsPEz7d2K1ME',
    callbackURL:  'http://localhost:3000',
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
                console.log(results.idToken);
                localStorage.setItem('id_token', results.idToken);
                dispatch(authenticated(results.idToken));

                // auth0.getProfile(results.idToken, (err, me) => {
                //     console.log(me);
                //     localStorage.setItem('me', me);
                //     dispatch(authenticated_me(me));
                // });
                //
                // location

            }
        });

        dispatch(authenticating("athenticating"));
    }
}


