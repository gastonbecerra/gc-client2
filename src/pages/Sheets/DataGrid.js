import React, { useState, useEffect } from "react";
import { tidy, summarize, sum, groupBy } from '@tidyjs/tidy';

export default function DataGrid({ values }) {
  const [view, setView] = useState("json");
  const [data, setData] = useState(false); 
  const [summary, setSummary] = useState(false);
  var results;

  useEffect(()=>{
    if(view === 'tabla' ){
      //valores, variabes, time [234, verduras, 11-10-2022]
      var holder = [];
      for(var i = 0; i < values.length; i++){
        var aux = new Date(values[i].timestamp);
        var d = aux.getDate();
        var m = aux.getMonth()+1;
        var aux = [values[i].var, values[i].value, values[i].timestamp, d+'/'+m+'/'+aux.getFullYear() ];
        holder.push(aux)
      }
      setData(holder)
    }

    // if(values){
      results = tidy(
        values,
        groupBy('var', [
          summarize({ total: sum('value') })
        ])
      )
      setSummary(results)

  },[view])

  useEffect(()=>{
    if(data){
      data.forEach(element => {
          var aux = new Date(element[2]);
          var d = aux.getDate();
          var m = aux.getMonth()+1;
          // var aux2 = date.
          console.log(d + '/' + m);
      });
    }
  },[data])
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <span onClick={() => setView("json")}>JSON</span>
        <span onClick={() => setView("tabla")}>TABLA</span>
      </div>
      {view === "json" && <pre>{JSON.stringify(values, null, 2)}</pre>}
      {view === "tabla" && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {view === "tabla" && <pre>{JSON.stringify(summary, null, 2)}</pre>}
    </>
  );
}
