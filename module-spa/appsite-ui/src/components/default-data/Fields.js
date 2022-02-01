import React from 'react'
import Field from './Field'

const Fields = ({fields}) => {
    return (
        <>
            {fields.map((field, index) => <Field key={index} field={field}/>)}
        </>
    )
}

export default Fields
