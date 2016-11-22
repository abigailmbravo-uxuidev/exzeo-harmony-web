import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios';

class Home extends Component {

    state = {
        me: ''
    }
    componentWillMount()
    {
        let token = this.props.token || localStorage.getItem('id_token');
        axios.get(`http://tryitout.co/me`, {headers: {Authorization: token}}).then((response) => {
            this.setState({me : response.data.permissions})
        });
    }
    render() {
        const {me} = this.state;
        return (
            <div>
                <h4>Me:</h4>
                {JSON.stringify(me, null, '\t')}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.get('token')
});

export default connect(mapStateToProps)(Home);