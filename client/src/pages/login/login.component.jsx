import React, { useState } from 'react'
import { Form, Icon, Input, Button } from 'antd';



import jwt_decode from 'jwt-decode'
import axios from 'axios'
const SERVER_URL = 'https://arcane-savannah-62336.herokuapp.com/'



const Login = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const data = []
    const login = (e) => {
        e.preventDefault()

        axios.post(SERVER_URL + "users/login", {
            email: email,
            password: password
        }).then((result) => {
            console.log(result)
            const token = result.data.token
            console.log(token)
            localStorage.setItem('jwtToken', token)
            const decoded_token = jwt_decode(token)
            console.log('USER ID', decoded_token)
        
            window.location.reload()
        }).catch((e) => console.log(e.response.data))
    }
    const handleChange = (e) => {
        const { value, name } = e.target
        console.log(value, name)
        name === "email" && setEmail(value)
        name === "password" && setPassword(value)
    }
    return (
        <div className="container">
            <div className="row">
                <h1>Login</h1>

                <Form layout="inline" onSubmit={login}>
                    <Form.Item >
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                name="email"
                                onChange={handleChange}
                                placeholder="Username"
                            />
                    </Form.Item>
                    <Form.Item >
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password"
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                         </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login