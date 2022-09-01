import React, { useState, useEffect } from "react";
import { tidy, summarize, sum, groupBy, filter, mutate, mean, rename, count, format, median, map, distinct, variance, summarizeIf, min, max } from "@tidyjs/tidy";
import { summarizeMomentGranularity } from "@tidyjs/tidy-moment"; //npm i @tidyjs/tidy-moment
import { Chart } from "react-google-charts";
import moment from "moment";
import Tabler from "../../components/shareds/Tabler.js";
import { log } from "console";
import ReactWordcloud from 'react-wordcloud';

export const options = {
  allowHtml: true,
  showRowNumber: true,
};

export const formatters = [
  {
    type: "NumberFormat",
    column: 2,
    options: {
      prefix: "$",
      negativeColor: "red",
      negativeParens: true,
    },
  },
];

export const chart_options = {
  orientation: 'horizontal',
  title: "Sheet",
  chartArea: { width: "50%" },
  hAxis: {
    title: "",
    minValue: 0,
  },
  vAxis: {
    title: "values",
  },
};

export default function DataGrid({ values, vars }) {
  const [filters, setFilters] = useState({
    timeframe: 'week',
    summarize: 'Sum',
    chart: 'Line'
  });
  const [chart, setChart] = useState("Line");
  const [view, setView] = useState("tabla");
  const [table, setTable] = useState(false);
  const [datachart, setDatachart] = useState(false);
  const [stats, setStats] = useState(false);


  useEffect(() => {
    lineChartBuilder(values, vars);
    tableBuilder(values);
    builderVarsSchema(vars);
    handleStats(values);
    buildWordCloud(values);
    // analytics(values);
  }, [values])

  useEffect(() => {
    // if (filters.timeframe.length > 1 && filters.summarize.length > 1) {
    if (values) {
      handleDisplay(values);
    }
  }, [filters])

  const handleStats = (values) => {
    if (values.length > 0) {
      //first row: table headers
      let first_row = ['name', 'count', 'sum', 'avg', 'min', 'max', 'variance']

      //first index of each row: precised vars
      let vars = values.map(item => item.var);
      let single_vars = [...new Set(vars)];

      //geting count values for each var
      var vars_count = vars.reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

      //geting stats values for each var
      let stats_vars = tidy(
        values,
        groupBy("var",
          summarize({
            median: median("value"),
            min: min("value"),
            max: max("value"),
            variance: variance("value"),
            sum: sum("value"),
          }
          ))
      )

      //mixing count and values into rows
      let rows = [first_row];
      single_vars.forEach(item => {
        const index_stats = stats_vars.findIndex(obj => obj.var === item);
        let row = [item, vars_count[item], stats_vars[index_stats].sum, stats_vars[index_stats].median, stats_vars[index_stats].min, stats_vars[index_stats].max, stats_vars[index_stats].variance];
        rows.push(row);
      });

      setStats(rows);
    }
  }

  function lineChartBuilder(values, vars) {
    if (values) {
      let clone = structuredClone(values);

      clone = tidy(clone, rename({ timestamp: 'date' }));

      clone = tidy(
        clone,
        groupBy(['numWeek', 'var'], [
          summarize({ total: sum('value') })
        ])
      )

      var dater = []

      clone.forEach((row) => {
        if (!Object.keys(dater).includes(row.numWeek)) {
          dater.push({ date: row.numWeek })
        }
      })

      clone.forEach((row) => {
        var index = dater.findIndex((x) => x.date === row.numWeek)
        dater[index][row.var] = row.total
      })

      dater = dater.filter(row => Object.keys(row).length > 2)

      var holder = [];
      var schema = builderVarsSchema(vars);
      holder.push(["week", ...Object.keys(schema)]);
      dater.forEach((row) => {
        holder.push(Object.values(row))
      })
      setDatachart(holder)
    };
  }

  function tableBuilder(values) {
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

  function builderVarsSchema(vars) {
    var holder = {};
    for (var i = 0; i < vars.length; i++) {
      holder[vars[i].name] = ''
    }
    return holder;   
  }

  const handleChange = (evt) => {
    setFilters({ ...filters, [evt.target.id]: evt.target.value });
    evt.target.id === 'chart' && setChart(evt.target.value);
  }

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

    }
  }

  function handleDisplay(values) {
    let clone = structuredClone(values);
    clone = tidy(clone, mutate({ numWeek: (d) => parseTime(d.timestamp, filters.timeframe) }));
    lineChartBuilder(clone, vars);
  }

  const buildWordCloud = (values) => {
    let comments = values.map(item => item.comment);
    let single_comments = [...new Set(comments)];

    var comments_count = comments.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    let comment_array = Object.entries(comments_count);

    
    var words = tidy(comment_array, map((d) => (
      { text: d[0], value:d[1] }      
      )));
      
      
      return (
        <div style={{height:200, width:300}}>
          <ReactWordcloud words={words} />
        </div>
      )

  }

  
  function analytics(values) {
    var schema = builderVarsSchema(vars);
    console.log(Object.keys(schema))    
  }

  
  let analysis_directory = [
    'savings' , 
    'spendings_distribution'
  ];





  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span onClick={() => setView("chart")}>CHART</span>
        <span onClick={() => setView("json")}>JSON</span>
        <span onClick={() => setView("tabla")}>TABLA</span>
        <span onClick={() => setView("react-table")}>R-TABLE</span>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
          <option value="BarChart">BarChart</option>
          <option value="Histogram">Histogram</option>
          <option value="AreaChart">AreaChart</option>
        </select>
      </div>



      {view === "json" && <pre>{JSON.stringify(values, null, 2)}</pre>}

      {view === "tabla" && stats && (
        <>
          <div style={{ margin: "20px" }}> </div>
          <Chart //TO DO: add week + var per row
            onClick={(e) => { console.log(e) }}
            chartType="Table"
            width="100%"
            data={datachart}
            options={options}
            formatters={formatters}
          />

          <div style={{ margin: "20px" }}> </div>



          {/* <div style={{ margin: "20px" }}> </div>

          <Chart
            chartType={chart}
            width="100%"
            data={datachart}
            options={chart_options}
            chartPackages={["corechart", "controls", "charteditor"]}
          />

          {buildWordCloud(values)} */}

          {/* {analysis_directory.map(analysis => (
            <p>
              {analytics2(analysis)}
            </p>
          ))} */}


        </>
      )}
      {view === "chart" && datachart &&
        <Chart
          chartType={chart}
          width="100%"
          height="400px"
          data={datachart}
          options={chart_options}
        />
      }
      {view === "react-table" && <Tabler values={values} vars={vars} />}



    </>
  );
}


/*
DATA ANALYTICS LAYER
PARAMS: SHEET, VARS, VALUES
RETURNS: ANALYTICS BASED ON VARS AND VALUES

SAVINGS:
  - ahorro = ingresos - egresos


*/