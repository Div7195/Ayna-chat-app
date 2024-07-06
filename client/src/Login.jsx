import React from 'react'
import { useState ,useContext} from 'react'
import {Box,Button,TextField,styled,Typography} from '@mui/material'

import { DataContext } from './context/DataProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const {setAccount} = useContext(DataContext);
    const initialLogin = {
        identifier:'',
        password:''
    }
    const [toggle, setToggle] = useState('login')
    const [loginValues, setLogin] = useState(initialLogin)
    const onLoginValueChange = (e) => {
        setLogin({...loginValues, [e.target.name] : e.target.value})
        console.log(loginValues)
    }
    const [newCustomer, setNewCustomer] = useState({
        customerName:'',
        customerEmail:'',
        
    })

    const loginUser = async() => {
        const settings = {
            method: "POST",
            body: JSON.stringify(loginValues),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }
            try {
                const fetchResponse = await fetch(`http://localhost:8000/api/auth/local`, settings);
                const response = await fetchResponse.json();
                
                if(response.msg === 'Account does not exist'){
                    setLogin(initialLogin)
                    return
                }
                sessionStorage.setItem('jwtToken', `Bearer ${response.jwt}`);
                
                setAccount({username : response.user.username, loggedIn:true, id:response.user.id, email:response.user.email });
                setLogin(initialLogin)
                if(response.user.confirmed === true){
                    navigate('/chats')
                }
            } catch (e) {
                
            }
            
        
    }

    return(
        <>
        <div>           {
                            toggle === 'login' ?
                            <>
                            <div className='popup-container' >
                            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                                <h2 style={{ fontFamily: 'AktivGrotesk-Bold',  textAlign:'center' }}>Login</h2>
                                <form style={{height:'100%'}}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <input className="fname"  placeholder="Enter email*" type="text" name="identifier" id='fname' onChange={(e) => {onLoginValueChange(e)}} />
                                    <input className="lname" placeholder="Enter password*" type="email" name="password" id='lname'onChange={(e) => {onLoginValueChange(e)}}/>
                                    
                                </div>
                                
                                <div className='btwr' onClick={() => {loginUser()}} >Login</div>
                                <div className='button-enter' onClick={() => setToggle('signup')}>Make new account</div>
                                </form>
                            </div>
                            </div>
                            </>
                            :
                            <>
                            <div className='popup-container' >
                            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                                <h2 style={{ fontFamily: 'AktivGrotesk-Bold',  textAlign:'center' }}>Signup</h2>
                                <form style={{height:'100%'}}>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <input className="fname"  placeholder="Enter username*" type="text" name="customerName" id='fname'  />
                                    <input className="lname" placeholder="Enter password*" type="email" name="customerEmail" id='lname'/>
                                    <input className="lname" placeholder="Confirm password*" type="email"  name="userConfirmPassword" id='lname'/>
                                </div>
                                
                                <div className='btwr' >Signup</div>
                                <div className='button-enter' onClick={() => setToggle('login')} >Already have account</div>
                                </form>
                            </div>
                            </div>
                            </>
                        }
                        
                        </div>
        </>
    )
}
export default Login