<template>
  <div class="container_home">
    <transition name="fade" v-if="show">
      <section>
          <button type="button" class="refresh_icon" @click="refreshPage"> </button>
          <div class="start_container" v-if="!setup">
            <video autoplay muted loop id="myVideo" style="z-index: -1;" v-if="screen_number == 12">
                <source src="video/megamall1.mp4" type="video/mp4">
            </video>

            <video autoplay muted loop id="myVideo" style="z-index: -1;" v-if="screen_number == 10">
                <source src="video/northedsa.mp4" type="video/mp4">
            </video>

            <video autoplay muted loop id="myVideo" style="z-index: -1;" v-if="screen_number <= 6">
                <source src="video/shangrila.mp4" type="video/mp4">
            </video>

            <div class="led_main">
              <div class="led_screen" v-for="(n, n_index) in (screen_number / 2)" :key="n_index">
                <div class="row">

                  <div class="circle_holder" v-if="!$store.state.screenCount[n_index].screen">
                    <div class="each_circle pulse" :class="'phone'+(evenC[n_index] + 1)">
                      <button type="button" @click="ShowDetails(phone_list[evenC[n_index]].id, n_index, false, false, 0)">
                        <img :src="CMS_URL_IMAGE+'phones/'+phone_list[evenC[n_index]].img" :alt="phone_list[evenC[n_index]].img">
                        <p :class="phone_list[evenC[n_index]].name.length <= 15 ? '':'lng_name'">{{ phone_list[evenC[n_index]].name }}</p>
                      </button>
                    </div>
                  </div>

                  <div class="circle_holder" v-if="!$store.state.screenCount[n_index].screen">
                    <div class="signature_circle pulse" :class="'signa'+n_index">
                      <p class="hkgrotesk-light">PLAN</p>
                      <img :src="CMS_URL_IMAGE+'plans/'+signature_list[signatureCount[n_index]].sizeimage" :alt="signature_list[signatureCount[n_index]].sizeimage" @click="ShowDetails(phone_list[evenC[n_index]].id, n_index, true, signatureCount[n_index], signature_list[signatureCount[n_index]].id)">
                      <p class="hkgrotesk-medium">P{{ signature_list[signatureCount[n_index]].value }}</p>
                    </div>
                  </div>

                  <div class="circle_holder" v-if="!$store.state.screenCount[n_index].screen">
                    <div class="each_circle pulse" :class="'phone'+(oddC[n_index] + 1)">
                      <button type="button" @click="ShowDetails(phone_list[oddC[n_index]].id, n_index, false, false, 0)">
                        <img :src="CMS_URL_IMAGE+'phones/'+phone_list[oddC[n_index]].img" :alt="phone_list[oddC[n_index]].img">
                        <p v-if="phone_list[oddC[n_index]].name.length <= 15">{{ phone_list[oddC[n_index]].name }}</p>
                        <p class="lng_name" v-else>{{ phone_list[oddC[n_index]].name }}</p>
                      </button>
                    </div>
                  </div>

                  <p class="tap_to" v-if="!$store.state.screenCount[n_index].screen">TAP TO START</p>
                </div>

                <!-- Phone Details -->
                <PhoneComponent :phoneList="phone_list" :allPlans="allPlans" :ShowPlans="plan_Status" :activeSigna="plan_ActiveSignature" :activeScreen="ScrenActive" :activeID="$store.state.screenCount[n_index].activeID" :class="'screenID_'+n" v-if="$store.state.screenCount[n_index].screen" />

              </div>
            </div>
          </div>

          <div class="setup_container" v-else>
            <div class="setup_title">
              <h1>Set the location of this Product wall</h1>
            </div>

            <div class="setup_ip">
              <p>Your Static IP Address:</p>
              <p><b>{{ ip }}</b></p>
            </div>

            <div class="setup_forms">
              <!-- <div class="form-group">
                <label class="control-label">District:</label>
                <div class="select">
                  <select class="district" tyle="text-align:center;" @change="SelectDistrict($event)" required="">
                    <option value="">-- Select District --</option>
                    <option :value="d_list.district_id" v-for="d_list in district" :key="d_list.district_id">{{ d_list.district_name }}</option>
                  </select>
                </div>
              </div> -->

              <div class="form-group">
                <label class="control-label">Store:</label>
                <div class="select">
                  <select class="ssc" tyle="text-align:center;" required="">
                    <option value="">-- Select SSC --</option>
                    <option :value="list.s_id" v-for="list in ssc_filter" :key="list.s_id" :data-led="list.s_led">{{ list.s_name }}</option>
                  </select> 
                </div>
              </div>
            </div> 

            <div class="setup_button">
              <button type="button" @click="Proceed">Proceed</button>
            </div>

          </div>

          <div class="error_popup" v-if="setup_error">
            <img src="img/error_icon.png" alt="">
              <p v-if="errormessage_toggle">
                Please choose Sales and Service Center.
              </p>
              <p v-else>
                Please disable local ips with mdns and relaunch the browser.
              </p>
              <div class="error_button_holder"  v-if="errormessage_toggle">
                <button type="button" @click="closeError">Okay</button>
              </div>
          </div>

      </section>
    </transition>
    <div class="loading" v-if="loading">
      <div class="sk-circle">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
      </div>
      <h1>LOADING...</h1>
    </div>
  </div>
