<template>
  <div>
    <section class="header">
      <div class="container pt-3 pt-md-2 pb-2">
        <div class="row align-items-center justify-content-between" v-if="user != null">
          <div class="col-md-3 col-6 logo">
              <img src="logo.png" width="150px" alt="logo">
          </div>
          <div class="col-md-3 col-6 justify-content-end d-flex">
              <div class="form-group">
                <button type="button" @click="logout()" class="btn rounded-circle submit font-weight-bold">
                  Logout
                  &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"/><path d="M9 12h12l-3-3m0 6l3-3"/></g></svg>
                </button>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section class="ftco-section">
      <div class="container">
        <div class="row">
          
          <div class="col-12 col-md-5 col-lg-5">
            <div class="login-wrap p-4 p-md-4" v-if="user != null">
              <div class="icon d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><path fill="#fff" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-6 8q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20H6Z"/></svg>
              </div>
              <div class="mt-5 info">
                Full name: <h5>{{ user.nom }} {{ user.prenom }}</h5>
                City: <h5>{{ user.city }}</h5>
                Email: <h5>{{ user.email }}</h5>
                Phone: <h5>{{ user.telephone }}</h5>
                Adress: <h5>{{ user.adresse }}</h5>
              </div>  
            </div>
          </div>

          <div class="col-12 col-md-7 col-lg-7 mt-5 mt-md-0">
            <div class="login-wrap p-4 p-md-4" v-if="user != null">
              <div class="icon d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M20 13.75a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v6.75H14V4.25c0-.728-.002-1.2-.048-1.546c-.044-.325-.115-.427-.172-.484c-.057-.057-.159-.128-.484-.172C12.949 2.002 12.478 2 11.75 2c-.728 0-1.2.002-1.546.048c-.325.044-.427.115-.484.172c-.057.057-.128.159-.172.484c-.046.347-.048.818-.048 1.546V20.5H8V8.75A.75.75 0 0 0 7.25 8h-3a.75.75 0 0 0-.75.75V20.5H1.75a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5H20v-6.75Z"/></svg>
              </div>
              <div class="mt-5 mx-auto">
                <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
              </div>  
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>

import _round from "lodash/round";
export default {
	name: 'InfoPage',
  data() {
		return {
      token: this.$store.get("token"),
      user: this.$store.get("user"),
      users: this.$store.get("users"),
      chartOptions: {
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          }
        ],
      },
      series: [],
		}
	},
  mounted: function (){
    var vm = this;
    if(vm.token == ''){
      vm.$router.push({
        name: 'index',
      })
    }
  },
  created() {
    var vm = this;
    vm.chartLabels();
    vm.seriesChart();
  },
  methods:{
    logout(){
      var vm = this;
      vm.$store.set("token",'');
      vm.$router.push({name: 'index'});
    },
    chartLabels() {
      var vm = this;
      const cityNames = Array.from(new Set(vm.users.map(user => user.city)));
      vm.$set(vm.chartOptions, 'labels', cityNames);
    },
    seriesChart() {
      var vm = this;
      const cityCounts = vm.users.reduce((acc, user) => {
        acc[user.city] = (acc[user.city] || 0) + 1;
        return acc;
      }, {});
      
      const totalUsers = vm.users.length;
      const cityPercentages = vm.chartOptions.labels.map(city => {
        const count = cityCounts[city] || 0;
        return _round(((count / totalUsers) * 100),2);
      });

      vm.$set(vm, 'series', cityPercentages);
    }
  }
}
</script>

<style>
  .header {
    background-color: #000139 !important;
    box-shadow: 1px 1px 15px #aaa;
    position: fixed;
    width: 100%;
    z-index: 99;
  }
  .info h5 {
    font-weight: 500;
  }
  .submit {
    background-color: aliceblue !important;
    color: #6130dd!important;
    font-size: 15px;
    width: initial !important;
    padding: 10px 25px;
  }
  .ftco-section {
    padding-top: 110px !important;
  }
  .logo {
    cursor: none;
  }
</style>
