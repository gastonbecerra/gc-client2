export const values = [
    { 
        id: 1,
        value: 2234,
        var: "spending_cafe",
        date: "2019-01-01",
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    },
    {
        id: 2,
        value: 234,
        var: "spending_cafe",
        date: "2019-01-02",        
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    },
    {
        id: 3,
        value: 234,
        var: "spending_beer",
        date: "2019-01-03",        
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    },
    {
        id: 4,
        value: 'pending',
        var: "task_homework",
        name: 'trigonometry punto 1',
        date: "2019-01-04",               
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    },
    {
        id: 5,
        value: 'working',
        var: "task_homework",
        name: 'trigonometry punto 1',
        date: "2019-01-05",        
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    },
    {
        id: 6,
        value: 'pending',
        var: "task_homework",
        name: 'trigonometry punto 2',
        date: "2019-01-04",               
        metadata : {
            cuatrimestre: '2022/Q1'
        }
    }
]

export const vars = [
    {
        id: 1,
        name: "spending_cafe",
        concept: "cafe",
        type: "category",
        scale: "ARS",
    },
    {
        id: 2,
        name: "task_homework",
        type: "task",
        concept: "homework",
        scale: 'pending|working|done',
    }
]


export const sheet = [{
    id: 1,
    name: 'tasks y cafes',
    description: 'xxx',
    vars: [ 'spending_cafe' , 'spending_beer', 'task_homework' ],
    share: true,
    tags: '',
    created: '2020-10-10T00:00:00.000Z',
    metadata: ['cuatrimestre'],
} ]  