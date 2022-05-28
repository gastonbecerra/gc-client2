import * as Input from '../components/inputs/index';

export const renderRequiredInput = (input) =>{
        let type;        
        let id=input[0]
        console.log(input[1].type);
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
                
            default:
                type= "Text";
                return null;
        }
        const Component = Input[type];
        return <Component id={id} type={type}/>
    
}