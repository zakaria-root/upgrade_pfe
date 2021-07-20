export default class Gate{

  constructor(user){
    this.user = user;
  }

  is_admin(){
    return user.order === 'admin';
  }
  
  is_auther(){
    return user.order === 'auther';
  }
  
  is_user(){
    return user.order === 'user';
  }

  is_admin_or_auther(){
    if (user.order === 'auther' || user.order === 'admin') {
      return true;
    }

  }
}