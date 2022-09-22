import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { values, vars, sheet, sheet_user_interaction } from '../../store/data.js'
import { Chart } from "react-google-charts";
import { tidy, summarize, select, sum, tally, groupBy, filter, format,mutate, mean, rename, count, median, map, distinct, variance, summarizeIf, min, max, leftJoin,sliceMax } from "@tidyjs/tidy";
import moment from "moment";
import BasicStats from '../../pages/Sheets/analysis/BasicStats.js';

export default function SheetContainer() {
let { id } = useParams();

function get_interest(name){
  const handleOption = (e) => {
    var option = e.target.id;
    var [opt, analysis] = option.split("-");
    
    var aux_sheet = state.sheet_user_interaction;
    
    aux_sheet.analysis = [      
      ...aux_sheet.analysis,
      {[name] : opt}
    ]
    
    alert(JSON.stringify(aux_sheet))
    setState({
      ...state,
      sheet_user_interaction: aux_sheet
    })
  }
  return(
    <>
      <label>Dow your want to view this {name} analysis?</label>
      <button id={`yes-${name}`} onClick={(e)=>(handleOption(e))}>Yes</button>
      <button id={`no-${name}`} onClick={(e)=>(handleOption(e))}>No</button>
    </>
  )
}

const [filters, setFilters] = useState({
  timeframe: 'week',
  summarize: 'Sum',
  chart: 'Line'
});

const [table, setTable] = useState({
  historical: false,
  aggregated: false,
  timeframe: false,
  view: false
});

const [state, setState] = useState({
    data: values,    
    sheet: sheet[0],
    vars: vars,
    sheet_user_interaction: sheet_user_interaction[0]
}) 

function parseTime(date, timeframe) {
  switch (timeframe) {
    case 'day':
      return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

    case 'week':
      return moment(date, 'YYYY-MM-DD').format('W');

    case 'month':
      return moment(date, 'YYYY-MM-DD').format('MMM');

    case 'year':
      return moment(date, 'YYYY-MM-DD').format('YYYY');

    default:
      return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

  }
}

function timeframeParser(values) {
  let clone = structuredClone(values);
  clone = tidy(clone, mutate({ numWeek: (d) => parseTime(d.date, filters.timeframe) }));
  return clone;
}

function timeTable(){
  var data = timeframeParser(values);

  let vars_values = data.map((value)=>{
    var type = vars.find((v)=>v.name === value.var)
    let cat = type?.type;
      return {
          ...value,
          type: cat
      }
  })

  
  //split values by type
  let spendings = vars_values.filter((v)=>v.type === "spending")
  let tasks = vars_values.filter((v)=>v.type === "task")

  
  let stats_vars = tidy(
    spendings,
    groupBy(["numWeek", "var"],
      summarize({
        value: sum("value"),
      }),
      ),
    mutate({ name: '' })
  )

  let stats_tasks = tidy(
    tasks,
    groupBy(["numWeek", "name"],
      tally()
      ),
      rename({n: 'value'}),
  )

  //concat into one array 
  let stats = stats_vars.concat(stats_tasks)
  var holder = [];
  var aux = ["name", "var", "value"];
  holder.push(aux);
  for (var i = 0; i < stats.length; i++) {    
    var aux = [
      stats[i].name ? stats[i].name : "No name",
      stats[i].var,
      stats[i].value,          
    ];
    holder.push(aux);
  }
  console.log(holder);
  
  setTable({ 
    ...table,
    timeframe: holder 
  });

}

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
    console.log(holder);
    
    setTable({ 
      ...table,
      historical: holder 
    });

  }

  const lastAccum = (values) => {
    let vars_values;
    
    vars_values = values.map((value)=>{
      var type = vars.find((v)=>v.name === value.var)
      let cat = type?.type;
        return {
            ...value,
            type: cat
        }
    })

    //split values by type
    let spendings = vars_values.filter((v)=>v.type === "spending")
    let tasks = vars_values.filter((v)=>v.type === "task")

    let stats_vars = tidy(
      spendings,
      groupBy("var",
        summarize({
          value: sum("value"),
        }),
        ),
      mutate({ name: '' })
    )
    
    //get last values from each task
    let last_tasks = tidy(
      tasks,
      groupBy("name",
        sliceMax(1, "date"),
      ),
      select(["name", "value", "var","metadata"])
    )

    //concat into one array last_tasks and stats_vars
    let last_values = last_tasks.concat(stats_vars)
      
    var holder = [];
    var aux = ["name", "var", "value"];
    holder.push(aux);
    for (var i = 0; i < last_values.length; i++) {      
      var aux = [
        last_values[i].name ? values[i].name : "No name",
        last_values[i].var,
        last_values[i].value,         
      ];
      holder.push(aux);
    }
    setTable({ 
      ...table,
      aggregated: holder 
    });    
  }

    useEffect(()=>{
      lastAccum(values)
      timeTable(values)
      tableBuilder(values)
    },[values])

    useEffect(()=>{
      console.log(table);
    },[table.view])

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
            <span onClick={()=>setTable({...table, view: 'historical'})}>Vista histórica</span> | <span onClick={()=>setTable({...table, view: 'timeframe'})}>Vista Timeframe</span> | <span onClick={()=>setTable({...table, view: 'aggregated'})}>Tabla agregada</span>
            
            {table.view !== '' && 
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="Table"                
                data={table[table.view]}
              />
            }
             
        </div>
        <div>
            <h4>Analytics</h4>
            <BasicStats vars={vars} values={values} wrapper={get_interest}/>
        </div>
    </div>
  )
}



/*


*/