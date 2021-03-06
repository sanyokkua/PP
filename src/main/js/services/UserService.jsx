import axios from 'axios';
import Utils from '../utils/Utils'

export default class UserService {
    constructor() {
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
    }

    static emailIsInUse(email, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
        axios.get('/email', {
                 headers: {[this.header]: this.token},
                 params: {
                     email: email,
                 }
             })
             .then(response => {
                 let isInUse = response.data;
                 success(isInUse);
             })
             .catch(error => fail(error));
    }

    static register(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        this.token = $("meta[name='_csrf']").attr("content");
        this.header = $("meta[name='_csrf_header']").attr("content");
        axios.post('/registration', user, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(response => {
                 let user = response.data;
                 success(user);
             })
             .catch(error => {
                        console.warn(error);
                        fail(error.response + '');
                    }
             );
    }

    createUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.post('/users', user, {headers: {[this.header]: this.token, 'Content-Type': 'application/json; charset=utf-8'}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    getUsers(loadParams, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.get('/users', {
                 headers: {[this.header]: this.token},
                 params: {
                     searchString: loadParams.search,
                     page: loadParams.currentPage,
                     recordsPerPage: loadParams.numberOfRecords,
                     roleId: loadParams.currentRole
                 }
             })
             .then(response => {
                 let current = response.data.currentPage;
                 let total = response.data.totalPages;
                 let content = response.data.content;
                 let result = {
                     currentPage: current,
                     totalPages: total,
                     content: content
                 };
                 success(result);
             })
             .catch(error => fail(error));
    }

    updateUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.put('/users/' + user.userId, user, {headers: {[this.header]: this.token}})
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }

    deleteUser(user, success, fail) {
        Utils.checkDefaultCallbacks(success, fail);
        axios.delete('/users/' + user.userId, {
                 headers: {[this.header]: this.token}
             })
             .then(() => {
                 success();
             })
             .catch(error => fail(error));
    }
}