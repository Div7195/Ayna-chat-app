
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import socket from "socket.io-client";
import { useParams } from 'react-router-dom';
import { getAccessToken } from './utils/util.js';

const Chat = () => {
    const {chatId} = useParams()
    const queryInitial = {
        body:'',
        senderRole:'user',
        chat:chatId
    }
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [query, setQuery] = useState(queryInitial)
    // const io = socket.connect("http://localhost:8000");
    


    useEffect(() => {
        const func = async () => {
            const url = `http://localhost:8000/api/chats/${chatId}?populate=*`;
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
                    let arr = [];
                    setLoading(false)
                    response.data.attributes.messages.data.map((one, i) => {
                        arr = [one.attributes, ...arr ];
                        setMessages((msgs) => arr);
                    });
                    } catch (e) {
                    console.log(e);
                    }
        }
        func()
        // io.emit('joinroom', chatId);
        
        
      }, []);
    //   io.on("message",  (data, error) => {
    //     console.log(data)
    //     const func = async () => {
    //         const url = `http://localhost:8000/api/chats/${chatId}?populate=*`;
    //         const settings = {
    //             method: 'GET',
    //             headers: {
    //                 accept: 'application/json',
    //                 authorization : getAccessToken()
    //             }
    //             };
    //             try {
    //                 const fetchResponse = await fetch(url, settings);
    //                 const response = await fetchResponse.json();
    //                 let arr = [];
    //                 response.data.attributes.messages.data.map((one, i) => {
    //                     arr = [one.attributes, ...arr];
    //                     setMessages((msgs) => arr);
    //                 });
    //                 } catch (e) {
    //                 console.log(e);
    //                 }
    //     }
    //     func()
    //     setQuery(queryInitial)
    // });
      const sendMessage = (query) => {
        if (query) {
            console.log(query)
            // io.emit('sendMessage', {
            //     query
            // })
          setQuery(queryInitial);
        
        } else {
          alert("Message can't be empty");
        }
      };


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
            
            
            <div className='chat-parent-box'>
                <div className='chat-sub-box'>
                    {
                        loading === true ?
                        <div className='loader'></div>
                        :
                        <div className='chats-box'>

                        {
                            messages.length > 0 ?
                            messages.map(e => (
                                <>
                                {
                                    e.senderRole === 'server'?
                                    <>
                                        <div className='received'>
                                            {e.body}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='sent'>
                                            {e.body}
                                        </div>
                                    </>
                                }
                                </>
                            ))
                            :
                            <></>
                        }
                    </div>
                    }
                    

                    <div className='bottom-box'>
                            <div style={{
                                width:'92%',
                                height:'100%'
                            }}>
                                <input type='text' className='chat-type-box'
                                placeholder='Enter message here..' onChange={(e) => {
                                    setQuery({...query, body:e.target.value}); 
                                    }}/>
                            </div>

                            <div className='send-btn' onClick={() => {
                               
                                sendMessage(query)
                               
                                
                            }}
                                >
                                <SendIcon style={{
                                    color:'white'
                                }}/>
                            </div>

                        </div>

                </div>
                </div>
            </div>
        </>
    )
}
export default Chat