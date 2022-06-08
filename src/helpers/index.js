import * as Input from '../components/inputs/index';
import { Text, Password, Dates, Number, Boolean, Array, Textarea, Options  } from '../components/inputs/index';
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

export const renderForm = (schema, handleValue, handleSubmit) => {
    return (
        <form onSubmit={handleSubmit}>
            {
                Object.entries(schema).map((input, key)=>(                    
                      input[1].type === 'text' ? <Input.Text key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'password' ? <Input.Password key={key} id={input[0]} value={input[1].value} required={input[1].required} handleValue={handleValue}/> 
                    : input[1].type === 'options' ? <Input.Options key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'boolean' ? <Input.Boolean key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'array' ? <Input.Array key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'textarea' ? <Input.Textarea key={key} input={input} handleValue={handleValue}/> 
                    : input[1].type === 'date' ? <Input.Dates key={key} input={input} handleValue={handleValue}/> : null
                ))
            }
            <input type="submit" value="Submit"/>
        </form>
    )
}

// export  const handleValue = (evt) => { // it goes as formbuilder paramater so it handles inputs changes to local state
//     var value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value
//     });
//   };