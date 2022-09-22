import React from 'react';
import { tidy, summarize, sum, groupBy, filter, mutate, mean, rename, count, format, median, map, distinct, variance, summarizeIf, min, max, sliceMax, select, tally } from "@tidyjs/tidy";
import axios from 'axios';

function savings(vars, values) {    // variable agregada incomes - expenses
        
  // ahorro = ingresos - egresos
      var savings = 0;
      var incomes = 0;
      var spendings = 0;
      // agarrar las variables
      try{
      incomes = tidy(values, 
          filter((d) => d.var.includes('income')),
          summarize({total: sum('value')})
          ) 
          spendings = tidy(values, 
          filter((d) => d.var.includes('spending')),
          summarize({total: sum('value')})
          )

      savings = incomes[0].total - spendings[0].total;
      }catch(e){
      console.log(e)
      }  
      return(
      <>
          { savings && 
          <>
          <div style={{border:'solid black 1px'}}>
              <p>Do you want to track this: YES | NO</p>

              VARIABLE NAME <b>MONTHLY Savings:</b> <br/>
              VARIABLE DESCRIPTION description savings <br/>
              VARIABLE SCALA Y TIMEFRAME <br/>
              <span>Savings: {' ' + savings}</span>


              <h4>How do you feel about this value?</h4>
              <input type="range" min="0" max="5" defaultValue={0}/>

          </div>
          </>
          }
      </>
      )     
}

function incomeDistribution (vars, values) {
  if (vars) {
    // distribucion de incomes
    var incomes_vars = vars.filter((v) => v.category === 'incomes');
    if (incomes_vars.length > 1) {  // condicion
              
      const income_distribution_data = tidy(
          values,
          filter((d) => incomes_vars.map((i) => i.name).includes( d.var) ), 

          groupBy(['var'], [
            summarize({ total: sum('value') })
          ])
      )
      const income_distribution_total = tidy(
          values,
          filter((d) => incomes_vars.map((i) => i.name).includes( d.var) ), 
          summarize({ total: sum('value') }
      )
      )
      const income_distribution_total2 = income_distribution_total[0].total;

      return (
        <>
          {incomes_vars &&
            <>
              <div style={{ border: 'solid black 1px' }}>
                <p>Do you want to track this: YES | NO</p>

                <h3>Income distribution</h3> { /* titulo */}

                <div style={{ fontSize: '9px' , border: 'solid gray 1px' }}>
                  <p>Description</p> { /* descripcion */}
                  <p>Condicion</p> { /* condicion */}
                  {JSON.stringify(income_distribution_data)}
                </div>
                
                  total de incomes: {income_distribution_total2} <br/>
                  en cada categoria: {JSON.stringify(income_distribution_data)} <br/>

                <h4>How do you feel about this value?</h4>
                <input type="range" min="0" max="5" defaultValue={0} />

              </div>
            </>
          }
        </>
      )
    }
  }
}

function spending_distribution(vars, values, wrapper){
     var spending_vars = vars.filter((v) => v.type === 'spending');
      if (spending_vars.length > 1) {  // condicion
        const spending_distribution_data = tidy(
          values,          
          filter((d) => spending_vars.map((i) => i.name).includes( d.var) ),
          groupBy(['var'], [
            summarize({ total: sum('value') })
          ])
        )
        
        return(
          <>
          <h6>Spending distribution</h6>
          {wrapper('spending_distribution')}
          <pre>{JSON.stringify(spending_distribution_data)}</pre>
          </>
        )
  }
}

function task_stages_distribution(vars, values, wrapper) {
  var tasks = vars.filter((v) => v.type === 'task');

  let last_tasks = tidy(
    values,
    filter((d) => tasks.map((i) => i.name).includes(d.var)),
    groupBy("name",
      sliceMax(1, "date"),
    ),
    select(["name", "value", "var", "metadata"]),
    groupBy("value", 
      tally()
    ),
  )  
  const name = "last_tasks"
  const data = last_tasks;

  return(
    <>
          <h6>task estados</h6>
          {wrapper('task_stages_distribution')}
          <pre>{JSON.stringify(data)}</pre>

    </>
  )
}

function spending_verduras_en_contexto(vars, values, wrapper) {    // variable agregada incomes - expenses    

  var contexto = '6302f74a8080c5c186c86779';
  var variable = '62c61de6e8ac1f4eaad2aff8';
  if (vars) {    
    var veggie_spendings = vars.filter((v) => v.name === 'daily spendings on veggies (currency (ARS))');    
    
    // si esta la variable spendings_verduras
    // tenemos 1 variable (spendings en verduras)
    if (veggie_spendings.length > 0) {  // la variable esta en la planilla --> analytica es relevante
      
      // tenemos los valores del usuario para esa variable
      const veggie_spendings_data = tidy(
          values,
          filter((d) => veggie_spendings.map((i) => i.name).includes( d.var) ),
          summarize({ total: sum('value')})      
          )
          if (veggie_spendings_data[0].total > 0) {  // el usuario tiene valores para esa variable --> analytica es relevante
            
            
            // tenemos 1 contexto (los que comen verdura)
            // tenemos que buscar una sample

            // localhost:8080/api-v2/sample/62eec3d1471497244912ca37/62c61f7609d93db56127fde7
            axios({
              method: 'get',
              url: 'http://localhost:8080/api-v2/sample/' + contexto + '/' + variable,
            })
            .then(function (response) {
              // handle success
              // console.log('papirulo ', response);
              document.getElementById('apidata').innerHTML = JSON.stringify(response.data.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              // always executed
            });
      }
    
      return (
        <>
          {veggie_spendings_data &&
            <>
              <div style={{ border: 'solid black 1px' }}>
                <p>Do you want to track this: YES | NO</p>

                <h3>SPENDING VS. CONTEXTO</h3> { /* titulo */}

                <div style={{ fontSize: '9px' , border: 'solid gray 1px' }}>
                  <p>Description</p> { /* descripcion */}
                  <p>Condicion</p> { /* condicion */}
                  {JSON.stringify(veggie_spendings_data)}
                </div>
                
                  sum: {veggie_spendings_data[0].total} <br/>

                  {/* max: {JSON.stringify(veggie_spendings_data.max)} <br/>
                  min: {JSON.stringify(veggie_spendings_data.min)} <br/> */}
                  <div id="apidata"></div>

                <h4>How do you feel about this value?</h4>
                <input type="range" min="0" max="5" defaultValue={0} />

              </div>
            </>
          }
        </>
      )

    
        }
  }

}

export default function BasicStats({ values, vars, wrapper }) {

  const [apidata, setApidata] = React.useState(false);
  const [analysis, setAnalysis] = React.useState({})

  React.useEffect(() => {
    // handleAnalysis()
  }, [vars])

  

  return (
    <>
      <div>BasicStats</div>
      <>{spending_distribution(vars, values, wrapper)}</>
      <>{task_stages_distribution(vars, values, wrapper)}</>      
      
      {/* <>{incomeDistribution(vars, values)}</> */}
      {/* <>{savings(vars, values)}</> */}
      {/* <>{spending_verduras_en_contexto(vars, values)}</> */}

    </>
  )
}


/*

switch ([vars]) {
  case [values]:

*/

