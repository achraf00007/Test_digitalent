<template>
  <div>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="login-wrap p-4 p-md-4">
              <div class="icon d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><path fill="#fff" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-6 8q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20H6Z"/></svg>
              </div>
              <h3 class="text-center mb-4">Log in</h3>
              <form action="#" class="login-form">
                <div class="form-group">
                  <input type="text" v-model="email" class="form-control rounded-left" placeholder="email" required>
                </div>
                <div class="form-group d-flex">
                  <input type="password" v-model="password" class="form-control rounded-left" placeholder="Password" required>
                </div>
                <div class="form-group">
                  <button type="button" @click="submitLogin" class="btn btn-primary rounded font-weight-bold submit p-3 px-5">Log In</button>
                </div>
                <div class="form-group m-0">
                  <div class="text-center">
                    Not a member ? &nbsp; <nuxt-link to="/register" class="font-weight-bolder"> Register</nuxt-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
	name: 'IndexPage',
	data() {
		return {
      nom: '',
      prenom: '',
      city: '',
      email: '',
      password: '',
      adresse: '',
      telephone: '',
		}
	},
  mounted: function (){
  },
  methods:{
    async submitLogin(){
      var vm = this;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (vm.email == '' || vm.password == ''){
        vm.$toast.open({
					message: 'Pleaser enter your information correctly!',
					type: 'error',
					position: 'top',
					duration: 5000
				});
      }else if (!emailPattern.test(vm.email)) {
        vm.$toast.open({
          message: 'Please enter a valid e-mail address!',
          type: 'error',
          position: 'top',
          duration: 5000
        });
      }else if (vm.password.length < 5) { 
        vm.$toast.open({
          message: 'The password must be at least 5 characters long!',
          type: 'error',
          position: 'top',
          duration: 5000
        });
      }else {
        const result = await this.$loginUser(vm.email, vm.password);

        if (result.success) {
          const { user, token } = result;
          vm.$store.set("token",result.token);
          vm.$store.set("user",result.user);
          vm.$store.set("users",result.users);
          if( vm.$store.set("token",token) != '') {
            vm.$router.push({name: 'info'});
          }
          vm.$toast.open({
            message: 'you\'ve successfully connected 👌',
            type: 'success',
            position: 'top',
            duration: 5000
          });
        } else {
          vm.$toast.open({
            message: 'Invalid email or password',
            type: 'error',
            position: 'top',
            duration: 5000
          });
        }
      }
      
    }
  }
}
</script>

<style>
  
</style>
