import * as Input from '../components/inputs/index';

export const renderRequiredInput = (input, handleValue, key, mode) =>{
        let type;        
        let id=input[0]
        let value;
        if(!mode){
            value = input[1].value;
            console.log('req ' , value);
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
                
            default:
                type= "Text";
                return null;
        }
        const Component = Input[type];
        if(mode){
            return <Component id={id} handleValue={handleValue} key={key} />
        }else{
            return <Component id={id} handleValue={handleValue} key={key} value={value}/>
        }
    
}