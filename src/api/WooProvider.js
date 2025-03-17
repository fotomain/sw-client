// "use strict";

// npm i axios
// npm i create-hmac
// npm i oauth-1.0a --production
// npm i url-parse
// npm i stream
// npm i cipher-base
// npm install --save buffer

import axios from "axios";
import createHmac from "create-hmac";
import OAuth from "oauth-1.0a";
import Url from "url-parse";
import ClassWooEntity from "./WooEntityRoot";

//===DOC https://woocommerce.github.io/woocommerce-rest-api-docs/#create-an-order-note
const debug_local=true
// const debug_local=false

export default class WooCommerceProvider {
  constructor(opt) {
    if (!(this instanceof WooCommerceProvider)) {
      return new WooCommerceProvider(opt);
    }

    opt = opt || {};

    if (!opt.url) {
      throw new OptionsException("url is required");
    }

    if (!opt.consumerKey) {
      throw new OptionsException("consumerKey is required");
    }

    if (!opt.consumerSecret) {
      throw new OptionsException("consumerSecret is required");
    }

    this.classVersion = "1.0.1";
    this._setDefaultsOptions(opt);
  }


  _setDefaultsOptions(opt) {
    this.url = opt.url;
    this.wpAPIPrefix = opt.wpAPIPrefix || "wp-json";
    this.version = opt.version || "wc/v3";
    this.isHttps = /^https/i.test(this.url);
    this.consumerKey = opt.consumerKey;
    this.consumerSecret = opt.consumerSecret;
    this.encoding = opt.encoding || "utf8";
    this.queryStringAuth = opt.queryStringAuth || false;
    this.port = opt.port || "";
    this.timeout = opt.timeout;
    this.axiosConfig = opt.axiosConfig || {};
  }


  _parseParamsObject(params, query) {
    for (const key in params) {
      const value = params[key];

      if (typeof value === "object") {
        for (const prop in value) {
          const itemKey = key.toString() + "[" + prop.toString() + "]";
          query[itemKey] = value[prop];
        }
      } else {
        query[key] = value;
      }
    }

    if (debug_local) console.log('=== res_url query',query)

    return query;
  }


  _normalizeQueryString(url, params,method='') {
    // Exit if don't find query string.
    if (url.indexOf("?") === -1 && Object.keys(params).length === 0) {
      return url;
    }

    if (debug_local) console.log('=== _normalizeQueryString 1 ',url)
    if (debug_local) console.log('=== _normalizeQueryString 2 params',params)

    const query = new Url(url, null, true).query;
    if (debug_local) console.log('=== _normalizeQueryString 3 query',query)
    const values = [];

    let queryString = "";

    // Include params object into URL.searchParams.
    this._parseParamsObject(params, query);

    // let idExist=false
    for (const key in query) {
        values.push(key);
    }
    // values.sort(); //id must ne first !!!


        // if(idExist)
        //   values.push('id',query['id']);

    for (const i in values) {
      if (queryString.length) {
        queryString += "&";
      }

      queryString += encodeURIComponent(values[i])
        .replace(/%5B/g, "[")
        .replace(/%5D/g, "]");
      queryString += "=";
      queryString += encodeURIComponent(query[values[i]]);
    }

    let res_url = url.split("?")[0] + "?" + queryString;

    if (debug_local) console.log('=== t11 _normalizeQueryString res_url1 before',res_url)

    res_url = res_url.replace('orders?id=','orders/')
    res_url = res_url.replace('products?id=','products/')
    res_url = res_url.replace('attributes?id=','attributes/')
    res_url = res_url.replace('products/tags?id=','products/tags/')
    res_url = res_url.replace('products/categories?id=','products/category/')

    if('delete'===method ) res_url = res_url+'?force=true'

    if (debug_local) console.log('=== t11 _normalizeQueryString res_url1 afrer', method,res_url)

    return res_url
  }
  _normalize_with_id(url, params) {

    if (debug_local) console.log('=== _normalize_with_id ',params)

    let ret=url
    if( params.id )
       ret = url+'/'+params.id
    if( params.entity_guid )
       ret = url+'?entity_guid='+params.entity_guid

        if(params.force)
          ret+='?force=true'

    if (debug_local) console.log('=== _normalize_with_id res_url2 ',ret)

    return ret;
  }


  _getUrl(endpoint, params, method='') {
    const api = this.wpAPIPrefix + "/";

    let url = this.url.slice(-1) === "/" ? this.url : this.url + "/";

    url = url + api + this.version + "/" + endpoint;

    // Include port.
    if (this.port !== "") {
      const hostname = new Url(url).hostname;

      url = url.replace(hostname, hostname + ":" + this.port);
    }

    if (debug_local) console.log('=== this.isHttps ',this.isHttps, /^https/i.test(this.url) , this.url)

    //https - works OK with no params of filters
    return this._normalize_with_id(url, params);

    // if (!this.isHttps) {
    //   if(
    //       'put'===method
    //       ||
    //       'delete'===method
    //       ||
    //       ('get'===method && params.id)
    //   )
    //      return this._normalize_with_id(url, params);
    // }
    //    else
    //      return this._normalizeQueryString(url, params,method);
    //

    // return url;

  }

