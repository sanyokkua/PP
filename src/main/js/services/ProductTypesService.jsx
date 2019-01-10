import axios from 'axios';
import Utils from '../utils/Utils'

export default class ProductTypesService {
    constructor() {
        this.utils = new Utils();
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    createProductType(productType, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.post('/types', productType, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }

    getProductTypes(successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.get('/types')
             .then(response => {
                 let types = [{id: 0, name: ''}];
                 successCallback(types.concat(response.data));
             })
             .catch(error => failCallback(error));
    }

    updateProductType(productType, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.put('/types/' + productType.id, productType, {headers: {[this.header]: this.token}})
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }

    deleteProductType(productType, successCallback, failCallback) {
        this.utils.checkDefaultCallbacks(successCallback, failCallback);
        axios.delete('/types/' + productType.id, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 successCallback();
             })
             .catch(error => failCallback(error));
    }
}