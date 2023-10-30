import { loginUser } from '~/services/auth.js';
import { registerUser } from '~/services/auth.js';

export default ({ app }, inject) => {
  inject('loginUser', loginUser);
  inject('registerUser',registerUser);
};