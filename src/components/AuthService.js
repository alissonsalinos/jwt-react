import decode from 'jwt-decode'

export default class AuthService {
    constructor(domain){
        this.domain = domain || `http://localhost:8080`
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }
    login(username, password){
        return this.fetch(`${this.domain}/login`,{
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res =>{
            this.setToken(res.token)
            return Promise.resolve(res)
        })
    }
    fetch(url, options){
        const headers = {
           'Accept': 'application/json',
           'Content-type': 'application/json' 
        }

        if(this.loggedIn())
            headers['Authorization'] = `Bearer ${this.getToken()}`

        return fetch(url, {
            headers,
            ...options
        }) 
        .then(this._checkStatus)
        .then(response => response.json())   
    }

    getToken(){
        return localStorage.getItem('id_token')
    }
    setToken(idToken){
        return localStorage.setItem('id_token', idToken)
    }
    loggedIn(){
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }
    isTokenExpired(token){
        try{
           const decoded = decode(token)
           if(decoded.exp < Date.now() / 1000){
               return true
           } else {
               return false
           }
        }
        catch(e){
            return false
        }
    }
    logout(){
        localStorage.removeItem('id_token')
    }

    getProfile(){
        return decode(this.getToken())
    }

    _checkStatus(response){
        if(response.status >= 200 && response.status < 300)
        return response
        else{
            let error = new Error(response)
            error.response = response
            throw error
        }
    }



}