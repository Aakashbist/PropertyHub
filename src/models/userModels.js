class Tenant {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class Owner {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
class Users {
    constructor(id, name, email, claims) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.claims = claims;
    }
}
export { Tenant, Owner, Users }