<template>
  <div>
    <section class="ftco-section pt-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-8">
            <div class="login-wrap p-4 p-md-4">
              <div class="icon d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><path fill="#fff" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-6 8q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20H6Z"/></svg>
              </div>
              <h3 class="text-center mb-4">Register</h3>
              <form action="#" class="login-form">
                <div class="row">
                  <div class="col-md-4 form-group">
                    <input type="text" v-model="prenom" class="form-control rounded-left" placeholder="First name" required>
                  </div>
                  <div class="col-md-4 form-group">
                    <input type="text" v-model="nom" class="form-control rounded-left" placeholder="Last name" required>
                  </div>
                  <div class="col-md-4 form-group">
                    <input type="text" v-model="city" class="form-control rounded-left" placeholder="City" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-group">
                    <vue-tel-input 
                      class="form-control rounded-left px-2"
                      ref="intlTel"
                      v-model="telephone"
                      :ignoredCountries="['EH']"
                      :preferredCountries="['MA', 'FR']"
                      defaultCountry="MA"
                      :inputOptions="tel_placeholder"
                      mode="national"
                      required
                    >
                    </vue-tel-input>
                    <!-- <input type="text" v-model="telephone" class="form-control rounded-left" placeholder="Phone" required> -->
                  </div>
                  <div class="col-md-6 form-group">
                    <input type="text" v-model="adresse" class="form-control rounded-left" placeholder="Adress" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-group">
                    <input type="email" v-model="email" class="form-control rounded-left" placeholder="email" required>
                  </div>
                  <div class="col-md-6 form-group d-flex">
                    <input type="password" v-model="password" class="form-control rounded-left" placeholder="Password" required>
                  </div>
                </div>
                <div class="form-group">
                  <button type="button" @click="register()" class="btn btn-primary rounded submit font-weight-bold p-3 px-5">Register</button>
                </div>
                <div class="form-group m-0">
                  <div class="text-center">
                    I have already an account ? &nbsp; <nuxt-link to="/" class="font-weight-bolder"> log in</nuxt-link>
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
  name: 'RegisterPage',
  data() {
    return {
      nom: '',
      prenom: '',
      city: '',
      email: '',
      password: '',
      adresse: '',
      telephone: '',
      tel_placeholder: {
        'placeholder': "Phone"
      },
    };
  },
  computed: {
    fulltelnumber(){
      return this.$refs.intlTel.phoneObject.number;
    },
  },
  methods: {
    async register() {
      var vm = this;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      const userData = {
        nom: vm.nom,
        prenom: vm.prenom,
        city: vm.city,
        email: vm.email,
        password: vm.password,
        adresse: vm.adresse,
        telephone: vm.telephone,
      };

      if (vm.nom == '' || vm.prenom == '' || vm.city == '' || vm.adresse =='' || vm.telephone == '' || vm.email == '' || vm.password == ''){
        vm.$toast.open({
					message: 'Pleaser enter your information correctly !',
					type: 'error',
					position: 'top',
					duration: 5000
				});
      }else if (vm.$refs.intlTel.phoneObject.valid == false){
        vm.$toast.open({
          message: 'Please enter a valid number phone!',
          type: 'error',
          position: 'top',
          duration: 5000
        });
      }
      else if (!emailPattern.test(vm.email)) {
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
        const result = await this.$registerUser(userData);

        if (result.success) {
          const token = result.token;
          vm.$store.set("token",token);
          vm.$store.set("user",result.userData);
          vm.$store.set("users",result.users);
          if( vm.$store.set("token",token) != '') {
            vm.$router.push({name: 'info'});
          }
          vm.$toast.open({
            message: 'you\'ve successfully registred and connected 👌',
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
};
</script>

<style>
  .vti__input {
    background: transparent;
  }
  .vue-tel-input {
    border: 1px solid transparent;
  }
  input.vti__input::placeholder {
    color: #6c757d !important;
    opacity: 0.4;
    font-weight: 400;
  }
</style>
