import * as Input from '../components/inputs/index';

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