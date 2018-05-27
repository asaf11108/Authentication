const prefix = '/api/customers';

export default class Main {

    static getCustomers() {
        return fetch(prefix, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            })
        })
    }

    static addCustomer(customer) {
        return fetch(prefix, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN"),
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({customer})
        })
    }
};
