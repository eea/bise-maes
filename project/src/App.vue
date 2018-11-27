<template>
  <div id="app">
    <div class="row pad-bot-10">

      <div class="col-4 menu-left">
        <p class="instrument-heading-text">Mapping and assessment of ecosystems and their services</p>

        <transition name="fade">
          <button
            type="button"
            class="btn btn-outline-primary"
            v-if="!showTable()"  
            @click="resetSelected"
            >Reset
          </button>
        </transition>
      </div>
      <!-- actual heading -->
      <div
        v-for="header in biseHeader"
        class="col-1-sm menu"
        @mouseenter="handleMouseEnterHeader(header.code)"
        @mouseleave="handleMouseLeaveHeader"
        @click="handleHeaderClick(header)"
        :class="{ 'accentuate': (selectedHeaderTemp === header.code), 'selected': arrowsStyle.header[header.code] !== 'lightgrey'}"
      >
        <div class="instrument-heading-wrap">
          <p class="instrument-heading-text">{{header.name}}</p>
          <p
            class="instrument-heading-bar"
            :style="{ 'background-color': header.colour }"
          ></p>           
        </div>

        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="arrow-alt-down"
          role="img"
          viewBox="0 0 448 512"
          class="arrow-top"
        >

          <path
            :style="{ 'fill': arrowsStyle.header[header.code]}"
            d="M176 32h96c13.3 0 24 10.7 24 24v200h103.8c21.4 0 32.1 25.8 17 41L241 473c-9.4 9.4-24.6 9.4-34 0L31.3 297c-15.1-15.1-4.4-41 17-41H152V56c0-13.3 10.7-24 24-24z" class=""
          ></path>
      </svg>
      </div>
    </div>

    <!-- lateral ecosystem 0y-->
    <div class="row pad-bot-10" v-if="dataLoaded">

      <!-- ecosystem-heading -->
      <div class="col-4 ecosystem-heading">

        <div class="ecosystem-heading-content">
          <div 
            v-for="ecosystemItem in biseEco"
            v-if="ecosystemItem.type != 'header'"
            class="ecosystem-item"
            @mouseenter="handleMouseEnterEco(ecosystemItem.code)"
            @mouseleave="handleMouseLeaveEco"
            @click="handleEcoClick(ecosystemItem)"
            :class="{ 'accentuate': (selectedEcoTemp === ecosystemItem.code), 'selected': arrowsStyle.eco[ecosystemItem.code] !== 'lightgrey'}"
          >
            <div class="ecosystem-wrap">
              <p class="ecosystem-text">{{ecosystemItem.name}}</p>
            </div>
            <svg 
              aria-hidden="true"
              data-prefix="fas"
              data-icon="arrow-alt-right"
              role="img"
              viewBox="0 0 448 512"
              class="arrow-right"
            >

              <path
                :style="{ 'fill': arrowsStyle.eco[ecosystemItem.code]}"
                d="M0 304v-96c0-13.3 10.7-24 24-24h200V80.2c0-21.4 25.8-32.1 41-17L441 239c9.4 9.4 9.4 24.6 0 34L265 448.7c-15.1 15.1-41 4.4-41-17V328H24c-13.3 0-24-10.7-24-24z" class=""
              ></path>
            </svg>

          </div>
          <div class="ecosystem-item" v-else>
            <div class="ecosystem-wrap header"
              :class="ecosystemClass(ecosystemItem.code)"
              @click="ecosystemItemFunction(ecosystemItem.code)"
            >
            <div class="ecosystem-text">
               {{ecosystemItem.name}}
            </div>
          </div>
          </div>

        </div>
      </div>
      
      <!-- the table -->
      <the-table v-show="showTable()">
        <div
          v-for="header in biseHeader"
          class="col-1-sm menu"
          :style="{ 'background-color': header.colour }"
          :class="{ 'accentuate': (selectedHeader === header.code)}"
        >
          <ul>
            <li
              v-for="ecosystemItem in biseEco"
              :class="{
                'highlight-li': (selectedEcoTemp === ecosystemItem.code) || (selectedHeaderTemp === header.code),
                'not-visible': !bise[header.code][ ecosystemItem.code]
              }"
              @click="handleSelected(header.code,  ecosystemItem.code)"
            ></li>
          </ul>
        </div>        
      </the-table>

      <the-item v-if="selectedItem">
        <div class="row">
          <div class="item">

            <div class="wrapper-item">
              <div 
                v-if="showClassNameIndicator()"
                class="col-2"
              >
                Class
              </div>
              <div class="col-10">Indicator</div>
            </div>

            <div class="jumbotron">
              <div
                v-for="itemClass in selectedItem.details.class"
                class="detail clearfix"
              >
                <div class="col-12">
                  <div class="lead col-2">
                    <p>{{itemClass.name}}</p>
                  </div>
                  <ul class="col-10">
                    <li 
                      v-for="(indicatorValue, indicatorKey) in itemClass.indicator"
                      @click="handleClickIndicator(indicatorValue, indicatorKey)"
                      class="indicator-li"
                      :style="{ 'font-weight': indicatorValue.bold ? 'bold' : 'normal'}"
                      :class="{ 'selected-indicator': selectedIndicators[indicatorKey] }"
                    >{{indicatorValue.name}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              v-for="(indicatorValue, indicatorKey) in selectedIndicators"
              class="modal col-6"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{indicatorValue.name}}</h5>
                  </div>
                  <div class="modal-body">
                    <ul class="col-10">
                      <li
                        v-for="policy in allPolicies"
                        v-if="(indicatorValue.data[policy.code]) && policy.code !== 'policyUse' && policy.code !== 'data'"
                      >
                        <svg
                          v-if="policy.code !== 'policyUse' && policy.code !== 'data'"
                          class="icon-svg"
                        >
                          <use :href="'#' + showIcon(indicatorValue.data[policy.code].value, policy.code)" />
                        </svg>

                        <span>{{policy.name}}</span>
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </the-item>

      <the-eco-selection v-if="ecoLine === 'condition'">
        <div class="row">
          <div class="item" style="padding: 0;overflow: hidden;border: none;">

            <div class="card">
              <button
                class="btn primary large-btn left"
                @click="handleSelectedWaterEcoCondition()"
              >
                Terrestrial and freshwater
              </button>
              <button
                class="btn primary large-btn right"
                @click="handleSelectedMarineEcoCondition()"
              >
                Marine
              </button>
            </div>

          </div>
        </div>
      </the-eco-selection>

      <the-eco-selection v-if="ecoLine === 'services'">
        <div class="row">
          <div class="item" style="padding: 0;overflow: hidden;border: none;">

            <div class="card">
              <button
                class="btn primary large-btn"
                @click="handleSelectedWaterEcoServices()"
              >
                Indicators for ecosystem services delivered by freshwater ecosystems
              </button>
              <button
                class="btn primary large-btn"
                @click="handleSelectedMarineEcoServices()"
              >
                Indicators for ecosystem services delivered by marine ecosystems
              </button>
              <button
                class="btn primary large-btn"
                @click="handleSelectedTotalServices()"
              >
                Total number and break-down of ecosystem services indicators
              </button>
              <button
                class="btn primary large-btn"
                @click="handleSelectedAvailableServices()"
              >
                Available indicators for assessment of ecosystem services across different ecosystems
              </button>
              <button
                class="btn primary large-btn"
                @click="handleSelectedUrbanServices()"
              >
                Key urban ecosystem services
              </button>
            </div>

          </div>
        </div>
      </the-eco-selection>

      <the-eco-marine_services-selection v-if="ecoLine === 'marine_service'">
         <div v-html="tables.marine" id="marineService">
            
         </div>
      </the-eco-marine_services-selection>

      <the-eco-available_services-selection v-if="ecoLine === 'available_service'">
         <div v-html="tables.available" id="availableService">

         </div>
      </the-eco-available_services-selection>

      <the-eco-total_service-selection v-if="ecoLine === 'total_service'">
         <div v-html="tables.total" id="totalService">

         </div>
      </the-eco-total_service-selection>

      <the-eco-urban_service-selection v-if="ecoLine === 'urban_service'">
         <div v-html="tables.urban" id="urbanService">

         </div>
      </the-eco-urban_service-selection>

      <the-eco-water_services-selection v-if="ecoLine === 'water_service'">
         <div v-html="tables.water" id="waterService">

         </div>
      </the-eco-water_services-selection>

      <the-eco-pressure-selection v-if="ecoLine === 'pressure'">
        <div class="row">
          <div class="item">

            <div class="jumbotron">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Indicator</th>
                    <th v-for="header in biseHeader.slice(0,biseHeader.length-1)">{{header.abbreviation}}</th>
                  </tr>
                </thead>

                <tbody v-for="classItem in pressures">
                  <tr v-for="(indicatorValue, indicatorKey) in classItem.indicator">

                    <td 
                      v-if="computeClassNames(classItem.code, indicatorKey)"
                      :rowspan="Object.keys(classItem.indicator).length"
                    >{{classItem.name}}
                    </td>

                    <td class="indicators">
                      {{indicatorValue.name}}
                    </td>

                    <td v-for="header in biseHeader.slice(0,biseHeader.length-1)">
                      <span 
                        class="bullet"
                        @click="handleSelectedBullet(header.code, indicatorKey, classItem)"
                      >{{doBullets(pressureOnAllHeaders[indicatorKey][header.code])}}
                      </span>
                    </td>
                   
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-for="(indicatorValue, indicatorKey) in selectedIndicators"
              class="modal col-6"
            >
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">{{indicatorValue.name}}</h5>
                  </div>

                  <div class="modal-body">
                    <ul class="col-10">
                      <li
                        v-for="policy in allPolicies"
                        v-if="(indicatorValue.data[policy.code]) && policy.code !== 'policyUse' && policy.code !== 'data'"
                      >
                        <svg
                          v-if="policy.code !== 'policyUse' && policy.code !== 'data'"
                          class="icon-svg"
                        >
                          <use :href="'#' + showIcon(indicatorValue.data[policy.code].value, policy.code)" />
                        </svg>

                        <span>{{policy.name}}</span>
                    </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </the-eco-pressure-selection>

      <the-eco-water-selection v-if="ecoLine === 'water'">
        <div class="row">
          <div class="item">

            <div class="jumbotron">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Indicator</th>
                    <th v-for="header in biseHeader.slice(0, biseHeader.length-1)">{{header.abbreviation}}</th>
                  </tr>
                </thead>

                <tbody v-for="classItem in waterEcosystem">
                  <tr v-for="(indicatorValue, indicatorKey) in classItem.indicator">

                    <td 
                      v-if="computeClassNames(classItem.code, indicatorKey)"
                      :rowspan="Object.keys(classItem.indicator).length"
                    >{{classItem.name}}
                    </td>

                    <td class="indicators">
                      {{indicatorValue.name}}
                    </td>

                    <td v-for="header in biseHeader.slice(0,biseHeader.length-1)">
                      <span 
                        class="bullet"
                        @click="handleSelectedBullet(header.code, indicatorKey, classItem)"
                      >{{doBullets(waterEcosystemOnAllHeaders[indicatorKey][header.code])}}
                      </span>
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-for="(indicatorValue, indicatorKey) in selectedIndicators"
              class="modal col-6"
            >
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">{{indicatorValue.name}}</h5>
                  </div>

                  <div class="modal-body">
                    <ul class="col-10">
                      <li
                        v-for="policy in allPolicies"
                        v-if="(indicatorValue.data[policy.code]) && policy.code !== 'policyUse' && policy.code !== 'data'"
                      >
                        <svg
                          v-if="policy.code !== 'policyUse' && policy.code !== 'data'"
                          class="icon-svg"
                        >
                          <use :href="'#' + showIcon(indicatorValue.data[policy.code].value, policy.code)" />
                        </svg>

                        <span>{{policy.name}}</span>
                    </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </the-eco-water-selection>

      <the-eco-marine-selection v-if="ecoLine === 'marine'">
        <div class="row">
          <div class="item">

            <div class="jumbotron">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Indicator</th>
                    <th v-for="header in marineHeaders">{{header.abbreviation}}</th>
                  </tr>
                </thead>

                <tbody v-for="classItem in marineEcosystem">
                  <tr v-for="(indicatorValue, indicatorKey) in classItem.indicator">

                    <td 
                      v-if="computeClassNames(classItem.code, indicatorKey)"
                      :rowspan="Object.keys(classItem.indicator).length"
                    >{{classItem.name}}
                    </td>

                    <td class="indicators">
                      {{indicatorValue.name}}
                    </td>

                    <td v-for="header in marineHeaders">
                      <span 
                        class="bullet"
                        @click="handleSelectedBullet(header.code, indicatorKey, classItem)"
                      >{{doBullets(marineEcosystemOnAllHeaders[indicatorKey][header.code])}}
                      </span>
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              v-for="(indicatorValue, indicatorKey) in selectedIndicators"
              class="modal col-6"
            >
              <div class="modal-dialog">
                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title">{{indicatorValue.name}}</h5>
                  </div>

                  <div class="modal-body">
                    <ul class="col-10">
                      <li
                        v-for="policy in allPolicies"
                        v-if="(indicatorValue.data[policy.code]) && policy.code !== 'policyUse' && policy.code !== 'data'"
                      >
                        <svg
                          v-if="policy.code !== 'policyUse' && policy.code !== 'data'"
                          class="icon-svg"
                        >
                          <use :href="'#' + showIcon(indicatorValue.data[policy.code].value, policy.code)" />
                        </svg>

                        <span>{{policy.name}}</span>
                    </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </the-eco-marine-selection>

      <the-header-selection v-if="selectedHeaderItem">
        <div class="row">
          <div class="item">

            <div class="wrapper-item">
              <div class="col-2">
                Class
              </div>
              <div class="col-10">Indicator</div>
            </div>

            <div class="jumbotron">
              <div
                v-if="selectedHeaderItem[ecoItem.code] !== undefined"
                v-for="ecoItem in biseEco"
                class="detail clearfix"
              >
                <div
                  
                  v-for="itemClass in selectedHeaderItem[ecoItem.code].details.class" class="col-12"
                >
                  <div class="lead col-2">
                    <p>{{itemClass.name}}</p>
                  </div>
                  <ul class="col-10">
                    <li
                      v-for="(indicatorValue, indicatorKey) in itemClass.indicator"
                      @click="handleClickIndicator(indicatorValue, indicatorKey)"
                      class="indicator-li"
                      :style="{ 'font-weight': indicatorValue.bold ? 'bold' : 'normal'}"
                      :class="{ 'selected-indicator': selectedIndicators[indicatorKey] }"
                    >{{indicatorValue.name}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              v-for="(indicatorValue, indicatorKey) in selectedIndicators"
              class="modal col-6"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{indicatorValue.name}}</h5>
                  </div>
                  <div class="modal-body">
                    <ul class="col-10">
                      <li
                        v-for="policy in allPolicies"
                        v-if="(indicatorValue.data[policy.code]) && policy.code !== 'policyUse' && policy.code !== 'data'"
                      >
                        <svg
                          v-if="policy.code !== 'policyUse' && policy.code !== 'data'"
                          class="icon-svg"
                        >
                          <use :href="'#' + showIcon(indicatorValue.data[policy.code].value, policy.code)" />
                        </svg>

                        <span>{{policy.name}}</span>
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </the-header-selection>
  </div>
  </div>
