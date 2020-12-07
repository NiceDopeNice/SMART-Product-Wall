<template>
  <div class="phone_container">

    <div class="showTakeaPhoto" v-if="showTake">
      <div class="content">
        <h1>Take a photo of this screen if you're interested</h1>
        <button type="button" @click="showTake = !showTake">
          OKAY
        </button>
      </div>
    </div>

    <!-- SPECS PHONE IMAGE -->
    <div v-if="ActiveNav[0] || ActiveNav[1]" class="phone_image" :class="activePhone.tablet == 'yes' ? 'yes_tablet':''">
      <img :src="CMS_URL_IMAGE+'phones/'+activePhone.img" :alt="activePhone.img">
    </div>
    <!-- SPECS PHONE IMAGE -->

    <div class="phone_main" :class="compareContainer ? 'compare':''">

      <!-- SPEC CONTAINER -->
      <div class="spec_container" style="margin-top: 30px;" v-if="ActiveNav[0]">
        <p class="phone_name">{{ activePhone.name }}</p>
        <p class="label">PHONE SPECS</p>
         
        <VueSlickCarousel v-bind="slickOptionsSpecs" @beforeChange="handleBeforeChange" ref="carousel">
            <div class="phone_specs">
              <div class="phone_specs_main">
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/os.png" alt=""></div>
                  <div class="spec_title">OPERATING SYSTEM</div>
                  <div class="spec_desc">{{ activePhone.os }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/display.png" alt=""></div>
                  <div class="spec_title">DISPLAY</div>
                  <div class="spec_desc">{{ activePhone.display }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/camera.png" alt=""></div>
                  <div class="spec_title">CAMERA</div>
                  <div class="spec_desc">{{ activePhone.camera }}</div>
                </div>
              </div>
            </div>
            <div class="phone_specs">
              <div class="phone_specs_main">
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/memory.png" alt=""></div>
                  <div class="spec_title">MEMORY</div>
                  <div class="spec_desc">{{ activePhone.memory }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/processor.png" alt=""></div>
                  <div class="spec_title">PROCESSOR</div>
                  <div class="spec_desc">{{ activePhone.processor }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/videorecording.png" alt=""></div>
                  <div class="spec_title">VIDEO RECORDING</div>
                  <div class="spec_desc">{{ activePhone.videorecording }}</div>
                </div>
              </div>
            </div>
            <div class="phone_specs">
              <div class="phone_specs_main">
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/battery.png" alt=""></div>
                  <div class="spec_title">BATTERY</div>
                  <div class="spec_desc">{{ activePhone.battery }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/network.png" alt=""></div>
                  <div class="spec_title">NETWORK</div>
                  <div class="spec_desc">{{ activePhone.network }}</div>
                  <hr>
                </div>
                <div class="spec_list">
                  <div class="spec_icon"><img src="img/icons/features.png" alt=""></div>
                  <div class="spec_title">FEATURES</div>
                  <div class="spec_desc">{{ activePhone.features }}</div>
                </div>
              </div>
            </div>
        </VueSlickCarousel>

        <div class="button_holder">
          <button @click="showPrev" class="prev" v-if="ShowPrevButton">
            <img src="img/btn-prev.png" alt=""> <span>PREV</span> 
          </button>
          <button @click="showNext" class="next" v-if="ShowNextButton">
            <span>NEXT</span> <img src="img/btn-next.png" alt="">
          </button>
        </div>
      
      </div>
      <!-- SPEC CONTAINER -->

      <!-- MATRIX CONTAINER -->
      <div class="matrix_container" style="margin-top: 30px;" v-if="ActiveNav[1]">
        <p class="phone_name">{{ activePhone.name }}</p>
        <p class="label">PLAN MATRIX</p>

        <div class="phone_matrix">
          <div class="spec_list" v-for="(list, index) in activePlans" :key="index">
            <!-- <span v-if="list.status == 'true' ? ActiveSignature[index] = true : ActiveSignature[index] = false "></span> -->
            <div class="spec_main" v-if="ActiveSignature[index]">
              <div class="spec_title">SMART SIGNATURE PLAN {{ list.size }} {{ list.value }}</div>
              <hr>
              <div class="spec_desc" v-html="list.planinfo"></div>
            </div>
          </div>

          <div class="signature_list">
            <div class="button_hldr" v-for="(list, index) in activePlans" :key="index">
              <button type="button" @click="showSignaPlan(index)" :class="ActiveSignature[index] ?  'active' : ''">
                <img :src="CMS_URL_IMAGE+'plans/'+list.sizeimage" :alt="list.sizeimage">
                <p>P{{ list.value }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- MATRIX CONTAINER -->

      <!-- COMPARE CONTAINER -->
      <div class="compare_container" v-if="ActiveNav[2]">
        <div class="compare_phone" style="margin-top: 25px;" v-if="!compareContainer">
          <div class="cp_main">
            <p class="cp_name">{{ activePhone.name }}</p>
            <img :src="CMS_URL_IMAGE+'phones/'+activePhone.img" :alt="activePhone.img">
          </div>
          <div class="cp_main">
            <p class="cp_name">{{ comparePhoneID == '' ? 'Compare with?' : compareName }}</p>
            <img src="img/comparewith.png" class="pulse" alt="" v-if="comparePhoneID == ''">
            <img :src="CMS_URL_IMAGE+'phones/'+compareIMG" :alt="compareIMG" v-else>
          </div>
        </div>
        <div class="compare_p_list" v-if="!compareContainer">
            <VueSlickCarousel v-bind="slickOptionsCompare" ref="carousel" class="vueslick">
              <div class="cp_each_phone" v-for="(list, index) in otherPhones" :key="index">
                <button type="button" @click="SelectCompare(list.id, list.img, list.name)">
                  <img :src="CMS_URL_IMAGE+'phones/'+list.img" :alt="list.img">
                  <p>{{ list.name }}</p>
                </button>
              </div>
            </VueSlickCarousel>
              <button @click="showPrev" class="prev cp_prev"></button>
              <button @click="showNext" class="next cp_next"></button>
        </div>

        <div class="compare_phone_container" v-if="compareContainer">
          <div class="compare_phone">
            <div class="cp_main_first"></div>
            <div class="cp_main">
              <p class="cp_name">{{ activePhone.name }}</p>
              <img :src="CMS_URL_IMAGE+'phones/'+activePhone.img" :alt="activePhone.img">
            </div>
            <div class="cp_main">
              <p class="cp_name">{{ compPhone.name }}</p>
              <img :src="CMS_URL_IMAGE+'phones/'+compPhone.img" :alt="compPhone.img">
            </div>
          </div>

          <div class="phone_compare">
            
            <div class="com_details_container" :class="scrollContainer ? 'addScroll':''" v-if="!compButton" ref="comDetailsSigna">
              <div class="comp_details" v-for="(list, index) in PlanGroup" :key="index">
                <div class="comp_plan" :style="'padding: '+newSignaPadd+' 10px;'">
                  <img :src="CMS_URL_IMAGE+'plans/'+list.image" :alt="list.image">
                  <p>P{{ list.value }}</p>
                </div>
                <div class="comp_plan_details" :style="'padding: '+newSignaPadd+' 10px;'" v-html="activePlans[index].planinfo">{{ index }}</div>
                <div class="comp_plan_details" :style="'padding: '+newSignaPadd+' 10px;'" v-html="activeCompPlans[index].planinfo"></div>
              </div>
            </div>
 
            <div class="com_details_container spec" :class="scrollContainerSpec ? 'addScroll':''" v-else ref="comDetailsSpec">
              <div class="comp_details" v-for="(list, index) in specArray" :key="index">
                <div class="comp_plan" :style="'padding: '+newSpecPadd+' 10px'">
                  <p>{{ list.name }}</p>
                </div>
                <div class="comp_plan_details" :style="'padding: '+newSpecPadd+' 10px'"><p>{{ activePhone[list.column] }}</p></div>
                <div class="comp_plan_details" :style="'padding: '+newSpecPadd+' 10px'"><p>{{ compPhone[list.column] }}</p></div>
              </div>
            </div>

            <div class="comp_footer">
              <p>{{ compButton ? 'SPECIFICATIONS':'SIGNATURE PLANS' }}</p>
              <div class="button_holder">
                <button @click="ToggleCompButton(false)" class="prev" v-if="compButton">
                  <img src="img/btn-prev.png" alt=""> 
                  <span>SEE PLANS</span> 
                </button>
                <button @click="ToggleCompButton(true)" class="next" v-else>
                  <span>SEE SPECS</span> <img src="img/btn-next.png" alt="">
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- COMPARE CONTAINER -->

      
      <!-- OTHER PHONE CONTAINER -->
      <div class="other_container" style="margin-top: 30px;" v-if="ActiveNav[3]">
        <div class="compare_phone">
          <div class="cp_main">
            <p class="cp_name">{{ activePhone.name }}</p>
            <img :src="CMS_URL_IMAGE+'phones/'+activePhone.img" :alt="activePhone.img">
          </div>
        </div>
        <div class="compare_p_list">
            <VueSlickCarousel v-bind="slickOptionsCompare" ref="carousel" class="vueslick">
              <div class="cp_each_phone" v-for="(list, index) in otherPhones" :key="index">
                <button type="button" @click="OtherPhone(list.id)">
                  <img :src="CMS_URL_IMAGE+'phones/'+list.img" :alt="list.img">
                  <p>{{ list.name }}</p>
                </button>
              </div>
            </VueSlickCarousel>
              <button @click="showPrev" class="prev cp_prev"></button>
              <button @click="showNext" class="next cp_next"></button>
        </div>
      </div>
      <!-- OTHER PHONE CONTAINER -->

      <!-- SIGNATURE PLANS CONTAINER -->
      <div class="signature_plan" v-if="ActiveNav[4]" style="margin-top: 110px;">
        <div class="spec_list" v-for="(list, index) in activePlans" :key="index">          
          <div class="spec_main" v-if="ActiveSignature[index]">
            <div class="spec_title">SIGNATURE PLAN {{ list.size }} ({{ list.value }})</div>
            <img :src="CMS_URL_IMAGE+'plans/'+list.planimage" :alt="list.planimage">
          </div>
        </div>
        

        <div class="signature_list">
          <div class="button_hldr" v-for="(list, index) in activePlans" :key="index">
            <button type="button" @click="showSignaPlan(index)" :class="ActiveSignature[index] ?  'active' : ''">
              <img :src="CMS_URL_IMAGE+'plans/'+list.sizeimage" :alt="list.sizeimage">
              <p>P{{ list.value }}</p>
            </button>
          </div>
        </div>
      </div>
      <!-- SIGNATURE PLANS CONTAINER -->
      
    </div>
    
      <!-- NAVIGATION -->
      <div class="nav_button" v-if="!ActiveNav[4]">
        <button type="button" class="navbtn_1" @click="showHide(0)">
          <img :src="ActiveNav[0] ? 'img/btnspecs_active.png':'img/btnspecs.png' " alt="">
          <p>PHONE SPECS</p>
        </button>
        <button type="button" class="navbtn_2" @click="showHide(1)">
          <img :src="ActiveNav[1] ? 'img/btnplanmatrix_active.png':'img/btnplanmatrix.png' " alt="">
          <p>PLAN MATRIX</p>
        </button>
        <button type="button" class="navbtn_3" @click="showHide(2)">
          <img :src="ActiveNav[2] ? 'img/btnphonecompare_active.png':'img/btnphonecompare.png' " alt="">
          <p>PHONE COMPARE</p>
        </button>
        <button type="button" class="navbtn_4" @click="showHide(3)">
          <img :src="ActiveNav[3] ? 'img/btnotherphone_active.png':'img/btnotherphone.png' " alt="">
          <p>OTHER PHONES</p>
        </button>
      </div>

      <!-- FOR PLANS NAV -->
      <div class="notes_container" v-else>
        <h2>Notes:</h2>
        <p>• Smart Signature Plans are  best enjoyed in LTE powered areas</p>
        <p>• Smart Signature Plans have a commitment period of 6 months; Smart Signature Plans with Device have a commitment period of 24 months</p>
        <p>• On-Net: Smart/Sun/TNT</p>
        <p>• AnyNet: PLDT and other networks</p>
      </div>
      <!-- FOR PLANS NAV -->
      <!-- NAVIGATION -->

      <!-- FOOTER NAVIGATION -->
      <!-- NOT OTHER PHONES -->
      <div class="footer_phone" v-if="!ActiveNav[4]">
        <div class="back_btn" @click="backButton"><img src="img/back.png" alt=""><p>BACK</p></div>
        <div class="signature_btn addOP"><p @click="showHide(4)">SIGNATURE PLANS</p></div>
        <div class="iwant_btn pulse" v-if="comparePhoneID == ''"><p @click="showTake = !showTake">I WANT THIS PHONE</p></div>
        <div class="iwant_btn pulse" v-else><p @click="ComparePhones">COMPARE PHONES</p></div>
        <div class="signatureDevice_btn"><p>SIGNATURE DEVICE PLANS</p></div>
        <div class="home_btn" @click="backButton"><img src="img/home.png" alt=""><p>HOME</p></div>
      </div>
      <!-- NOT OTHER PHONES -->
      
      <!-- OTHER PHONES -->
      <div class="footer_phone" style="margin-top: -20px" v-else>
        <div class="back_btn" @click="backButton"><img src="img/back.png" alt=""><p>BACK</p></div>
        <div class="signature_btn"><p>SIGNATURE PLANS</p></div>
        <div class="iwant_btn pulse"><p @click="showTake = !showTake">I WANT THIS PLAN</p></div>
        <div class="signatureDevice_btn addOP" @click="showHide(0)"><p>SIGNATURE DEVICE PLANS</p></div>
        <div class="home_btn" @click="backButton"><img src="img/home.png" alt=""><p>HOME</p></div>
      </div>
      <!-- OTHER PHONES -->
      <!-- FOOTER NAVIGATION -->
       
  </div>
</template>

<style >

</style>

<script>
import $ from 'jquery'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  props: ['phoneList', 'allPlans', 'activeID', 'activeScreen' ,'ShowPlans', 'activeSigna'],
  data(){
    return {
      PlanGroup: [],
      activePhone: [],
      activePlans: [],
      otherPhones: [],
      compPhone: [],
      activeCompPlans: [],
      comparePhoneID: '',
      compareContainer: false,
      compButton: false,
      showTake: false,
      newSpecPadd: '10px',
      newSignaPadd: '10px',
      scrollContainer: false,
      scrollContainerSpec: false,
      compareIMG: 'comparewith.png',
      compareName: '',
      widthAdjust: '',
      specArray: [
        { name: 'Operating System', column: 'os' },
        { name: 'Display', column: 'display' },
        { name: 'Camera', column: 'camera' },
        { name: 'Memory', column: 'memory' },
        { name: 'Processor', column: 'processor' },
        { name: 'Video Recording', column: 'videorecording' },
        { name: 'Battery', column: 'battery' },
        { name: 'Network', column: 'network' },
        { name: 'Features', column: 'features' }
      ],
      slickOptionsSpecs: {
          infinite: false,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          swipe: true
      },
      slickOptionsCompare: {
          infinite: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          swipe: true
      },
      screenCount: 0,
      ShowPrevButton: false,
      ShowNextButton: true,
      CMS_URL_IMAGE: process.env.CMSUrl_image,
      ActiveNav: {0:true,1:false,2:false,3:false,4:false},
      ActiveSignature: {0:false,1:false,2:false,3:false,4:false,5:false,6:false}
    } 
  },
  mounted() {
    this.screenCount = this.activeScreen;
    // GET PHONE DETAILS
    this.phoneList.forEach((element, index) => {
      if(element.id == this.activeID){
        this.activePhone = element;
      }else{
        this.otherPhones.push(element);
      }
    });

    // GET PLAN BY PHONE
    this.allPlans.forEach((element, index) => {
      if(element.phoneid == this.activeID){
        this.activePlans.push(element);
      }
    });
    
    // WHEN CLICKED PLANS
    if(this.ShowPlans){

      for (let index = 0; index < 5; index++) {
        if(index == 4){
          this.ActiveNav[index] = true;
        }else{
          this.ActiveNav[index] = false;
        }
      }
      
      // GET ACTIVE PLAN
      this.activePlans.forEach((element, index) => {
        if(index == this.activeSigna){
          this.ActiveSignature[index] = true;
        }else{
          this.ActiveSignature[index] = false;
        }
      });

    }else{
      // GET ACTIVE PLAN
      this.activePlans.forEach((element, index) => {
        if(element.plan_status == 'true'){
          this.ActiveSignature[index] = true;
        }else{
          this.ActiveSignature[index] = false;
        }
      });
    }
    

  },
  methods: {
    showNext() {
      this.$refs.carousel.next()
    },
    showPrev() {
      this.$refs.carousel.prev()
    },    
    handleBeforeChange(event, slick, currentSlide) {
      if(slick > 0){
        this.ShowPrevButton = true;
      }else{
        this.ShowPrevButton = false;
      }
      if(slick == 2){
        this.ShowNextButton = false;
      }else{
        this.ShowNextButton = true;
      }
    },
    showHide(value){
      this.comparePhoneID = '';
      this.compareIMG = '';
      this.compareName = '';
      this.compareContainer = false;
      this.compPhone = [];
      this.activeCompPlans = [];
      this.compButton = false;
      this.newSignaPadd = '10px';
      this.newSpecPadd = '10px';
      this.scrollContainer = false;
      this.scrollContainerSpec = false;
      this.ShowNextButton = true;
      this.ShowPrevButton = false;
      
      
      for (let index = 0; index < 5; index++) {
        if(index == value){
          this.ActiveNav[index] = true;
        }else{
          this.ActiveNav[index] = false;
        }
      }
    },
    showSignaPlan(value){
      for (let index = 0; index < this.activePlans.length; index++) {
        if(index == value){
          this.ActiveSignature[index] = true;
        }else{
          this.ActiveSignature[index] = false;
        }
      }
    },
    SelectCompare(compareID, compareIMG, compareName){
      this.comparePhoneID = compareID; 
      this.compareIMG = compareIMG;  
      this.compareName = compareName;  
    },
    ComparePhones(){
      if(this.compPhone.length <= 0){
        this.PlanGroup = [];
        this.activeCompPlans = [];

        const me = this;
        let newSignaHeight = 0;
        let maxSpecHeight = 610;
        me.newSignaPadd = '10px';
        setTimeout(() => {
          // GET COMPARE PHONE DETAILS
          this.phoneList.forEach((element, index) => {
            if(element.id == this.comparePhoneID){
              this.compPhone = element;
            }
          });

          // GET PLAN BY COMPARE PHONE
          this.allPlans.forEach((element, index) => {
            if(element.phoneid == this.comparePhoneID && element.active == 1){
              this.activeCompPlans.push(element);
              this.PlanGroup.push({'id': element.planID,'value': element.value,'info': element.planinfo,'image': element.sizeimage});
            }
          });
          this.PlanGroup = [ ...new Set(this.PlanGroup) ];
          // console.table(this.allPlans)
          // console.log(this.PlanGroup)
          this.compareContainer = true;
          
          setTimeout(() => {
            // alert(maxSpecHeight+" - "+me.$refs.comDetailsSigna.clientHeight)
            if(maxSpecHeight > me.$refs.comDetailsSigna.clientHeight){
              newSignaHeight = maxSpecHeight - me.$refs.comDetailsSigna.clientHeight;

              newSignaHeight = newSignaHeight / 4;
              newSignaHeight = (newSignaHeight / 2) + 10;
              me.newSignaPadd = newSignaHeight+'px'; 
              
              me.scrollContainer = false;
          }

          if(me.$refs.comDetailsSigna.clientHeight > 620){
            me.scrollContainer = true;
          }
            
          }, 5);
            
          // console.table(this.activePlans)
          // console.table(this.activeCompPlans)
          // console.table(this.PlanGroup)
        }, 200);
      }
      
    },
    OtherPhone(phoneID){   
      this.showHide(0);
      this.activePlans = [];
      this.otherPhones = [];

      // GET NEW PHONE DETAILS
      this.phoneList.forEach((element, index) => {
        if(element.id == phoneID){
          this.activePhone = element;
        }else{
          this.otherPhones.push(element);
        }
      });

      // GET NEW PLAN BY PHONE
      this.allPlans.forEach((element, index) => {
        if(element.phoneid == phoneID){
          this.activePlans.push(element);
        }
      });
      
      // GET NEW ACTIVE PLAN
      this.activePlans.forEach((element, index) => {
        if(element.plan_status == 'true'){
          this.ActiveSignature[index] = true;
        }else{
          this.ActiveSignature[index] = false;
        }
      });
    },
    backButton(){
      this.$store.state.screenCount[this.screenCount].screen = false;
    },
    ToggleCompButton(status){
      this.compButton = !this.compButton
      if(status){
        const me = this;
        let newSpecHeight = 0;
        let newSignaHeight = 0;
        let maxSpecHeight = 610;
        // me.newSpecPadd = '10px';
        setTimeout(() => {
          if(maxSpecHeight > me.$refs.comDetailsSpec.clientHeight){
            newSpecHeight = maxSpecHeight - me.$refs.comDetailsSpec.clientHeight;

            newSpecHeight = newSpecHeight / 9;
            newSpecHeight = (newSpecHeight / 2) + 10;
            me.newSpecPadd = newSpecHeight+'px';
            me.scrollContainerSpec = false;
          }
          // alert(me.$refs.comDetailsSpec.clientHeight)
          if(me.$refs.comDetailsSpec.clientHeight > 615){
            me.scrollContainerSpec = true;
          }
          
        }, 5);
      }
    }
  }
}
</script>
