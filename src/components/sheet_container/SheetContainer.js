import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { values, vars, sheet } from '../../store/data.js'
import { Chart } from "react-google-charts";
import { tidy, summarize, sum, groupBy, filter, mutate, mean, rename, count, format, median, map, distinct, variance, summarizeIf, min, max } from "@tidyjs/tidy";
import moment from "moment";


export default function SheetContainer() {
let { id } = useParams();

const [table, setTable] = useState(false);

const [state, setState] = useState({
    data: values,    
    sheet: sheet[0],
    vars: vars
}) 

function tableBuilder(values) {
    var holder = [];
    var aux = ["name", "var", "values", "time"];
    holder.push(aux);
    for (var i = 0; i < values.length; i++) {
      var date = new Date(values[i].date);
      var aux = [
        values[i].name ? values[i].name : "No name",
        values[i].var,
        values[i].value,
        date        
      ];
      holder.push(aux);
    }
    setTable(holder);
    console.log(holder)
  }

  const lastAccum = (values) => {
    let results;
        
    // cortar la tabla en 2 (filter x name)
    // ---> donde hay un name, hay que agrupar por name (las tareas)
    // ---> donde hay un name, hay que mostrar el ultimo
    // ---> donde no hay name, hay que agrupar category/concept (var)
    // ---> donde no hay name, hay que mostrar la cantidad de registros
    // juntamos las 2 tablas (pegamos rows)
        
  }

    useEffect(()=>{
        tableBuilder(values)
        console.log(state)
    },[])
  return (
    <div>        
        <div>
            <h4>{id}</h4>
        </div>

        <div>
            <h4>Sheet info</h4>
        </div>
        <div>
            <h4>Grid</h4>
            <p>Vista histórica</p>
            {
            table && 
            <Chart //TO DO: add week + var per row
                onClick={(e) => { console.log(e) }}
                chartType="Table"
                width="100%"
                data={table}                
            />
            }
            <p>Last + Accum</p>
        </div>
        <div>
            <h4>Analytics</h4>
        </div>
    </div>
  )
}



/*


*/