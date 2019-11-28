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

export { Tenant, Owner }