import * as Input from '../components/inputs/index';
import BaseInfoCard from '../components/inputs/info-types/BaseInfoCard';

export const renderForm = (schema, handleValue, handleSubmit) => {
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            {
                Object.entries(schema).map((input, key)=>( // devuelve el par [llave : valor] de cada entrada de un pbjeto en forma de array [0 => llave : 1 => valor]                    
                      input[1].type === 'text' ? <Input.Text key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'password' ? <Input.Password key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'email' ? <Input.Email key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'options' ? <Input.Options key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'boolean' ? <Input.Boolean key={key} input={input} handleValue={handleValue}/>                     
                    : input[1].type === 'textarea' ? <Input.Textarea key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'info' ? <Input.Info key={key} input={input}/> 
                    : input[1].type === 'tags' ? <Input.Tags key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'selectType' ? <Input.SelectType key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'date' ? <Input.Dates key={key} input={input} handleValue={handleValue}/> : null
                ))
            }
            <input type="submit" value="Submit"/>
        </form>
    )
}

export const renderInfo = (schema) => {
    return(
        <div
            style={{
                display:'flex',
                flexWrap:'wrap',
                flexDirection: 'row',                
                fontStyle: 'normal',                                                
            }}
        >
            {Object.entries(schema).map((item,i)=>(
                <BaseInfoCard key={i} item={item}/>
            ))}
        </div>
    )   
}

export const renderRequiredInput = (input, handleValue, key, mode) =>{
    let type;        
    let id=input[0]
    var value;
    if(!mode){
        value = input[1].value;
    }
    let options = false;
    if(input[1].type === 'options'){
        options = input[1].options;
    }
    try{
        if(input[1].required){
            var required = input[1].required;
        }else{
            var required = false;
        }
    }catch(e){

    }
    switch (input[1].type) {
        case 'text':
            type= "Text";
            break;

        case 'date':
            type= "Dates";
            break;
    
        case 'number':
            type= "Number";
            break;
        
        case 'boolean':
            type= "Boolean";
            break;

        case 'array':
            type= "Array";
            break;
        
        case 'textarea':
            type= "Textarea";
            break;

        case 'options':
            type= "Options";
            break;

        case 'password':
            type= "Password";
            break;
            
        default:
            type= "Text";
            return null;
    }
    const Component = Input[type];
    if(mode && options){
        return <Component id={id} handleValue={handleValue} key={key} options={options} required={required}/>
    }else{
        return <Component id={id} handleValue={handleValue} key={key} value={value} options={options} required={required}/>
    }

}

