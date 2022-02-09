import React from "react"

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
        

    if (message.type === 'error') {
        return (
            <div style={errorStyle}>
                {message.text}
            </div>
        )
    } else {
        return (
            <div style={successStyle}>
                {message.text}
            </div>
        )
    }
}

export default Notification