import jwt_decode from 'jwt-decode'; //npm install jwt-decode

export function isUserAuthenticated() {
    /* const token = ''//localStorage.getItem('token');
    console.log(token)
    if (!token) {
      return false;
    }
  
    try {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      console.log(decoded.exp - currentTime)
      if (decoded.exp < currentTime) {
        return false;
      }
    } catch (error) {
      return false;
    }
    
    return true; */
}