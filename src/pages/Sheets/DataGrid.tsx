import React, { useState, useEffect } from "react";
import { tidy, summarize, sum, groupBy, filter, mutate, rename, format, map } from "@tidyjs/tidy";
import { summarizeMomentGranularity } from "@tidyjs/tidy-moment"; //npm i @tidyjs/tidy-moment
import { Chart } from "react-google-charts";
import moment from "moment";
import Tabler from "../../components/shareds/Tabler.js";
import { log } from "console";

export const options = {
  allowHtml: true,
  showRowNumber: true,
};

export const formatters = [
  {
    type: "NumberFormat",
    column: 1,
    options: {
      prefix: "$",
      negativeColor: "red",
      negativeParens: true,
    },
  },
];

export const chart_options = {
  orientation: 'horizontal',
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  vAxis: {
    title: "City",
  },
};

export default function DataGrid({ values, vars }) {
  const [filters, setFilters] = useState({
    timeframe: '',
    summarize: '',
    chart: ''
  });
  const [view, setView] = useState("json");
  const [table, setTable] = useState(false);
  const [datachart, setDatachart] = useState(false);
  const [summary, setSummary] = useState(false);
  const [reacttable, setReacttable] = useState(false);
  var results;
  var clone;

  useEffect(()=>{
    lineChartBuilder(values, vars);
    tableBuilder(values);
    builderVarsSchema(vars);
    if(view === 'react-table'){
      
    }
  },[values])

  useEffect(() => {    
    results = tidy(
      values,
      groupBy("var", [summarize({ total: sum("value") })])
    );
    setSummary(results);
  }, [view, values]);


  function checkWeek(date) {    
    var m = moment(date, 'YYYY-MM-DD');
    var date =  m.format('W');
    return date;
  }

  function lineChartBuilder(values, vars){
    if (values) {
      let clone = structuredClone(values);

      clone = tidy(clone, rename({ timestamp: 'date'}));

      // clone = tidy(
      //   clone,
      //   map((row)=>({
      //     ...row,
      //     numWeek: parse(row.date),
      //   }))
      // )

      clone = tidy(
        clone,
        groupBy(['numWeek', 'var'], [
          summarize({ total: sum('value') })
        ])
      )

      
      var dater =[] 
      
      clone.forEach((row)=>{
        if(!Object.keys(dater).includes(row.numWeek)){
          dater.push({date: row.numWeek})      
        }      
      }) 
      
      clone.forEach((row)=>{        
        var index = dater.findIndex((x)=>x.date === row.numWeek)
        dater[index][row.var] = row.total
      })
      
      dater = dater.filter(row => Object.keys(row).length > 2)
      
      var holder = [];
      var schema = builderVarsSchema(vars);
      holder.push(["week", ...Object.keys(schema)]);
      dater.forEach((row)=>{
        holder.push(Object.values(row))
      })
      setDatachart(holder)
    };
  } 

  function tableBuilder(values){    
      var holder = [];
      var aux = ["vars", "values", "time", "delete"];
      holder.push(aux);
      for (var i = 0; i < values.length; i++) {
        var aux = new Date(values[i].timestamp);
        var d = aux.getDate();
        var m = aux.getMonth() + 1;
        var aux = [
          values[i].var,
          values[i].value,
          d + "/" + m + "/" + aux.getFullYear(),
          "delete",
        ];
        holder.push(aux);
      }
      setTable(holder);     
  }

  function builderVarsSchema(vars){
    var holder = {};
    for (var i = 0; i < vars.length; i++) {
      holder[vars[i].name] = ''      
    }
    return holder;
    // console.log(holder);    
  }

  const handleChange = (evt) => {
    setFilters({ ...filters, [evt.target.id]: evt.target.value });        
  }

  useEffect(()=>{
    if(filters.timeframe.length > 1 && filters.summarize.length > 1){
      handleDisplay(values); 
    }
  },[filters])

  function parseTime(date, timeframe) {
    switch(timeframe){
      case 'day':
        return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

      case 'week':
        return moment(date, 'YYYY-MM-DD').format('W');
        
      case 'month':
        return moment(date, 'YYYY-MM-DD').format('MMM');
        
      case 'year':
        return moment(date, 'YYYY-MM-DD').format('YYYY');
        
    }      
      // var m = moment(date, 'YYYY-MM-DD');
      // var date =  m.format('W');
      // return date;
  }

  function handleDisplay(values){
    
    let clone = structuredClone(values);    
    clone = tidy(clone, mutate({ numWeek: (d) => parseTime(d.timestamp, filters.timeframe) }));
    //var clone2 = tidy(clone, groupBy(["numWeek","var"], [summarize({ total: sum("value") })]));


    // console.log(clone2)
    lineChartBuilder(clone, vars);
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <span onClick={() => setView("chart")}>CHART</span>
        <span onClick={() => setView("json")}>JSON</span>
        <span onClick={() => setView("tabla")}>TABLA</span>
        <span onClick={() => setView("react-table")}>R-TABLE</span>
      </div>
      
      {view === "json" && <pre>{JSON.stringify(values, null, 2)}</pre>}
      
      {view === "tabla" && table && (
        <>
        <Chart
          onClick={(e) => {console.log(e)}}
          chartType="Table"
          width="100%"
          height="400px"
          data={table}
          options={options}
          formatters={formatters}
        />
        
        <select id="timeframe" onChange={(e) => handleChange(e)} >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>

        <select id="summarize" onChange={(e) => handleChange(e)} >
          <option value="sum">Sum</option>
          <option value="avg">Average</option>
        </select>

        <select id="chart" onChange={(e) => handleChange(e)} >
          <option value="Line">Lines</option>
          <option value="bar">Bars</option>
        </select>        

        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={datachart}
          options={chart_options}
        />

        </>
      )}
      {view === "chart" && datachart && 
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={datachart}
          options={chart_options}
        />
      }

      {view === "chart" && <pre>{JSON.stringify(summary, null, 2)}</pre>}

      {view === "react-table" && <Tabler values={values} vars={vars}/>}
    </>
  );
}
