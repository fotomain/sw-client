export const productsNew = [
    {
        id: 'iPhone11',
        name: 'iPhone 11',
        brand: 'Apple',
        inStock: true,
        category: 'tech',
        prices:[{amount:888,currency: {label:"USD"}}],
        gallery:[
            'https://lmt-web.mstatic.lv/eshop/11528/conversions/Apple-iPhone-11_purple_front-860.webp',
            'https://lmt-web.mstatic.lv/eshop/11530/conversions/Apple-iPhone-11_purple_back-860.webp',
            'https://www.apple.com/v/iphone-11/g/images/specs/hero__dqxrmndp9n2a_large.jpg',
        ],        attributes:
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
        id:'SamsungA50',
        name:'Samsung A50',
        brand:'Samsung',
        inStock: true,
        category: 'tech',
        prices:[{amount:555,currency: {label:"USD"}}],
        gallery:[
            'https://lmt-web.mstatic.lv/eshop/28913/conversions/2-samsung-galaxy-s25-s931-icy-blue-860.webp',
            'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a50/freeform/storage-d-0905.png',
            'https://images.samsung.com/is/image/samsung/lv-galaxy-a50-sm-a505fzkse40--Black-308536043?$330_330_JPG$',
        ],
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
