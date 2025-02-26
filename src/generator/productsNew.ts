export const productsNew = [
    {
        id: 'iPhone',
        name: 'iPhone',
        brand: 'Apple',
        inStock: true,
        category: 'tech',
        prices:[{amount:888,currency: {label:"USD"}}],
        attributes:
            [{
                id: 'Color',
                type: 'swatch',
                items: [
                    {id: "Color", value: '#44FF03', displayValue: 'Green'},
                    {id: "Color", value: '#03FFF7', displayValue: 'Cyan'},
                    {id: "Color", value: '#030BFF', displayValue: 'Blue'},
                    {id: "Color", value: '#000000', displayValue: 'Black'},
                    {id: "Color", value: '#ff0000', displayValue: 'Red'},
                ]
            },
            {
                id: "Capacity",
                type: 'text',
                items: [
                    {id: "Capacity", value: '256GB', displayValue: '256GB'},
                    {id: "Capacity", value: '1TB', displayValue: '1TB'},
                ]
            },
            {
                id: 'Operational system',
                type: 'text',
                items: [
                    {id: "Operational system", value: 'iOS12', displayValue: 'iOS 12'},
                    {id: "Operational system", value: 'iOS16', displayValue: 'iOS 16'}
                ]
            }
            ]
        },
    {
        id:'Samsung',
        name:'Samsung',
        brand:'Samsung',
        inStock: true,
        category: 'tech',
        prices:[{amount:555,currency: {label:"USD"}}],
        attributes:
            [{
                id: 'Color',
                type: 'swatch',
                items: [
                    {id: "Color", value: '#44FF03', displayValue: 'Green'},
                    {id: "Color", value: '#03FFF7', displayValue: 'Cyan'},
                    {id: "Color", value: '#030BFF', displayValue: 'Blue'},
                    {id: "Color", value: '#000000', displayValue: 'Black'},
                    {id: "Color", value: '#ff0000', displayValue: 'Red'},
                ]
            },
                {
                    id: "Capacity",
                    type: 'text',
                    items: [
                        {id: "Capacity", value: '256GB', displayValue: '256GB'},
                        {id: "Capacity", value: '1TB', displayValue: '1TB'},
                    ]
                },
                {
                    id: 'Operational system',
                    type: 'text',
                    items: [
                        {id: "Operational system", value: 'Android12', displayValue: 'Android 12'},
                        {id: "Operational system", value: 'Android13', displayValue: 'Android 13'}
                    ]
                }
            ]
    }
]