</template>

<style scoped >
.setup_button button{
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
  font-size: 1.5em;
  padding: 10px 20px;
  border-radius: 10px;
  outline: none;
}
.setup_container{
  width: 1000px;
  margin: 0 auto;
  position: absolute;
  color: #ffffff;
  left: 0px;
  right: 0px;
  bottom: 100px;
}
.setup_title{
  margin: 30px 0px;
  font-size: 2em;
}
.setup_ip{
  margin-bottom: 30px;
}
.setup_ip p{
  margin-bottom: 10px;
  font-size: 1.5em;
}
.form-group{
  width: 90%;
  margin:0 auto;
  margin-bottom: 40px;
}
.control-label{
  font-size: 1.6em;
}
.select {
    width: 80%;
    margin: 0 auto;
    background: #f3f2f2;
    border-top: 10px solid #ccc;
    position: relative;
    height: 70px;
    margin-top: 20px;
}
::-webkit-scrollbar-thumb {
    background: #969696;
    border-radius: 0;
}
.select>select {
    background: 0 0;
    border: none;
    font-size: 2em;
    height: 60px;
    width: 100%;
    outline: 0;
    z-index: 2;
    box-shadow: none!important;
    color:#000000;
    padding-left: 20px;
}
</style>

<script>

import axios from 'axios';
import PhoneComponent from "~/components/PhoneComponent";
import $ from 'jquery';

