import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { userLogin } from '../../actions'
import {useInput} from '../hooks/useInput'
import { FormContainer } from '../../styled-components';

const LoginForm = props => {

    const [type, setType, handleType] = useInput('')
    const [username, setUsername, handleUsername] = useInput('')
    const [password, setPassword, handlePassword] = useInput('')

    const userLogin = e => {
        e.preventDefault()
        localStorage.setItem('type', type.value)
        props.userLogin({
            username,
            password,
            type: type.value
        })
        setType('')
        setUsername('')
        setPassword('')
    }
    return(
        <FormContainer>
            <Form size='massive' inverted>
                    <Form.Input 
                    required
                    label='Username' 
                    type='text' 
                    name='username' 
                    value={username} 
                    onChange={e => handleUsername(e.target.value)} 
                    />
                    <Form.Input
                    required
                    label='Password'
                    type='password'
                    value={password}
                    name='password'
                    onChange={e => handlePassword(e.target.value)}  
                    />
                    <p className='error'>{props.error}</p>
                     <Form.Group inline>
                        <Form.Button size='massive' onClick={userLogin}>Submit</Form.Button>
                        <Link className='login-link' to='/register'>Register</Link>
                    </Form.Group>
            </Form>
        </FormContainer>
    )
}

const mapStateToProps = state => {
    return {
        options: state.options,
        error: state.error
    }
}

export default connect(
    mapStateToProps,
 {userLogin}
)(LoginForm)