</template>

<script>

import axios from 'axios';
import tables from './assets/tables.js'

const notSelectedColour = 'lightgrey';
const selectedColour = '#f35555';
let displayedClassNames = {};

export default {
  name: 'app',
  data() {
    return {
    tables,
    notSelectedColour,
    selectedColour,
    bise: null,
    biseEco: null,
    biseHeader: null,
    marineHeaders: null,
    allPolicies: null,
    selectedHeaderTemp: null,
    selectedHeader: null,
    selectedEcoTemp: null,
    selectedEco: '',
    selectedItem: null,
    selectedHeaderItem: null,
    selectedEcoItem: [],
    selectedIndicators: {},
    pressures: null,
    pressureOnAllHeaders: null,
    waterEcosystem: null,
    waterEcosystemOnAllHeaders: null,
    marineEcosystem: null,
    marineEcosystemOnAllHeaders: null,
    mustSelectLandOrWater: false,
    arrowsStyle: { header: {}, eco: {} },
    ecoLine: null,
  }
},

  created() {
      this.tables = tables;
      axios
      .get(process.env.BASE_URL + "data.json")
      .then(response => {
        this.bise = response.data.bise;
        this.biseEco = response.data.biseEco;
        this.biseHeader = response.data.biseHeader;
        this.marineHeaders = response.data.marineHeaders;
        this.allPolicies = response.data.allPolicies;
        this.pressures = response.data.pressures;
        this.waterEcosystem = response.data.waterEcosystem;
        this.marineEcosystem = response.data.marineEcosystem;
        this.pressureOnAllHeaders = response.data.pressureOnAllHeaders;
        this.marineEcosystemOnAllHeaders = response.data.marineEcosystemOnAllHeaders;
        this.waterEcosystemOnAllHeaders = response.data.waterEcosystemOnAllHeaders;

        this.initArrowStyles();
      })
      .catch(e => {
        console.log(e);
      })
      
  },

  methods: {
    dataLoaded() {
      return 
        this.bise && 
        this.biseEco && 
        this.biseHeader && 
        this.marineHeaders &&
        this.allPolicies &&
        this.pressures &&
        this.waterEcosystem &&
        this.marineEcosystem &&
        this.pressureOnAllHeaders &&
        this.waterEcosystemOnAllHeaders &&
        this.marineEcosystemOnAllHeaders;
    },

    ecosystemItemFunction(code) {
      switch (code) {
        case 'pressure_header':
          this.handleEcoPressureLineClick()
          break;
        case 'ecosystem_header':
          this.handleEcoConditionLineClick();
          break;
        case 'services_header':
          this.handleEcoServicesLineClick();
          break;
        default:
          // statements_def
          break;
      }
    },

    ecosystemClass(code) {
      switch (code) {
        case 'pressure_header':
          if(this.ecoLine === 'pressure'){
            return 'selected'
          }
          break;
        case 'ecosystem_header':
          if(this.ecoLine === 'condition'){
            return 'selected'
          }
          break;
        case 'services_header':
          if(['services', 'water_service', 'marine_service', 'available_service'].includes(this.ecoLine)) {
            return 'selected'
          }
          break;
        default:
          // statements_def
          break;
      }
    },

    initArrowStyles() {
      this.biseEco.map((eco) => {
        this.arrowsStyle.eco[eco.code] = notSelectedColour;
      });
      this.biseHeader.map((header) => {
        this.arrowsStyle.header[header.code] = notSelectedColour;
      });
    },

    manageArrows(expr, ecoItem, headerItem) {
      let tempArrowStyle = JSON.parse(JSON.stringify(this.arrowsStyle));
      switch (expr) {
        case 'colourAllHeaders':
          Object.keys(tempArrowStyle.header).map((key) => {
            if(key !== 'marine') {
              tempArrowStyle.header[key] = selectedColour;
            }
          });
          tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
          case 'colourOnlyUrban':
            Object.keys(tempArrowStyle.header).map((key) => {
              if(key === 'urban') {
                tempArrowStyle.header[key] = selectedColour;
              }
            });
            tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
          case 'colourAllAllHeaders':
            Object.keys(tempArrowStyle.header).map((key) => {
                tempArrowStyle.header[key] = selectedColour;
            });
            tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
        case 'colourAllWaterHeaders':
          Object.keys(tempArrowStyle.header).map((key) => {

            if(key === 'marine') {
              tempArrowStyle.header[key] = notSelectedColour;
            } else {
              tempArrowStyle.header[key] = selectedColour;
            }

          });
          tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
        case 'colourOnlyWaterHeaders':
          Object.keys(tempArrowStyle.header).map((key) => {

            if(['rivers','wetland'].includes(key)) {
              tempArrowStyle.header[key] = selectedColour;
            } else {
              tempArrowStyle.header[key] = notSelectedColour;
            }

          });
          tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
        case 'colourAllMarineHeaders':
          Object.keys(tempArrowStyle.header).map((key) => {
            if(key === 'marine') {
              tempArrowStyle.header[key] = selectedColour;
            } else {
              tempArrowStyle.header[key] = notSelectedColour;
            }
          });
          tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
        case 'colourAllEco':
          Object.keys(tempArrowStyle.eco).map((key) => {
            tempArrowStyle.eco[key] = selectedColour;
          });
          tempArrowStyle.header[headerItem] = selectedColour;
          break;
        case 'colourAllEcoNoPressure':
          Object.keys(tempArrowStyle.eco).map((key) => {
            if(!['pressure','pressure_header'].includes(key))
              tempArrowStyle.eco[key] = selectedColour;
          });
          tempArrowStyle.header[headerItem] = selectedColour;
          break;
        case 'colourOnlyTwo':
          tempArrowStyle.eco[ecoItem] = selectedColour;
          tempArrowStyle.header[headerItem] = selectedColour;
          break;

        case 'colourOnlyOne':
          tempArrowStyle.eco[ecoItem] = selectedColour;
          break;
        case 'resetAll':
          Object.keys(tempArrowStyle.header).map((key) => {
            tempArrowStyle.header[key] = notSelectedColour;
          })
          Object.keys(tempArrowStyle.eco).map((key) => {
            tempArrowStyle.eco[key] = notSelectedColour;
          })
          break;
        default:
      }

      this.arrowsStyle = Object.assign({}, tempArrowStyle);
    },

    handleHeaderClick(ev) {
      this.resetSelected();
      this.manageArrows('colourAllEco', null, ev.code);
      this.selectedHeaderItem = this.bise[ev.code];
    },

    // TODO refactor
    handleEcoClick(ev) {
      let result = [];
      this.selectedEco = ev.code;
      this.resetSelected();

      Object.keys(this.bise).map((value) => {
        result.push(this.bise[value]);
      });
      
      this.ecoLine = ev.code === 'pressure' ? 'pressure' : 'condition';
      this.selectedEcoItem = result.slice();        
    },

    handleEcoPressureLineClick() {
      this.resetSelected();
      this.ecoLine = 'pressure';
      this.manageArrows('colourAllHeaders', 'pressure', null);
    },

    handleEcoServicesLineClick(){
      this.resetSelected();
      this.ecoLine = 'services';
    },

    handleEcoConditionLineClick() {
      this.resetSelected();
      this.manageArrows('colourAllEcoNoPressure', null);
      this.ecoLine = 'condition';
    },

    handleSelectedWaterEcoCondition() {
      this.manageArrows('colourAllWaterHeaders', this.selectedEco, null);
      this.ecoLine = 'water';
    },

    handleSelectedMarineEcoCondition() {
      this.manageArrows('colourAllMarineHeaders', this.selectedEco, null);
      this.ecoLine = 'marine';
    },

    handleSelectedWaterEcoServices(){
      this.manageArrows('colourOnlyWaterHeaders', this.selectedEco, null);
      this.ecoLine = 'water_service';
    },

    handleSelectedMarineEcoServices(){
      this.manageArrows('colourAllMarineHeaders', this.selectedEco, null);
      this.ecoLine = 'marine_service';
    },

    handleSelectedTotalServices(){
      this.manageArrows('colourAllAllHeaders', this.selectedEco, null);
      this.ecoLine = 'total_service';
    },

    handleSelectedAvailableServices(){
      this.manageArrows('colourAllAllHeaders', this.selectedEco, null);
      this.ecoLine = 'available_service';
    },

    handleSelectedUrbanServices(){
      this.manageArrows('colourOnlyUrban', this.selectedEco, null);
      this.ecoLine = 'urban_service';
    },

    handleMouseEnterHeader(ev) {
      this.selectedHeaderTemp = ev;
    },

    handleMouseLeaveHeader() {
      this.selectedHeaderTemp = null;
    },

    handleMouseEnterEco(ev) {
      this.selectedEcoTemp = ev;
    },

    handleMouseLeaveEco() {
      this.selectedEcoTemp = null;
    },

    handleSelected(key, ecosysKey) {
      this.resetSelected();
      this.manageArrows('colourOnlyTwo', ecosysKey, key)
      this.selectedItem = this.bise[key][ecosysKey];
      this.selectedEco = ecosysKey;
      this.selectedHeader = key;
      this.selectedColour = selectedColour;      
    },

    handleClickIndicator(indicatorValue, indicatorKey) {
      let theObj = {};

      theObj[indicatorKey] = indicatorValue;
      if(this.selectedIndicators[indicatorKey]) {
        Vue.delete(this.selectedIndicators, indicatorKey)  
      }
       else {
        this.selectedIndicators = Object.assign({}, this.selectedIndicators, theObj);
        this.$nextTick(function(){
          let modal = document.querySelector('.modal.col-6')
          modal.scrollIntoView();
        })  
      }
    },

    handleSelectedBullet(headerKey, indicatorKey, classItem) {
      let pressureInHeader = this.bise[headerKey].pressure.details.class;
      let response = null;

      for (let i = 0; i < pressureInHeader.length; i++) {
        const pressureClass = pressureInHeader[i];
        if(pressureClass.code === classItem.code) {
          response = pressureClass.indicator[indicatorKey];
          break;
        }
      }

      if(response) {
        this.handleClickIndicator(response, indicatorKey);
      }
    },

    resetSelected() {
      this.manageArrows('resetAll');
      displayedClassNames = {};
      this.selectedItem = null;
      this.selectedHeader = null;
      this.selectedHeaderItem = null;
      this.selectedEco = null;
      this.ecoLine = null;
      this.selectedEcoItem = [];
      this.selectedIndicators = Object.assign({}, {});
      this.selectedColour = notSelectedColour;
    },

    showClassNameIndicator() {
      for (let i = 0; i < this.selectedItem.details.class.length; i++) {
        const element = this.selectedItem.details.class[i];
        if(element.name) {
          return true;
        }
      }
      return false;
    },

    showTable() {
      let response = !this.selectedItem && !this.selectedHeaderItem && !this.selectedEcoItem.length > 0;
      response = !this.ecoLine && response;

      return response;
    },

    computeClassNames(className, indicatorName) {
      let result = false;

      if(displayedClassNames[className]) {
        result = displayedClassNames[className][indicatorName];
      } else {
        displayedClassNames[className] = {};
        displayedClassNames[className][indicatorName] = true;
        result = true;
      }

      return result;
    },

    doBullets(header){
      if(header) return '•'
      else return ''
    },

    showIcon(policyData, policyCode) {
      if(policyCode !== 'policyUse' && policyCode !== 'data') {
        if(parseInt(policyData) === 1) {
          return 'check-circle';
        }
        if(parseInt(policyData) === 0) {
          return 'times-circle';
        }
      }
      return '';
    },
  }
};

