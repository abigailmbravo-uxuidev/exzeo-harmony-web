import React from 'react';
import {connect} from 'react-redux'

const Home = ({token, me}) => {
    console.log(token, me)
    return(
        <div>
            <h4>Token:</h4>
            {token ? token : ''}

            <h4>Me:</h4>
            {me ? me : ''}
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.auth.get('token'),
    me: state.auth.get('me')
});

export default connect(mapStateToProps)(Home);