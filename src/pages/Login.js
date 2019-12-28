import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signInUser } from '../store/actions/authActions'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signInUser(this.state);
        console.log(this.props);
    }
    render() {
        const { authError, auth } = this.props
        //if (auth.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <form className="white" onSubmit = {this.handleSubmit}>
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
                        <button className="btn z-depth-0">Login</button>
                        <div className="red-text center">
                            { authError ? <p> { authError }</p> : null }
                        </div>
                    </div>
                </form>
                <Link to='/signup'>Do not have an account?</Link>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    authError : auth.authError
})

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser : credentials => { dispatch(signInUser(credentials)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
