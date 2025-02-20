import {add_zeros} from "./GlobalFunctions";

const initNewProductData = () => {

    let n_entity_guid = "guid" + '-' + add_zeros(4, Math.round(Math.random() * 1000).toString())
        + '-' + Date.now().toString()

    const common_data ={
        name: 'Product ' + n_entity_guid,
        description: 'description ',
        regular_price:'99',
        sale_price:'',
        sku:'sku'+Date.now(),
        on_sale:false,
    }

    const product_json_data = {
        ...common_data,
        type: 'simple',
        "meta_data": [

            {
                "key": "entity_guid",
                "value": n_entity_guid
            },
            {
                "key": "main_image_url",
                "value": ''
            },
            {
                "key": "main_video_url",
                "value": ''
            },

        ],
    }

    return {...product_json_data}

}

export default initNewProductData