
// @ts-ignore
import WooCommerceProvider from "./WooProvider";
import {ck_secret, cs_secret, url_secret} from './secrets'

const ck = ck_secret
const cs = cs_secret

const debug_local=false
class ClassWooEntity extends WooCommerceProvider {


    entity_name ='';
    // read    =  async (p1,p2)=>{};
    // create  =  async (p1,p2)=>{};
    // update  =  async (p1,p2)=>{};
    // delete  =  async (p1,p2)=>{};

    constructor(p_entity_name) {

        if(('posts'===p_entity_name || 'users'===p_entity_name)) {
            super({
                    url: url_secret,
                    consumerKey: ck,
                    consumerSecret: cs,
                    version: "wp/v2"
                }
            );
        }
        else {
            super({
                    url: url_secret,
                    consumerKey: ck,
                    consumerSecret: cs,
                    version: "wc/v3"
                }
            );
        }

        this.entity_name = p_entity_name;

    }

    read = async (params) => super.read(this.entity_name, params)

    create = async (data, params) => super.create(this.entity_name, data, params)

    update = async (data, params) => super.update(this.entity_name, data, params)

    delete = async (data, params) => super.delete(this.entity_name, params)



    guid_update = (p) => {

        this.read({
            //guid888
            'entity_guid': p.entity_guid,
        })
            .then((res) => {

                if(1!==res.data.length){
                    if(debug_local) console.log('=== error3 guid_update - no 1 but many products found  - ',res.data)
                    alert('=== error3 guid_update - no 1 but many products found - '+res.data.length)
                    return
                }

                if(debug_local) console.log('=== products ', res)
                if(debug_local) console.log('=== products ▄▄▄▄▄▄▄▄▄▄▄▄▄ id', res.data[0].id)
                if(debug_local) console.log('=== products meta_data ', res.data[0]?.meta_data)

                this.update({
                    name: 'product YYY ▄▄▄ '+Date.now()+' ▄▄▄▄▄▄ !!!!!!!!!! ',

                    description: 'description ▄▄▄▄▄▄▄▄▄ ',
                    regular_price: 888,

                }, {
                    // id:4834
                    id: res.data[0].id
                })
                    .then((res) => {
                        if(debug_local) console.log('=== woo_api ▄▄▄▄▄▄▄▄▄▄▄▄▄ guid_update ', res.data)
                    })
                    .catch(function (err) {
                        console.log('=== error1 guid_update ', err)
                        alert('=== error1 guid_update ' + err.code + ' === ' + err.message)
                    });
            })

    }

    guid_delete = (p) => {

        this.read({
            //guid888
            'entity_guid': p.entity_guid,
        })
            .then((res) => {
                if(1!==res.data.length){

                    console.log('=== error3 guid_delete - no 1 but many products found  - ',res.data)

                    let err_text=''
                    if(1<res.data.length) {
                         err_text = '=== error3 guid_delete - no 1 but many products found - ' + res.data.length
                    }
                    if(0===res.data.length) {
                         err_text = '=== error4 guid_delete - no products found - ' + res.data.length
                    }

                    alert(err_text)
                    return {error:err_text}
                }
                if(debug_local) console.log('=== products ', res)
                if(debug_local) console.log('=== products ▄▄▄▄▄▄▄▄▄▄▄▄▄ id', res.data[0].id)
                if(debug_local) console.log('=== products meta_data ', res.data[0]?.meta_data)

                this.delete(this.entity_name,{
                    id:res.data[0].id,
                    // id:4834,
                    force:true,
                })
                    .then((res) => {
                        if(debug_local) console.log('=== woo_api ▄▄▄▄▄▄▄▄▄▄▄▄▄ guid_delete ', res.data)
                        return {status:200, data:res.data}
                    })
                    .catch(function (err) {
                        console.log('=== error1 guid_delete ', err)
                        alert('=== error1 guid_delete ' + err.code + ' === ' + err.message)
                    });


            })

    }

}

export default ClassWooEntity
