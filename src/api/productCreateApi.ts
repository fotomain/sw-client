import ClassWooEntity from "./WooEntityRoot";
import initNewProductData from "./initNewProductData";

const woo_products = new ClassWooEntity('products')

const productCreateApi = async (params:any) => {

    const product_json_data:any = initNewProductData()
    const ret = await woo_products.create({
        ...product_json_data
    })

}

export default productCreateApi