  /**
   * Get OAuth
   *
   * @return {Object}
   */
  _getOAuth() {
    const data = {
      consumer: {
        key: this.consumerKey,
        secret: this.consumerSecret
      },
      signature_method: "HMAC-SHA256",
      hash_function: (base, key) => {
        return createHmac("sha256", key)
          .update(base)
          .digest("base64");
      }
    };

    return new OAuth(data);
  }

  _request(method, endpoint, data, params = {}) {
    const url = this._getUrl(endpoint, params, method);

    if (debug_local) console.log('=== _normalize_with_id data',data)
    if (debug_local) console.log('=== _normalize_with_id _getUrl',url)

    const headers = {
      Accept: "application/json"
    };
    // only set "User-Agent" in node environment
    // the checking method is identical to upstream axios
    if (
      typeof process !== "undefined" &&
      Object.prototype.toString.call(process) === "[object process]"
    ) {
      headers["User-Agent"] =
        "WooCommerce REST API - JS Client/" + this.classVersion;
    }

    let options = {
      url: url,
      method: method,
      responseEncoding: this.encoding,
      timeout: this.timeout,
      responseType: "json",
      headers
    };

    if (this.isHttps) {
      if (this.queryStringAuth) {
        options.params = {
          consumer_key: this.consumerKey,
          consumer_secret: this.consumerSecret
        };
      } else {
        options.auth = {
          username: this.consumerKey,
          password: this.consumerSecret
        };
      }

      //filters = params -> options
      options.params = { ...options.params, ...params };
      if (debug_local) console.log('=== _normalize_with_id options1',options)
    } else {
      options.params = this._getOAuth().authorize({
        url: url,
        method: method
      });
      if (debug_local) console.log('=== _normalize_with_id options2',options)
    }

    if (debug_local) console.log('=== _normalize_with_id options3',options)

    if (data) {
      options.headers["Content-Type"] = "application/json;charset=utf-8";
      options.data = JSON.stringify(data);
    }

    // Allow set and override Axios options.
    options = { ...options, ...this.axiosConfig };

    return axios(options);
  }

  read(endpoint, params = {}) {

        const {all,...restParams} = params
        if(all===true && (restParams.id || restParams.entity_guid))
          throw new Error('Error 529: read all with id or entity_guid - impossible parameters !');
          // return {error:'Error! all with id - impossible parameters !'}

        if(all===true)
          return this.readAll(endpoint, restParams);

          return this._request("get", endpoint, null, restParams);

  }

  readAll = async (endpoint, params = {}) => {

    return new Promise(resolve => {

      const runParams = {
        ...params,
        'per_page':100,
        'page':1,
      }

      const woo_products = new ClassWooEntity('products')
      woo_products.read(
          runParams
      ).then(readResult=>{
        console.log("██████ read1 OK ",readResult.data)

        const total_rows  = readResult?.headers['x-wp-total']
        const total_pages = parseInt(readResult?.headers['x-wp-totalpages'])
        if (debug_local) console.log('=== get total_pages ',total_pages)

        const doAsync = async( paramsI:any ) => {

          if (debug_local) console.log('=== get paramsI ',paramsI)

          const readResultI = await woo_products.read(
              paramsI
          )
          return readResultI?.data
        }
        let mapArray = Array.from(Array(total_pages).keys())
        const workArray = mapArray.map((bar,ii) =>
        {
          const runParamsI = {
            ...runParams,
            'per_page': 100,
            'page': ii+1,
          }
          return doAsync(runParamsI)
        })
          Promise.all(workArray)
            .then((results)=>{
              console.log('results1',results)

              let allData=[]
              for (let i = 0; i < results.length; i++) {
                allData=[...allData,...results[i]]
              }

              console.log("██████ allData OK ",allData)

              resolve({data:allData})
            })
        // return res.data
      })


    })

  }


  create(endpoint, data, params = {}) {
    return this._request("post", endpoint, data, params);
  }

  update(endpoint, data, params = {}) {

    console.log('=== update endpoint  ',endpoint )
    console.log('=== update data ', data )
    console.log('=== update params ',params)
    console.log('=== this._request("put", endpoint, data, params); ',endpoint, data, params)

    const ret = this._request("put", endpoint, data, params);
    console.log('=== update _request ',ret)

    return ret
  }

  delete(endpoint, params = {}) {
    return this._request("delete", endpoint, null, params);
  }


  options(endpoint, params = {}) {
    return this._request("options", endpoint, null, params);
  }
}

export class OptionsException {
  constructor(message) {
    this.name = "Options Error";
    this.message = message;
  }
}