</script>

<style>

* {
  box-sizing: border-box;
}
body {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #34495e;
  background-color: #fff;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}
[class*="col-"] {
  float: left;
}
.col-1-sm {width: 6.33%;}
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-9-sm {width: 70%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}
.pad-bot-10 {padding-bottom: 10px;}

.menu-left {
  text-align: center;
  color: #fa8302;
  font-size: 18px;
}
.menu {
  margin-left: 10px;
  text-align: center;
}
.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.menu li {
  margin: 15px;
  background-color: white;
  opacity: 0.3;
  color: black;
  box-shadow: 0 2px 1px rgba(0,0,0,0.32), 0 1px 1px rgba(0,0,0,1);
  border-radius: 5px;
  height: 60px;
}
.menu>p {
  margin: 0;
}
.menu li:hover {
  opacity: 0.7;
}
.highlight-li {
  opacity: 0.7 !important;
}
.hide {
  visibility: hidden;
}
.not-visible {
  visibility: hidden;
}
.bold-font {
  font-weight: bold;
}
.instrument-heading-wrap {
  border:1px solid white;
  border-radius: 5px;
}
.instrument-heading-wrap:hover {
  border: 1px solid lightgrey;
  border-radius: 5px;
}
.instrument-heading-wrap:hover .instrument-heading-bar{
  visibility: hidden;
}
.instrument-heading-bar {
  border-radius: 5px;
  padding: 8px;
}
.selected .instrument-heading-bar {
  visibility: hidden;
}
.instrument-heading-text {
  min-height: 70px;
  bottom: 0;
  padding-top: 20px;
}
.ecosystem-heading ul{
  list-style-type: none;
  margin: 0;
}
.ecosystem-heading li{
  margin-bottom: 7px;
  background-color: white;
  opacity: 0.3;
  color: black;
  box-shadow: 0 2px 1px rgba(0,0,0,0.32), 0 1px 1px rgba(0,0,0,1);
  border-radius: 5px;
  height: 50px;
}
.ecosystem-item {
  margin: 15px;
  height: 60px;
  overflow: hidden;
  position: relative;
}
.ecosystem-wrap {
  border: 1px solid white;
  border-radius: 5px;
  width: 80%;
  height: 100%;
  float: left;
  margin-left: 30px;
}
.ecosystem-wrap:hover {
  border: 1px solid lightgrey;
  border-radius: 5px;
}
.ecosystem-wrap:hover .ecosystem-bar{
  visibility: hidden;
}
.ecosystem-bar {
  margin: 3px;
  background-color: white;
  opacity: 0.3;
  color: black;
  box-shadow: 0 2px 1px rgba(0,0,0,0.32), 0 1px 1px rgba(0,0,0,1);
  border-radius: 5px;
  height: 90%;
  padding: 0;
}
.selected .ecosystem-bar {
  visibility: hidden;
}
.ecosystem-text {
  margin-top: 0;
  width: 90%;
  float: left;
  padding: 15px;
  cursor: pointer;
}
.ecosystem-heading-content {
  margin: 0;
  padding: 0;
}
.selected .ecosystem-wrap,
.selected .instrument-heading-wrap,
.selected.lateral-text-ontop,
.selected.lateral-text-onbottom
{
  background-color: #f35555;
  color: white;
  border: 1px solid lightgrey!important;
}
.item {
  border-radius: 5px;
  text-align: center;
  border:1px solid #a6a6a64d;
  box-shadow: 2px 1px 4px lightgrey;
  padding: 15px;
  width: calc(9*(6.33% + 10px));
  float: left;
}
.wrapper-item {
  padding-bottom: 50px;
  font-size: 1.5rem;
}
.detail {
  min-height: 150px;
  border-bottom: 1px solid #c4bfb6;
  overflow: hidden;
}
.detail:last-child {
  border-bottom: none;
}
.detail ul{
  list-style-type: none;
  margin: 0;
}
.indicator-li {
  font-weight: 300;
  margin: 5px;
  padding: 5px;
  min-height: 30px;
  text-align: left;
}
.indicator-li::after {
  display: block;
  font-weight: bold;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.selected-indicator {
  font-weight: 300;
  background-color: #f25555;
  padding: 5px;
  border-radius: 2.3rem;
  border-bottom: 1px solid #c4bfb6;
  color: white;
}

/* bootstrap */
@media (min-width: 576px) {
  .jumbotron {
    padding: 4rem 2rem;
  }
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
}
.jumbotron {
  padding: 2rem 1rem;
  background-color: #e9bf6c33;
  border-radius: .3rem;
  border: 2px solid #80808070;
}
.display-4 {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
}
.lead {
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
}
.mb-4, .my-4 {
  margin-bottom: 1.5rem!important;
}
.mt-4, .my-4 {
  margin-top: 1.5rem!important;
}
.clearfix {
  clear: both;
}
.clearfix:after {
  clear: both; 
  content: "";
  display: table; 
}

.modal {
  display: block;
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  outline: 0;
  padding: 0;
  padding-right: 10px;
}
.modal:last-child {
  padding-right: 0;
}
.modal-dialog {
  position: relative;
  width: auto;
  pointer-events: none;
}
.modal-content {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .3rem;
  outline: 0;
}
.modal-header {
  border-bottom: 1px solid #e9ecef;
  background-color: #f25555;
  color: white;
}
.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
  background-color: #e9bf6c33;
}
.modal-body ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.modal-body li {
  text-align: left;
  padding: 5px;
}

.arrow-right {
  margin-left: 22px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.arrow-top {
  height: 30px;
  margin-top: 15px;
}
.icon-svg {
  height: 15px;
  width: 15px;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.btn {
  text-decoration: none !important;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-outline-primary {
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
button, select {
  text-transform: none;
}
button, input {
  overflow: visible;
}
button{
  font: inherit;
  margin: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.lateral-text-wrapper {
  display: block;
  position: relative;
  margin-top: calc(5rem + 10px);
}

.lateral-text {
  writing-mode: vertical-lr;
  font-size: 36px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
}

.lateral-text-ontop {
  position: absolute;
  top: -11rem;
}
.lateral-text-onbottom {
  height: calc(6*(60px + 15px));
}



/*table styles*/
.shadow-z-1 {
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
}
/* -- Material Design Table style -------------- */
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 2rem;
  font-size: .8rem;
  border-collapse: collapse;
}
.table > thead > tr,
.table > tbody > tr,
.table > tfoot > tr {
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  text-align: left;
  padding: .5rem;
  vertical-align: top;
  border-top: 0;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.table > thead > tr > th {
  font-weight: 400;
  color: #757575;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  font-size: .75rem;
  vertical-align: middle;
  text-align: center;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.table .table {
  background-color: #fff;
}
.table .no-border {
  border: 0;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 0.8rem;
}
.table-bordered {
  border: 0;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 0;
  border-bottom: 1px solid #e0e0e0;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th {
  background-color: rgba(0, 0, 0, 0.12);
}
@media screen and (max-width: 768px) {
  .table-responsive-vertical > .table {
    margin-bottom: 0;
    background-color: transparent;
  }
  .table-responsive-vertical > .table > thead,
  .table-responsive-vertical > .table > tfoot {
    display: none;
  }
  .table-responsive-vertical > .table > tbody {
    display: block;
  }
  .table-responsive-vertical > .table > tbody > tr {
    display: block;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    margin-bottom: 1.6rem;
  }
  .table-responsive-vertical > .table > tbody > tr > td {
    background-color: #fff;
    display: block;
    vertical-align: middle;
    text-align: right;
  }
  .table-responsive-vertical > .table > tbody > tr > td[data-title]:before {
    content: attr(data-title);
    float: left;
    font-size: inherit;
    font-weight: 400;
    color: #757575;
  }
  .table-responsive-vertical.shadow-z-1 {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .table-responsive-vertical.shadow-z-1 > .table > tbody > tr {
    border: none;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
  }
  .table-responsive-vertical > .table-bordered {
    border: 0;
  }
  .table-responsive-vertical > .table-bordered > tbody > tr > td {
    border: 0;
    border-bottom: 1px solid #e0e0e0;
  }
  .table-responsive-vertical > .table-bordered > tbody > tr > td:last-child {
    border-bottom: 0;
  }
  .table-responsive-vertical > .table-striped > tbody > tr > td,
  .table-responsive-vertical > .table-striped > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical > .table-striped > tbody > tr > td:nth-child(odd) {
    background-color: #f5f5f5;
  }
  .table-responsive-vertical > .table-hover > tbody > tr:hover > td,
  .table-responsive-vertical > .table-hover > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical > .table-hover > tbody > tr > td:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
}
.table-striped.table-mc-red > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-red > tbody > tr:nth-child(odd) > th {
  background-color: #fde0dc;
}
.table-hover.table-mc-red > tbody > tr:hover > td,
.table-hover.table-mc-red > tbody > tr:hover > th {
  background-color: #f9bdbb;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td:nth-child(odd) {
    background-color: #fde0dc;
  }
  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr > td:hover {
    background-color: #f9bdbb;
  }
}
.table-striped.table-mc-pink > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-pink > tbody > tr:nth-child(odd) > th {
  background-color: #fce4ec;
}
.table-hover.table-mc-pink > tbody > tr:hover > td,
.table-hover.table-mc-pink > tbody > tr:hover > th {
  background-color: #f8bbd0;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td:nth-child(odd) {
    background-color: #fce4ec;
  }
  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr > td:hover {
    background-color: #f8bbd0;
  }
}
.table-striped.table-mc-purple > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-purple > tbody > tr:nth-child(odd) > th {
  background-color: #f3e5f5;
}
.table-hover.table-mc-purple > tbody > tr:hover > td,
.table-hover.table-mc-purple > tbody > tr:hover > th {
  background-color: #e1bee7;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td:nth-child(odd) {
    background-color: #f3e5f5;
  }
  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr > td:hover {
    background-color: #e1bee7;
  }
}
.table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > th {
  background-color: #ede7f6;
}
.table-hover.table-mc-deep-purple > tbody > tr:hover > td,
.table-hover.table-mc-deep-purple > tbody > tr:hover > th {
  background-color: #d1c4e9;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td:nth-child(odd) {
    background-color: #ede7f6;
  }
  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr > td:hover {
    background-color: #d1c4e9;
  }
}
.table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > th {
  background-color: #e8eaf6;
}
.table-hover.table-mc-indigo > tbody > tr:hover > td,
.table-hover.table-mc-indigo > tbody > tr:hover > th {
  background-color: #c5cae9;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td:nth-child(odd) {
    background-color: #e8eaf6;
  }
  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr > td:hover {
    background-color: #c5cae9;
  }
}
.table-striped.table-mc-blue > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-blue > tbody > tr:nth-child(odd) > th {
  background-color: #e7e9fd;
}
.table-hover.table-mc-blue > tbody > tr:hover > td,
.table-hover.table-mc-blue > tbody > tr:hover > th {
  background-color: #d0d9ff;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td:nth-child(odd) {
    background-color: #e7e9fd;
  }
  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr > td:hover {
    background-color: #d0d9ff;
  }
}
.table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > th {
  background-color: #e1f5fe;
}
.table-hover.table-mc-light-blue > tbody > tr:hover > td,
.table-hover.table-mc-light-blue > tbody > tr:hover > th {
  background-color: #b3e5fc;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td:nth-child(odd) {
    background-color: #e1f5fe;
  }
  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr > td:hover {
    background-color: #b3e5fc;
  }
}
.table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > th {
  background-color: #e0f7fa;
}
.table-hover.table-mc-cyan > tbody > tr:hover > td,
.table-hover.table-mc-cyan > tbody > tr:hover > th {
  background-color: #b2ebf2;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td:nth-child(odd) {
    background-color: #e0f7fa;
  }
  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr > td:hover {
    background-color: #b2ebf2;
  }
}
.table-striped.table-mc-teal > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-teal > tbody > tr:nth-child(odd) > th {
  background-color: #e0f2f1;
}
.table-hover.table-mc-teal > tbody > tr:hover > td,
.table-hover.table-mc-teal > tbody > tr:hover > th {
  background-color: #b2dfdb;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td:nth-child(odd) {
    background-color: #e0f2f1;
  }
  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr > td:hover {
    background-color: #b2dfdb;
  }
}
.table-striped.table-mc-green > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-green > tbody > tr:nth-child(odd) > th {
  background-color: #d0f8ce;
}
.table-hover.table-mc-green > tbody > tr:hover > td,
.table-hover.table-mc-green > tbody > tr:hover > th {
  background-color: #a3e9a4;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td:nth-child(odd) {
    background-color: #d0f8ce;
  }
  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr > td:hover {
    background-color: #a3e9a4;
  }
}
.table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > th {
  background-color: #f1f8e9;
}
.table-hover.table-mc-light-green > tbody > tr:hover > td,
.table-hover.table-mc-light-green > tbody > tr:hover > th {
  background-color: #dcedc8;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td:nth-child(odd) {
    background-color: #f1f8e9;
  }
  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr > td:hover {
    background-color: #dcedc8;
  }
}
.table-striped.table-mc-lime > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-lime > tbody > tr:nth-child(odd) > th {
  background-color: #f9fbe7;
}
.table-hover.table-mc-lime > tbody > tr:hover > td,
.table-hover.table-mc-lime > tbody > tr:hover > th {
  background-color: #f0f4c3;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td:nth-child(odd) {
    background-color: #f9fbe7;
  }
  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr > td:hover {
    background-color: #f0f4c3;
  }
}
.table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > th {
  background-color: #fffde7;
}
.table-hover.table-mc-yellow > tbody > tr:hover > td,
.table-hover.table-mc-yellow > tbody > tr:hover > th {
  background-color: #fff9c4;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td:nth-child(odd) {
    background-color: #fffde7;
  }
  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr > td:hover {
    background-color: #fff9c4;
  }
}
.table-striped.table-mc-amber > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-amber > tbody > tr:nth-child(odd) > th {
  background-color: #fff8e1;
}
.table-hover.table-mc-amber > tbody > tr:hover > td,
.table-hover.table-mc-amber > tbody > tr:hover > th {
  background-color: #ffecb3;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td:nth-child(odd) {
    background-color: #fff8e1;
  }
  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr > td:hover {
    background-color: #ffecb3;
  }
}
.table-striped.table-mc-orange > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-orange > tbody > tr:nth-child(odd) > th {
  background-color: #fff3e0;
}
.table-hover.table-mc-orange > tbody > tr:hover > td,
.table-hover.table-mc-orange > tbody > tr:hover > th {
  background-color: #ffe0b2;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td:nth-child(odd) {
    background-color: #fff3e0;
  }
  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr > td:hover {
    background-color: #ffe0b2;
  }
}
.table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > td,
.table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > th {
  background-color: #fbe9e7;
}
.table-hover.table-mc-deep-orange > tbody > tr:hover > td,
.table-hover.table-mc-deep-orange > tbody > tr:hover > th {
  background-color: #ffccbc;
}
@media screen and (max-width: 767px) {
  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td,
  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) {
    background-color: #fff;
  }
  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td:nth-child(odd) {
    background-color: #fbe9e7;
  }
  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover > td,
  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover {
    background-color: #fff;
  }
  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr > td:hover {
    background-color: #ffccbc;
  }
}

