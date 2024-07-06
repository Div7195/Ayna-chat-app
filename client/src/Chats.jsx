
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import socket from "socket.io-client";
import { useParams } from 'react-router-dom';
import { getAccessToken } from './utils/util.js';
import { DataContext } from './context/DataProvider.jsx';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useContext } from 'react';
const Chats = () => {
    const [loading, setLoading] = useState(true)
    const {account}=useContext(DataContext);
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate()
    const [chats, setChats] = useState([])
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const openAddForm = () => {
        setIsPopupVisible(true)
    }   
    const closeAddForm = (e) => {
        if (e.target.className.includes('popup-container')) {
          setIsPopupVisible(false);
        }
      };

    const chatInitial = {
        chatTitle:'',
        users_permissions_user:parseInt(account.id)
    }
    const [newChat, setNewChat] = useState(chatInitial)
    useEffect(() => {
        const func = async () => {
            const url = `http://localhost:8000/api/users/me?populate=*`;
            const settings = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization : getAccessToken()
                }
                };
                try {
                    const fetchResponse = await fetch(url, settings);
                    const response = await fetchResponse.json();
                    setLoading(false)
                    setChats(response.chats)
                    } catch (e) {
                    console.log(e);
                    }
        }
        func()
    }, [])

    const createNewChat = async() => {
        const settings = {
            method: "POST",
            body: JSON.stringify({data:newChat}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }
            try {
                const fetchResponse = await fetch(`http://localhost:8000/api/chats`, settings);
                const response = await fetchResponse.json();
                if(response.status == 200){
                    let newTemp = {
                        id:response.data,
                        chatTitle:response.data.attributes.chatTitle
                    }
                    
                    setChats([newTemp, ...chats])
                    setIsPopupVisible(false)
                }
            } catch (e) {
                
            }
            
        
    }
    


    return(
        <>
        <div style={{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
            }}>
            <div className='header'>
                <div className='title'>
                Ayna's Assignment
                </div>
               
            </div>
            <div className='choose-button' onClick={() => {openAddForm()}}>
                                        <AddCircleIcon style={{
                                        fontSize:"40px",
                                        
                                    }}
                                    />  Add a chat
            </div>
            <div onClick={(e) => {closeAddForm(e)}}>
                        <div className={`popup-container-second ${isPopupVisible ? 'show' : ''}`} >
                            <div className="form-container" onClick={(e) => e.stopPropagation()}>
                                <h2 style={{ fontFamily: 'AktivGrotesk-Bold',  textAlign:'center' }}>Add a new chat</h2>
                                <form >
                                
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <input className="fname"  placeholder="Enter name*" type="text" name="chatTitle" id='fname' onChange={(e) => {setNewChat({...newChat, chatTitle:e.target.value}); console.log(newChat)}} />
                                    
                                </div>
                                
                                <div className='btwr' onClick={createNewChat}>Add a new chat</div>
                                </form>
                            </div>
                            </div>
                        </div>
                        {
                            loading === true?
                            <div className='loader'></div>
                            :
                            <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', }}>
                {
                    chats && chats.length > 0 ?
                    chats.map(e =>(
                        <>
                    <div style={{display:'flex', flexDirection:'column', cursor:'pointer', justifyContent:'center', border:'2px solid green', width:'40%', borderRadius:'5px', marginTop:'2%', padding:'5px'}} onClick={() => navigate(`/chat/${e.id}`)}>
                        <div style={{display:'flex'}}>
                            <div style={{fontSize:'1.25rem', color:'white', color:'#e9c5ff'}}>
                                    Chat Room ID
                            </div>
                            <div style={{fontSize:'1.25rem', fontWeight:'800', color:'white', marginLeft:'auto', marginRight:'3%'}}>
                                {e.id}
                            </div>
                        </div>
                        

                        <div style={{display:'flex'}}>
                            <div style={{fontSize:'1.25rem', color:'white', color:'#e9c5ff'}}>
                                    Chat Title
                            </div>
                            <div style={{fontSize:'1.25rem', fontWeight:'700', color:'yellow', marginLeft:'auto', marginRight:'3%'}}>
                                {e.chatTitle}
                            </div>
                        </div>
                    </div>
                    </>
                    ))
                    

                    :
                    
                    <></>
                }
            </div> 
                        }
             
            </div>
        </>
    )
}
export default Chats