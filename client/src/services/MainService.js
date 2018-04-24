const prefix = '/api/customers';

export default class Main {

    static getCustomers() {
        fetch(prefix, { 
            method: 'get', 
            headers: new Headers({
              'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
            })
          })

    }
};