.table > thead > tr.first-header > th {
  font-weight: bold;
  color: black;
}


.bullet {
  font-size: 4rem;
  line-height: 10px;
  color: red;
}


.ecosystem-wrap.header.selected {
      background-color: #f35555;
    color: white;
    border: 1px solid lightgrey!important;
}

/*.menu li.not-visible:first-of-type {
      visibility: visible;
    padding: 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    background: white!important;
    opacity: 1!important;
    pointer-events: none;
}*/




.ecosystem-wrap.header {
  font-weight: bold;
    font-size: 1.3rem;
    background: none;
    border-bottom: 1px solid #eee;
    border-radius: 0;
    margin: 0;
    width: 100%;
    padding: 1rem;
}

.ecosystem-wrap.header:hover {
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  text-shadow: 1px 1px 3px #aaa;
  border-bottom-color: #f35555;
}

.header .ecosystem-text {
      padding: 0;
    width: 100%;
}

.menu li {
  cursor: pointer;
}

.large-btn {
  width: 100%;
  border-radius: 0;
  background: #eee;
  margin-bottom: .5rem;
}

.large-btn:last-of-type {
  margin-bottom: 0;
}

.large-btn.left {
    width: 50%;
    background: #ff9310;
    color: white;
  margin-bottom: 0;

    border-radius: 0;
}

.large-btn.right {
    width: 50%;
    background: #668dcc;
    color: white;
    float: right;
    border-radius: 0;
  margin-bottom: 0;

}

.large-btn:hover {
  text-shadow:  0px 0px 3px #444;
}

.table.no-empty td:empty {
  border-color: transparent!important;
}

.table.full-width td {
  min-width: 150px;
}

.jumbotron.full {
  background: #fcefda;
  overflow: auto;
}

.row.full {
  position: relative;
}


.item.full {
  position: absolute;
  width: 100%;
}

.table.full td > br{
  display: none;
}

.table.center tr td:not(:first-of-type) {
  text-align: center;
}

.table.top-border tr td {
      border-top: 1px solid #e0e0e0;
      border-bottom: none;
}

.table.middle tr td {
  vertical-align:  middle;
}

.table.full-width th {
    text-align: left;
}

.table.full-bordered td{
  border: 1px solid #e0e0e0;
}
</style>
