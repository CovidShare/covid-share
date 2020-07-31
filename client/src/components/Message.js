import React from 'react'

const getStyle = (props) => {
    let baseClass = "alert "; // The space is important
    if(props.message.messageError)
        baseClass = baseClass + "alert-danger"; // If no error
    else
        baseClass = baseClass + "alert-primary"; 
    return baseClass + " text-center"; // The space is important
}

const Message = (props) => {
    return(
        <div className={getStyle(props)} role="alert">
            {props.message.messageBody}
        </div>
    )
}

export default Message;