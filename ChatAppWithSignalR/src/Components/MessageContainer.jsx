import React from 'react'

const MessageContainer = ({messages}) => {
    console.log(messages)
  return (
    <>
    {
        messages.map((msg,index)=>{
            return <table striped bordered>
                <tr key={index}>
                    <td>{msg.msg} - {msg.username}</td>
                </tr>
            </table>
        })
    }
    </>
  )
}

export default MessageContainer
