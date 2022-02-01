import React from 'react'

const Field = ({field}) => {
    return (
        <div>
            <h5>{field.title}</h5><p>{field.textField}</p>
        </div>
    )
}

export default Field
