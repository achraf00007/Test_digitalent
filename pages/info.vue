<template>
  <div>
    <section class="ftco-section pt-5">
      <div class="container">
        <div class="row justify-content-end mb-5">
          <div class="col-md-3">
              <div class="form-group">
                <button type="button" @click="logout()" class="btn btn-primary rounded submit font-weight-bold p-3 px-5">
                  Logout
                  &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor"><path d="M12 3.25a.75.75 0 0 1 0 1.5a7.25 7.25 0 0 0 0 14.5a.75.75 0 0 1 0 1.5a8.75 8.75 0 1 1 0-17.5Z"/><path d="M16.47 9.53a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10a.75.75 0 0 1 0-1.5h8.19l-1.72-1.72Z"/></g></svg>
                </button>
              </div>
          </div>
        </div>
        <div class="row">
          
          <div class="col-12 col-md-5 col-lg-5">
            <div class="login-wrap p-4 p-md-4" v-if="user != null">
              <div class="icon d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><path fill="#fff" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-6 8q-.825 0-1.413-.588T4 18v-.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.588 1.413T18 20H6Z"/></svg>
              </div>
              <div class="mt-5">
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
import VueApexCharts from 'vue-apexcharts';
import _round from "lodash/round";
export default {
	name: 'InfoPage',
  components: {
    apexchart: VueApexCharts,
  },
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
      const cityNames = vm.users.map(user => user.city);
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
  
</style>
