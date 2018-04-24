const prefix = "/api/acount/";

export default class Acount {

    static login(fields) {
        return fetch(prefix + 'login', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(`${fields.username}:${fields.password}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        });

    }
};
