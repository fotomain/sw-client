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
                name: 'Color',
                type: 'swatch',
                items: [
                    {id: "Green", value: '#44FF03', displayValue: 'Green'},
                    {id: "Cyan", value: '#03FFF7', displayValue: 'Cyan'},
                    {id: "Blue", value: '#030BFF', displayValue: 'Blue'},
                    {id: "Black", value: '#000000', displayValue: 'Black'},
                    {id: "Red", value: '#ff0000', displayValue: 'Red'},
                ]
            },
            {
                id: "Capacity",
                name: "Capacity",
                type: 'text',
                items: [
                    {id: "256GB", value: '256GB', displayValue: '256GB'},
                    {id: "1T", value: '1T', displayValue: '1T'},
                ]
            },
            {
                id: 'Operational system',
                name: 'Operational system',
                type: 'text',
                items: [
                    {id: "iOS12", value: 'iOS12', displayValue: 'iOS 12'},
                    {id: "iOS16", value: 'iOS16', displayValue: 'iOS 16'}
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
                name: 'Color',
                type: 'swatch',
                items: [
                    {id: "Green", value: '#44FF03', displayValue: 'Green'},
                    {id: "Cyan", value: '#03FFF7', displayValue: 'Cyan'},
                    {id: "Blue", value: '#030BFF', displayValue: 'Blue'},
                    {id: "Black", value: '#000000', displayValue: 'Black'},
                    {id: "Red", value: '#ff0000', displayValue: 'Red'},
                ]
            },
                {
                    id: "Capacity",
                    name: "Capacity",
                    type: 'text',
                    items: [
                        {id: "256GB", value: '256GB', displayValue: '256GB'},
                        {id: "1T", value: '1T', displayValue: '1T'},
                    ]
                },
                {
                    id: 'Operational system',
                    name: 'Operational system',
                    type: 'text',
                    items: [
                        {id: "Android12", value: 'Android12', displayValue: 'Android 12'},
                        {id: "Android13", value: 'Android13', displayValue: 'Android 13'}
                    ]
                }
            ]
    }
]
