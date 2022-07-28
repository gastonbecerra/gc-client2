import React,{ useState, useEffect } from 'react'
import { useReactTable } from '@tanstack/react-table'
import { useDispatch, useSelector } from 'react-redux'
import { valuesMiddlewware } from '../../store/slices/values'

export default function Tabler({values, vars}) {
    const [headers, setHeaders] = useState(['var', 'value', 'date', 'comment', 'delete']);
    const dispatch = useDispatch();
    useEffect(()=>{

    },[values])

    const handleInput = (evt) => {
        evt.preventDefault();                
        if(evt.target.type === 'number' ){
            var data = {             
                value: evt.target.value                       
            }
        }
        if(evt.target.type === 'date' ){
            var data = {
                timestamp: evt.target.value
            }
        }        
        if(evt.target.type === 'text' ){
            var data = {
                comment: evt.target.value
            }
        }      
        if(evt.target.type === 'button' ){                        
            var id = evt.target.id            
            console.log(id);
            dispatch(valuesMiddlewware( 'delete', id));
        }        
        
        evt.target.type !== 'button' && dispatch(valuesMiddlewware('put', data, evt.target.id, (res)=>{
            // console.log(res);
        }))
    }

    const tableBuilder = (values) => {
        return (
            <>
            <style jsx>{`
            th, td {
  border-bottom: 1px solid #ddd;
}
     `}</style>
            <table>
            <tbody>

                <tr>
                    {/* {['var', 'value', 'date', 'comment', 'delete'].map((header, index) => {
                        <th key={index}>{header}</th>
                    })} */}
                    <th>var</th>
                    <th>value</th>
                    <th>date</th>
                    <th>comment</th>
                    <th>delete</th>
                </tr>
                {values.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{value.var}</td>
                            <td><input type="number" defaultValue={value.value} id={value._id} onBlur={(e)=> handleInput(e)} /></td>
                            <td><input 
                                type="date" 
                                id={value._id}                                
                                defaultValue={value.timestamp.substring(0,10)} 
                                onBlur={(e)=> handleInput(e)}/>
                            </td>
                            <td><input 
                                type="text" 
                                id={value._id}                                
                                defaultValue={value.comment} 
                                onBlur={(e)=> handleInput(e)}/>
                            </td>
                            <td><input 
                                type="button" 
                                id={value._id}                                
                                value={"X"} 
                                onClick={(e)=> handleInput(e)}/>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            </>
        )
    }
    
  return (
    <>
        {tableBuilder(values)}
    </>
  )
}