export default {
  components: {
    PhoneComponent
  },
  data(){
    return {
      setup: false,
      show: false,
      loading: true,
      district: [],
      ssc: false,
      plan_ActiveSignature: '',
      ssc_filter: [],
      phone_list: [],
      allPlans: [],
      signature_list: [],
      // token: '12345678sdfghyuio',
      // For alternate phone display
      evenC: [0, 2, 4, 6, 8, 10, 12, 14, 16],
      oddC: [1, 3, 5, 7, 9, 11, 13, 15, 17],
      // Repeating Signature Plans
      signatureCount: [],
      plan_Status: false,
      ScrenActive: 0,
      screen_number: '',
      dis: false,
      errorToggle: false,
      setup_error: false,
      errormessage_toggle: true,
      ip: '',
      CMS_URL_IMAGE: process.env.CMSUrl_image
    }
  },
  mounted() {
    // const token = '12345678sdfghyuio';
    // this.$axios.$get('getStores', {
    //   headers: {
    //     Authorization: `Token ${token}`
    //   }
    // }).then( res => {
    //   if(res){
    //     this.ssc = true;
    //     this.ssc_filter = res;
    //   }
    // }).catch( err => {
    //     this.errorToggle = true;
    // });
    
    this.$axios.$get('getStores').then( res => {
      if(res){
        this.ssc = true;
        this.ssc_filter = res;
      }
    }).catch( err => {
        this.errorToggle = true;
    });

    function getLocalIP() {
      return new Promise(function(resolve, reject) {
        // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
        var RTCPeerConnection = /*window.RTCPeerConnection ||*/ window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

        if (!RTCPeerConnection) {
          reject('Your browser does not support this API');
        }
        
        var rtc = new RTCPeerConnection({iceServers:[]});
        var addrs = {};
        addrs["0.0.0.0"] = false;
        
        function grepSDP(sdp) {
            var hosts = [];
            var finalIP = '';
            sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
                if (~line.indexOf("a=candidate")) {     // http://tools.ietf.org/html/rfc4566#section-5.13
                    var parts = line.split(' '),        // http://tools.ietf.org/html/rfc5245#section-15.1
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') {
                        finalIP = addr;
                    }
                } else if (~line.indexOf("c=")) {       // http://tools.ietf.org/html/rfc4566#section-5.7
                    var parts = line.split(' '),
                        addr = parts[2];
                    finalIP = addr;
                }
            });
            return finalIP;
        }
        
        if (1 || window.mozRTCPeerConnection) {      // FF [and now Chrome!] needs a channel/stream to proceed
            rtc.createDataChannel('', {reliable:false});
        };
        
        rtc.onicecandidate = function (evt) {
            // convert the candidate to SDP so we can run it through our general parser
            // see https://twitter.com/lancestout/status/525796175425720320 for details
            if (evt.candidate) {
              var addr = grepSDP("a="+evt.candidate.candidate);
              resolve(addr);
            }
        };
        rtc.createOffer(function (offerDesc) {
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });
      });
    }

    // USAGE
    if(!localStorage.getItem("ip_address")){  
        getLocalIP().then((IpAddress) => {
          
          // if chrome://flags/#enable-webrtc-hide-local-ips-with-mdns is disabled
          if(IpAddress.length < 15){
            this.$axios.$get('checkIP?l_ipaddress='+IpAddress).then( res => {
              
              // if district and ssc is loaded
              if(this.ssc){
                this.show = true;
                this.loading = false;
              }
              
              if(res){ 
                // Set Local Storage IP
                localStorage.setItem("ip_address", IpAddress);
                localStorage.setItem("store", res.l_store);
                localStorage.setItem("number_screen", res.s_led);
                this.screen_number = res.s_led;
                this.GetDetails();
                this.setup = false; 
              }else{
                this.ip = IpAddress;
                this.setup = true;
              }
            }).catch( err => {
                this.errorToggle = true;
                console.log(err);
            });
          }else{
            this.show = true;
            this.setup = true;
            this.loading = false;
            this.setup_error = true;
            this.errormessage_toggle = false;
          }

        });
        
      // if local storage ip is available
      }else{
        // this.show = true;
        // this.loading = false;
        this.GetDetails();
      }
  },
  methods:{
    refreshPage(){
      this.$router.go(0);
      // this.show = false;
      // this.loading = true;
      // // alert("test");
      // const me = this;
      // setTimeout(() => {
      //   me.show = true;
      //   me.loading = false;
      // }, 500);
    },
    GetDetails(){
      this.show = false;
      const me = this;
      const screenNum = localStorage.getItem("number_screen");
      const startSlice = [0, 2, 4, 6, 8, 10, 12, 14, 16];
      this.screen_number = localStorage.getItem("number_screen");

      this.$axios.$get('getPhoneByStore?store_id='+localStorage.getItem("store")).then( res => {
        if(res){
          this.phone_list = res;
        }
      }).catch( err => {
          this.errorToggle = true;
          console.log(err)
      });

      this.$axios.$get('getAllPlans').then( res => {
        if(res){
          this.allPlans = res;
        }
      }).catch( err => {
          this.errorToggle = true;
          console.log(err)
      });
      

      this.$axios.$get('getSignaturePlans').then( res => {
        if(res){
          this.signature_list = res;
          for (let findex = 0; findex < this.screen_number / 2; findex++) {
            for (let index = 0; index < this.signature_list.length; index++) {
              this.signatureCount.push(index);
            }
          }

          setTimeout(() => {
            me.show = true;
            me.loading = false;
          }, 500);
        }
      }).catch( err => {
          this.errorToggle = true;
          console.log(err)
      });

    },
    Proceed(){
      const me = this;
      const district_id = $(".district").find("option:selected").val();
      const ssc_id = $(".ssc").find("option:selected").val();
      const ssc_led = $(".ssc").find("option:selected").data("led");
      // this.loading = true;

      if(ssc_id != ''){
          this.loading = true;
          const formdata = new FormData();
          formdata.append("l_ipaddress", this.ip);
          formdata.append("l_store", ssc_id);

          this.$axios.post('insertIP', formdata)
          .then(function (res) {
            if(res.status == 200){
              localStorage.setItem("ip_address", me.ip);
              localStorage.setItem("store", ssc_id);
              localStorage.setItem("number_screen", ssc_led);
              me.screen_number = ssc_led;
              me.setup = false;
              me.GetDetails();
            }
          })
          .catch(function (error) {
            me.errorToggle = true;
            console.log(error);
          });
      }else{
        this.setup_error = true;
        this.errormessage_toggle = true;
      }
    },
    closeError(){
      this.loading = false;
      this.setup_error = !this.setup_error;
    },
    ShowDetails(phoneID, screenID, planStatus, activeSignature, planID){
      
      const me = this;
      const formdata = new FormData();
      me.plan_Status = planStatus;
      me.plan_ActiveSignature = activeSignature;
      me.$store.state.screenCount[screenID].screen = false;

      setTimeout(() => {
        me.ScrenActive = screenID;
        me.$store.state.screenCount[screenID].screen = true;
        me.$store.state.screenCount[screenID].activeID = phoneID;

        //IF CLICK PLAN
        if(planID > 0){
          phoneID = 0;
        }
        
        formdata.append("ipaddress", localStorage.getItem("ip_address"));
        formdata.append("phone_id", phoneID);
        formdata.append("plan_id", planID);
        me.$axios.post('insertReports', formdata)
        .then(function (res) {
          if(res.status == 200){
            
          }else{
            // me.errorToggle = true;
            console.log(error);
          }
        })
        .catch(function (error) {
          // me.errorToggle = true;
          console.log(error);
        });
      }, 200);

    }
  }
}
</script>

<style>

</style> 