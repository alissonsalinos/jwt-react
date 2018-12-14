import React, {Component} from 'react'
import './Login.css'
import AuthService from './AuthService'

class Login extends Component {

    constructor(){
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.Auth = new AuthService()
    } 
    
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/')
    }

    render(){
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input className="form-item" type="text" placeholder="Usuário" name="username" onChange={this.handleChange} />

                        <input className="form-item"  type="password" placeholder="Password" name="password" onChange={this.handleChange} />

                        <input className="form-submit"  type="submit" value="Enviar" />



                    </form>
                </div>
            </div>
        )
    }
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.username, this.state.password)
            .then(res => {
                this.props.history.replace('/')
            })
            .catch(err => {
                alert('login falhou', err)
            })
    }


} 

export default Login
