export default function ({ store, redirect, route }) {
    const isLoggedIn = store.getters['isLoggedIn'];
  
    if (isLoggedIn === true && route.path === '/') {
      return redirect('/info');
    }else if (isLoggedIn === true && route.path === '/register') {
        return redirect('/info');
    }
  }