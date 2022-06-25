import React from 'react'

export default function ResearchIndex() {
  let obj = {
    props: {
      tags: {
        style : {
        color: 'green',
        gridArea:'tags',
        border: 'solid 1px black'
      }
    },
    peps: {
      style : {
        color: 'grey',        
        gridArea: 'peps',
        border: 'solid 1px black'
      }
    },
    rips: {
      style : {
        color: 'red',
        border: 'solid 1px black',
        gridArea: 'rips',
      }
    }
  },
  template : {
    style : {
      display: 'grid',
      gridTemplateAreas: 
        `'tags peps peps'
        'rips peps peps'
        'rips peps peps'`
    }
  }
  }

  const Element = () =>{
    return <h4 id="tags">cosovo</h4>
  }
  console.log(obj.template.style)
  return (
    <>
    <div>ResearchIndex</div>

      <div id="container" style={obj.template.style}>
      {Object.entries(obj.props).map((p,q)=>(
        <div id={p[0]} style={p[1]['style']}>{p[0]}</div>
      ))}
      </div>
        <h1 className='tags'>coso</h1>
        <Element/>
    

    </>
  )
}
