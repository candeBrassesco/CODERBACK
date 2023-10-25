 export default class SessionDTO {
    constructor(user){
        this.name = `${user.first_name} ${user.last_name}`;
        this.mail = user.email
        this.role = user.role
    }
 }