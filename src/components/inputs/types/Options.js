import React from 'react'

export default function Options({ id, handleValue, value, options }) {
    const handleSelect = (e) => {
        var event = {
            target: {
                name: `${id}`,
                value: e.target.value
            }
        }
        handleValue(event)
    }
    return (
        <>
            <label htmlFor={id}>{id}</label>
            <select id={id} name={id} onChange={(e) => handleSelect(e)}>
                <option disabled>Choose a timeframe</option>
                {options !== false && options.map((o, i) => (
                    <option key={i} value={o} selected={o === value ? true : false}>{o}</option>
                ))}
            </select>
            <br></br>
        </>
    )
}
