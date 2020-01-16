import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInUser, logOutUser } from '../store/actions/authActions'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    // componentDidMount() {
    //     const isLoggedIn = localStorage.getItem('isLoggedIn');
    //     console.log(isLoggedIn);
    //     this.setState({
    //         isLoggedIn: isLoggedIn
    //     });
    //     console.log(this.state);
    // }

    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.props.isLoggedIn){
            const token = localStorage.getItem('token');
            console.log('handleSubmit', token);
            this.props.logOutUser(token);
            localStorage.setItem('token', null);
            localStorage.setItem('isLoggedIn', false);
        } else {
            this.props.signInUser(this.state);
        }
    }
    render() {
        const { authError, isLoggedIn, auth } = this.props
        //if (auth.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <form className="grey lighten-4" onSubmit = {this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <button className="btn z-depth-0">
                            {(isLoggedIn) ? "Logout" : "Login"}
                        </button>
                        <div className="red-text center">
                            { authError ? <p> { authError } </p> : null }
                        </div>
                    </div>
                </form>
                <Link to='/signup'>Do not have an account?</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state.auth);
    return {
        authError : state.auth.authError,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser : credentials => { dispatch(signInUser(credentials)) },
    logOutUser : (token) => { dispatch(logOutUser(token)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
