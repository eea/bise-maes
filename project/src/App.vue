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
        <!-- <path
          :style="{ 'fill': selectedHeader === header.code ? selectedColour : notSelectedColour}"
          d="M176 32h96c13.3 0 24 10.7 24 24v200h103.8c21.4 0 32.1 25.8 17 41L241 473c-9.4 9.4-24.6 9.4-34 0L31.3 297c-15.1-15.1-4.4-41 17-41H152V56c0-13.3 10.7-24 24-24z" class=""
        ></path> -->
          <path
            :style="{ 'fill': arrowsStyle.header[header.code]}"
            d="M176 32h96c13.3 0 24 10.7 24 24v200h103.8c21.4 0 32.1 25.8 17 41L241 473c-9.4 9.4-24.6 9.4-34 0L31.3 297c-15.1-15.1-4.4-41 17-41H152V56c0-13.3 10.7-24 24-24z" class=""
          ></path>
      </svg>
      </div>
    </div>

    <!-- lateral ecosystem 0y-->
    <div class="row pad-bot-10">

      <!-- ecosystem-heading -->
      <div class="col-4 ecosystem-heading">
      <!--   <div class="col-1 lateral-text-wrapper">
          <div
            class="lateral-text lateral-text-ontop"
            :class="{'selected': ecoLine === 'pressure'}"
            @click="handleEcoPressureLineClick()"
          >Pressure</div>
          <div
            class="lateral-text lateral-text-onbottom"
            :class="{'selected': ecoLine && ecoLine !== 'pressure'}"
            @click="handleEcoConditionLineClick()"
          >Ecosystem condition</div>          
        </div> -->

        <!-- <canvas class="col-1-sm" id="myCanvas" width="50" height="550"></canvas> -->
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
              <!-- <p class="ecosystem-bar col-1-sm"></p> -->
            </div>
            <svg 
              aria-hidden="true"
              data-prefix="fas"
              data-icon="arrow-alt-right"
              role="img"
              viewBox="0 0 448 512"
              class="arrow-right"
            >
            <!-- <path
              :style="{ 'fill': selectedEco === ecosystemItem.code ? selectedColour : notSelectedColour}"
              d="M0 304v-96c0-13.3 10.7-24 24-24h200V80.2c0-21.4 25.8-32.1 41-17L441 239c9.4 9.4 9.4 24.6 0 34L265 448.7c-15.1 15.1-41 4.4-41-17V328H24c-13.3 0-24-10.7-24-24z" class=""
            ></path> -->
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
                    <!--    <span
                          v-if="policy.code === 'policyUse' || policy.code === 'data'"
                          class="bold-font"
                        >{{indicatorValue.data[policy.code].value}} - </span> -->
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
        <div class="row full">
          <div class="item full">
            <div class="jumbotron full">
              <table class="table table-bordered full-width full-bordered">
                <thead>
                  <tr>
                    <th>Division</th>
                    <th>Group</th>
                    <th>Class</th>
                    <th>Marine inlets and transitional waters</th>
                    <th>Coastal waters</th>
                    <th>Shelf waters</th>
                    <th>Open Ocean</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td rowspan="8">Nutrition</td>
                    <td rowspan="6">Biomass</td>
                    <td>Cultivated crops</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Reared animals and their outputs</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Wild plants, algae and their outputs</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td>Wild animals and their outputs</td>
                    <td>
                      <span style="color: orange">●</span> Landings (ton)
                    </td>
                    <td></td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Landings (ton) 
                      <span style="color: orange">●</span> CPUE (ton)
                    </td>
                  </tr>
                  <tr>
                    <td>Plants and algae from in-situ aquaculture</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td>Animals from in-situ aquaculture</td>
                    <td colspan="3">
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Water</td>
                    <td>Surface water for drinking</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Ground water for drinking</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="5">Materials</td>
                    <td rowspan="3">Biomass</td>
                    <td>Fibres and other materials from plants, algae and animals
                        for direct use or processing</td>
                    <td rowspan="2">
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                    <td colspan="3">
                      <span style="color: orange">●</span> Landings (ton) 
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                  </tr>
                  <tr>
                    <td>Materials from plants, algae and animals for agricultural use</td>
                    <td colspan="3">
                      <span style="color: orange">●</span> Landings (ton) 
                      <span style="color: orange">●</span> Harvest (ton/a)
                    </td>
                  </tr>
                  <tr>
                    <td>Genetic materials from all biota</td>
                    <td colspan="4">
                      <span style="color: grey">●</span> Patents (no.) 
                      <span style="color: grey">●</span> Published articles (no.)
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Water</td>
                    <td>Surface water for non-drinking purposes</td>
                    <td colspan="4" rowspan="2"></td>
                  </tr>
                  <tr>
                    <td>Ground water for non-drinking purposes</td>
                  </tr>
                  <tr>
                    <td rowspan="3">Energy</td>
                    <td rowspan="2">Biomass-based
                        energy sources</td>
                    <td>Plant-based resources</td>
                    <td rowspan="2" colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Animal-based resources</td>
                  </tr>
                  <tr>
                    <td>Mechanical
                        energy</td>
                    <td>Animal-based energy</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="5">Mediation of waste, toxics
                        and other nuisances</td>
                    <td rowspan="2">Mediation by
                        biota</td>
                    <td>Bio-remediation by micro-organisms, algae, plants, and
                        animals</td>
                    <td rowspan="4" colspan="3">
                      <span style="color: green;">●</span> Nutrient load to coast (ton/a) <br>
                      <span style="color: green;">●</span> HM and POP deposition (ton/a) <br>
                      <span style="color: green;">●</span> Oxyrisk
                    </td>
                    <td rowspan="4">
                      <span style="color: green;">●</span> HM and POP deposition (ton/a) <br>
                      <span style="color: green;">●</span> Oxyrisk
                    </td>
                  </tr>
                  <tr>
                    <td>Filtration/sequestration/storage/accumulation by micro-
                        organisms, algae, plants, and animals</td>
                  </tr>
                  <tr>
                    <td rowspan="3">Mediation by
                        ecosystems</td>
                    <td>Filtration/sequestration/storage/accumulation by ecosystems</td>
                  </tr>
                  <tr>
                    <td>Dilution by atmosphere, freshwater and marine ecosystems</td>
                  </tr>
                  <tr>
                    <td>Mediation of smell/noise/visual impacts</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="6">Mediation of flows</td>
                    <td rowspan="2">Mass flows</td>
                    <td>Mass stabilisation and control of erosion rates</td>
                    <td rowspan="2" colspan="2">
                      <span style="color: green;">●</span>
                        Composite indices based on extent
                        of selected emerged, submerged and
                        intertidal habitats, coastline slope and
                        coastal geomorphology, wave regime,
                        tidal range, relative sea level, storm
                        surge
                    </td>
                    <td colspan="2" rowspan="2"></td>
                  </tr>
                  <tr>
                    <td>Buffering and attenuation of mass flows</td>
                  </tr>
                  <tr>
                    <td rowspan="2">Liquid flows</td>
                    <td>Hydrological cycle and water flow maintenance</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Flood protection</td>
                    <td colspan="2">See buffering and attenuation of
                        mass flows</td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Gaseous / air
                        flows</td>
                    <td>Storm protection</td>
                    <td rowspan="2" colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Ventilation and transpiration</td>
                  </tr>
                  <tr>
                    <td rowspan="10">Maintenance of physical,
                        chemical, biological
                        conditions</td>
                    <td rowspan="2">Lifecycle
                        maintenance,
                        habitat and
                        gene pool
                        protection</td>
                    <td>Pollination and seed dispersal</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Maintaining nursery populations and habitats</td>
                    <td colspan="2">
                      <span style="color: red">●</span> Submerged and intertidal
                        habitats diversity (no.)<br>
                      <span style="color: green;">●</span> Oxygen concentration (%)<br>
                      <span style="color: green;">●</span> Turbidity (%)<br>
                      <span style="color: green;">●</span> Species distribution (km2/ha) <br>
                      <span style="color: red">●</span> Abundance and richness - at age (ton/a)<br>
                      <span style="color: orange">●</span> Extent of marine protected areas (km2/ha)<br>
                      <span style="color: red">●</span> Nursery areas (km2/ha)
                    </td>
                    <td>
                      <span style="color: green;">●</span> Oxygen
                        concentration (%)<br>
                      <span style="color: green;">●</span> Turbidity (%) <br>
                      <span style="color: green;">●</span> Species distribution (km2/ha) <br>
                      <span style="color: red">●</span> Abundance and
                        richness - at age
                        (ton/a)<br>
                      <span style="color: orange">●</span> Extent of marine
                        protected areas
                        (km2/ha) <br>
                      <span style="color: red">●</span>Nursery areas
                        (km2/ha)
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Pest and
                        disease control</td>
                    <td>Pest control</td>
                    <td colspan="4">
                      <span style="color: red">●</span> Presence (no.) and <br>
                      <span style="color: red">●</span> Distribution (km2) of alien species
                    </td>
                  </tr>
                  <tr>
                    <td>Disease control</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Soil formation
                        and
                        composition</td>
                    <td>Weathering processes</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Decomposition and fixing processes</td>
                    <td colspan="3">
                      <span style="color: grey">●</span> Nitrogen removal (%) <br>
                      <span style="color: grey">●</span> Water residence time (months) <br>
                      <span style="color: grey">●</span>
                        Depth/water residence time (m/year)
                      </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Water
                        conditions</td>
                    <td>Chemical condition of freshwaters</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Chemical condition of salt waters</td>
                    <td colspan="4">
                      <span style="color: green;">●</span> Nutrient load to coast (ton/yr) <br>
                      <span style="color: green;">●</span> HM and POP loading (ton/yr) <br>
                      <span style="color: green;">●</span> Oxyrisk
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Atmospheric
                        composition
                        and climate
                        regulation</td>
                    <td>Global climate regulation by reduction of greenhouse gas
                        concentrations</td>
                    <td colspan="4">
                      <span style="color: green;">●</span> C stock (tonC) 
                      <span style="color: green;">●</span> C sequestration (tonC/a) 
                      <span style="color: green;">●</span> pH 
                      <span style="color: green;">●</span> blue C (tonC) 
                      <span style="color: green;">●</span> PP(ton C/year)
                    </td>
                  </tr>
                  <tr>
                    <td>Micro and regional climate regulation</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="7">Physical and intellectual
                        interactions with biota,
                        ecosystems, and land-
                        /seascapes [environmental
                        settings]</td>
                    <td rowspan="2">Physical and
                        experiential
                        interactions</td>
                    <td>Experiential use of plants, animals and land-/seascapes in
                        different environmental settings</td>
                    <td colspan="3" rowspan="2">
                      <span style="color: orange">●</span> Extent of marine protected areas (km2/ha) <br>
                      <span style="color: green;">●</span> Presence of iconic/endangered species (no.) <br>
                      <span style="color: grey">●</span> In-water activities occurrence (no.) <br>
                      <span style="color: grey">●</span> Recreation trips (no./year)
                    </td>
                    <td rowspan="2">
                      <span style="color: orange">●</span> Extent of marine
                        protected areas
                        (km2/ha) <br>
                      <span style="color: green;">●</span> Presence of
                        iconic/endangered
                        species (no.)
                    </td>
                  </tr>
                  <tr>
                    <td>Physical use of land-/seascapes in different environmental
                        settings</td>
                  </tr>
                  <tr>
                    <td rowspan="5">Intellectual and
                        representative
                        interactions</td>
                    <td>Scientific</td>
                    <td rowspan="2" colspan="4">
                      <span style="color: grey">●</span> Scientific studies (no.)
                      <span style="color: grey">●</span> Documentaries, educational publications (no.) <br>
                      <span style="color: grey">●</span> Visits to scientific and artistic visits exhibits (no.)
                    </td>
                  </tr>
                  <tr>
                    <td>Educational</td>
                  </tr>
                  <tr>
                    <td>Heritage, cultural</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Entertainment</td>
                    <td rowspan="2" colspan="4">
                      <span style="color: grey">●</span> Documentaries, educational publications (no.) <br>
                      <span style="color: grey">●</span> Visits to scientific and artistic visits exhibits (no.)
                    </td>
                  </tr>
                  <tr>
                    <td>Aesthetic</td>
                  </tr>
                  <tr>
                    <td rowspan="2">Spiritual, symbolic and
                        other interactions with</td>
                    <td rowspan="2">Spiritual and/or
                        emblematic</td>
                    <td>Symbolic</td>
                    <td colspan="4" rowspan="2"></td>
                  </tr>
                  <tr>
                    <td>Sacred and/or religious</td>
                  </tr>
                  <tr>
                    <td rowspan="2">biota, ecosystems, and
                        land-/seascapes
                        [environmental settings]</td>
                    <td rowspan="2">Other cultural
                        outputs<br> Bequest</td>
                    <td>Existence</td>
                    <td colspan="4" rowspan="2">
                      <span style="color: orange">●</span> Extent of marine protected areas (km2/ha) <br>
                      <span style="color: green;">●</span> Presence of iconic/endangered species (no.)
                    </td>
                  </tr>
                  <tr>
                    <td>Bequest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </the-eco-marine_services-selection>

      <the-eco-available_services-selection v-if="ecoLine === 'available_service'">
        <div class="row full">
          <div class="item full">
            <div class="jumbotron full">
              <table class="table table-bordered full-width full-bordered">
                <thead>
                  <tr>
                    <th>Ecosystem services</th>
                    <th>Leader</th>
                    <th>Indicator</th>
                    <th>Marine systems</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Cultivated crops</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Area and yields of food and feed crops
                    </td>
                    <td rowspan="8">
                      <span style="color: orange;">●</span> Yield <br>
                      <span style="color: orange;">●</span> Landings <br>
                      <span style="color: orange;">●</span> Catch per unit effort (where applicable)
                    </td>
                  </tr>
                  <tr>
                    <td>Reared animals and their outputs</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Livestock
                    </td>
                  </tr>
                  <tr>
                    <td>Wild plants, algae and their outputs</td>
                    <td>Forest</td>
                    <td>
                      <span style="color: green;">●</span> Distribution of wild berries (modelling)
                    </td>
                  </tr>
                  <tr>
                      <td>Wild animals and their outputs</td>
                      <td>Forest</td>
                      <td>
                        <span style="color: green;">●</span> Population sizes of species of interest
                      </td>
                  </tr>
                  <tr>
                      <td>Plants and algae from in-situ aquaculture</td>
                      <td>Water</td>
                      <td></td>
                  </tr>
                  <tr>
                    <td>Animals from in-situ aquaculture</td>
                    <td>Water</td>
                    <td>
                      <span style="color: green;">●</span> Freshwater aquaculture production
                    </td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Water </span>(Nutrition)</td>
                    <td>Water</td>
                    <td>
                      <span style="color: green;">●</span> Water abstracted
                    </td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Biomass </span>(Materials)</td>
                    <td>Forest <br> Agro</td>
                    <td>
                      <span style="color: green;">●</span> Area and yield of fibre crops<br>
                      <span style="color: green;">●</span> Timber production and consumption statistics
                    </td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Water </span>(Materials)</td>
                    <td>Water</td>
                    <td>
                      <span style="color: green;">●</span> Water abstracted
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Plant-based resources</td>
                    <td>Forest</td>
                    <td>
                      <span style="color: green;">●</span> Fuel wood statistics
                    </td>
                    <td rowspan="3"></td>
                  </tr>
                  <tr>
                    <td>Animal-based resources</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Animal-based energy</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>(Mediation of waste, toxics and other nuisances)</td>
                    <td>Forest</td>
                    <td>
                      <span style="color: green;">●</span> Area occupied by riparian forests <br>
                      <span style="color: orange;">●</span> Nitrogen and Sulphur removal (forests)
                    </td>
                    <td>
                      <span style="color: green;">●</span> Nutrient load to coast <br>
                      <span style="color: green;">●</span> Heavy metals and persistent organic pollutants deposition <br>
                      <span style="color: green;">●</span>Oxyrisk
                    </td>
                  </tr>
                  <tr>
                    <td>Mass stabilisation and control of erosion rates</td>
                    <td>Forest <br> Agro
                    </td>
                    <td>
                      <span style="color: green;">●</span> Soil erosion risk or erosion protection
                    </td>
                    <td rowspan="2">
                      <span style="color: green;">●</span> Coastal protection capacity
                    </td>
                  </tr>
                  <tr>
                    <td>Buffering and attenuation of mass flows</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Hydrological cycle and water flow maintenance</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Flood protection</td>
                    <td>Fresh</td>
                    <td>
                      <span style="color: green;">●</span> Floodplains areas (and record of annual floods) <br>
                      <span style="color: green;">●</span> Area of wetlands located in flood risk zones
                    </td>
                    <td rowspan="2">
                      <span style="color: green;">●</span>Coastal protection capacity
                    </td>
                  </tr>
                  <tr>
                    <td>Storm protection</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Ventilation and transpiration</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Amount of biomass
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pollination and seed dispersal</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Pollination potential
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Maintaining nursery populations and habitats</td>
                    <td></td>
                    <td>
                      <span style="color: green;">●</span> Share of High Nature Value farmland <br>
                      <span style="color: green;">●</span> Ecological Status of water bodies
                    </td>
                    <td>
                      <span style="color: green;">●</span> Oxygen concentration 
                      <span style="color: green;">●</span> Turbidity <br>
                      <span style="color: green;">●</span> Species distribution
                      <span style="color: green;">●</span> Extent of marine protected areas
                    </td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Pest and disease control</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Weathering processes</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Share of organic farming 
                      <span style="color: green;">●</span> Soil organic matter content 
                      <span style="color: green;">●</span> Ph of topsoil 
                      <span style="color: green;">●</span> Cation exchange capacity
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Decomposition and fixing processes</td>
                    <td>Agro</td>
                    <td>
                      <span style="color: green;">●</span> Area of nitrogen fixing crops
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Chemical condition of freshwaters</td>
                    <td>Water</td>
                    <td>
                      <span style="color: green;">●</span> Chemical status
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Chemical condition of salt waters</td>
                    <td>Marine</td>
                    <td></td>
                    <td>
                      <span style="color: green;">●</span> Nutrient load to coast <br>
                      <span style="color: green;">●</span> HM and POP loading <br>
                      <span style="color: green;">●</span> Oxyrisk 
                    </td>
                  </tr>
                  <tr>
                    <td>Global climate regulation by reduction of greenhouse gas concentrations</td>
                    <td>Forest</td>
                    <td>
                      <span style="color: green;">●</span> Carbon storage and sequestration by forests
                    </td>
                    <td>
                      <span style="color: green;">●</span> Carbon stock 
                      <span style="color: green;">●</span> Carbon sequestration 
                      <span style="color: green;">●</span> pH; 
                      <span style="color: green;">●</span> Blue carbon <br> 
                      <span style="color: green;">●</span> Primary production
                    </td>
                  </tr>
                  <tr>
                    <td>Micro and regional climate regulation</td>
                    <td>Forest</td>
                    <td>
                      <span style="color: orange;">●</span> Forest area
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Physical and experiential interactions</span></td>
                    <td rowspan="4">Forest Agro Water Marine</td>
                    <td colspan="2">
                      <span style="color: orange;">●</span> Visitor statistics
                    </td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Intellectual and representative interactions</span></td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Spiritual and/or emblematic</span></td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td><span style="font-style: italic;">Other cultural outputs</span></td>
                    <td colspan="2">
                      <span style="color: green;">●</span> Extent of protected areas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </the-eco-available_services-selection>

      <the-eco-total_service-selection v-if="ecoLine === 'total_service'">
        <div class="row">
          <div class="item">
            <div class="jumbotron">
              <table class="table table-bordered center top-border no-empty">
                <thead>
                   <tr>
                    <th style="min-width: 250px;"></th>
                    <th></th>
                    <th>Forests</th>
                    <th>Agro-ecosystems
                        (cropland and
                        grassland)
                    </th>
                    <th>Freshwater
                        ecosystems
                        (rivers,
                        lakes, ground water, and
                        wetlands)
                    </th>
                    <th>Marine
                        ecosystems
                        (Marine inlets and
                        transitional waters,
                        coastal
                        zones, shelf
                        ecosystems,
                        and open ocean)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  
                  <tr>
                    <td>Provisioning
                        services</td>
                    <td style="color:#308e47;font-size: 2rem;line-height:1;padding: 0;">●</td>
                    <td>13</td>
                    <td>9</td>
                    <td>6</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#ffcc4c;">●</td>
                    <td>18</td>
                    <td>8</td>
                    <td>12</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#fb5759;">●</td>
                    <td>7</td>
                    <td>3</td>
                    <td>8</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#808080;">●</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Regulation and
                        maintenance services</td>
                    <td style="color:#308e47;font-size: 2rem;line-height:1;padding: 0;">●</td>
                    <td>5</td>
                    <td>8</td>
                    <td>5</td>
                    <td>13</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#ffcc4c;">●</td>
                    <td>15</td>
                    <td>14</td>
                    <td>22</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#fb5759;">●</td>
                    <td>30</td>
                    <td>6</td>
                    <td>7</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#808080;">●</td>
                    <td>13</td>
                    <td>0</td>
                    <td>11</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Cultural services</td>
                    <td style="color:#308e47;font-size: 2rem;line-height:1;padding: 0;">●</td>
                    <td>0</td>
                    <td>1</td>
                    <td>3</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#ffcc4c;">●</td>
                    <td>6</td>
                    <td>12</td>
                    <td>12</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#fb5759;">●</td>
                    <td>10</td>
                    <td>6</td>
                    <td>22</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="font-size: 2rem;line-height:1;padding: 0;color:#808080;">●</td>
                    <td>0</td>
                    <td>0</td>
                    <td>2</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Total number of
                        indicators</td>
                    <td style="border-color:#e0e0e0!important;"> </td>
                    <td>117</td>
                    <td>67</td>
                    <td>110</td>
                    <td>33</td>
                  </tr>
                  <tr>
                    <td>Share of green
                        indicators</td>
                    <td style="color:#308e47;font-size: 2rem;line-height:1;padding: 0;">●</td>
                    <td>15%</td>
                    <td>27%</td>
                    <td>13%</td>
                    <td>42%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </the-eco-total_service-selection>

      <the-eco-urban_service-selection v-if="ecoLine === 'urban_service'">
        <div class="row">
          <div class="item">
            <div class="jumbotron" style="padding: 0;">
              <table class="table table-bordered middle" style="margin-bottom: 0;">
                <thead>
                   <tr>
                          <th style="max-width: 70px;">CICES Section</th>
                          <th>CICES Class</th>
                          <th>Class type (urban ecosystem services)</th>
                          <th>Service providing unit (SPU)</th>
                          <th>Demand</th>
                      </tr>
                </thead>

                <tbody style="background: #f2b899">
                  <tr>
                    <td rowspan="5">Provisioning</td>
                    <td>Cultivated crops</td>
                    <td>Vegetables produced by urban allotments and in and the cummuting zone</td>
                    <td>Crop fields, fruit trees, private and public gardens</td>
                    <td rowspan="5">Consumption</td>
                  </tr>
                  <tr>
                    <td>Surface water for drinking</td>
                    <td></td>
                    <td rowspan="4"> Watershed</td>
                  </tr>
                  <tr>
                    <td>Ground water for drinking</td>
                    <td></td>
                  </tr>
                   <tr>
                    <td>Surface water for non-drinking purposes</td>
                    <td></td>
                  </tr>
                   <tr>
                    <td>Ground water for non-drinking purposes</td>
                    <td></td>
                  </tr>
                </tbody>

                <tbody style="background: #a1cb7f">
                  <tr>
                    <td rowspan="7">Regulating</td>
                    <td>Filtration/sequestration/storage/accumulation by ecoystems</td>
                    <td>Regulation of air quality by urban trees and forests</td>
                    <td>Forest, trees, shrubs</td>
                    <td>Risk of exposure to pollutant concentraton beoyond thresholds</td>
                  </tr>
                  <tr>
                    <td>Global climate regulation by reduction of greenhouse gas concentration</td>
                    <td>Climate regulation by reduction of CO2</td>
                    <td>Vegetation, soil</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Micro and regional climate regulation</td>
                    <td>Urban temperature regulation</td>
                    <td>Forest, trees, shrub, herbs, lawns, wetlands, water bodies</td>
                    <td>Risk of exposure to high temperatures</td>
                  </tr>
                  <tr>
                    <td>Mediation of smell/noise/visual impacts</td>
                    <td>Noise mitigated by urban vegetation</td>
                    <td>Forest, trees, shroubs, vegetated surfaces</td>
                    <td>Risk of exposure to noise</td>
                  </tr>
                  <tr>
                    <td>Hydrological cycle and water flow maintenance</td>
                    <td>Water flow regulation and run off mitigation</td>
                    <td>Trees, shrubs, vegetated and permeable surfaces</td>
                    <td>Risk for flood sensitive areas or land use</td>
                  </tr>
                  <tr>
                    <td>Flood control</td>
                    <td></td>
                    <td>Wetlands</td>
                    <td>Exposure to flooding</td>
                  </tr>
                  <tr>
                    <td>Pollination and seed dispersal</td>
                    <td>Insect pollination</td>
                    <td>Crop fields, fruit trees, private and public gardens</td>
                    <td>Dependency on insect pollination</td>
                  </tr>
                </tbody>

                <tbody style="background:#93d6ee">
                  <tr>
                    <td rowspan="2">Cultural</td>
                    <td>Physical use of land/seascapes in different environmental settings</td>
                    <td>Nature based recreation</td>
                    <td rowspan="2">Parks, gardens, forest, trees, agricultural areas in the commuting zone, wetlands, water bodies, waterways, Natura 2000 Sites</td>
                    <td rowspan="2">Preferences; potential and direct use</td>
                  </tr>
                  <tr>
                    <td>Scientific <hr style="    border-style: inherit;
                      border-color: #e0e0e0;"> Educational <hr style="    border-style: inherit;
                      border-color: #e0e0e0;"> Heritage,cultural</td>
                    <td>Nature based education</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </the-eco-urban_service-selection>

      <the-eco-water_services-selection v-if="ecoLine === 'water_service'">
        <div class="row full">
          <div class="item full">
            <div class="jumbotron full">
              <table class="table table-bordered full-width full-bordered">
                <thead>
                  <tr>
                    <th>Division</th>
                    <th>Group</th>
                    <th>Class</th>
                    <th>Lakes</th>
                    <th>Rivers</th>
                    <th>Ground water</th>
                    <th>Wetlands</th>
                  </tr>
                </thead>

                <tbody>
                  
                  
                  
                    <tr>
                      
                        <td rowspan="8">Nutrition</td>
                      
                        <td rowspan="6">Biomass</td>
                      
                        <td>Cultivated crops</td>
                      
                        <td colspan="4"></td>
                      
                      
                    </tr>
                  
                    <tr>
                      
                      
                        <td>Reared animals and their outputs</td>
                      
                        <td colspan="4"></td>
                      
                      
                    </tr>
                  
                    <tr>
                      
                      
                        <td>Wild plants, algae and their outputs</td>
                      
                        <td colspan="2"><span style="color: grey">●</span> Wild plants used in gastronomy, cosmetic, pharmaceutical uses (data on industries collecting the plants)</td>
                      
                        <td></td>
                      
                        <td><b>see lakes and rivers</b></td>
                      
                    </tr>
                  
                    <tr>
                      
                      
                        <td>Wild animals and their outputs</td>
                      
                        <td colspan="2"><span style="color:orange">●</span> Fish production (catch in tonnes by commercial and recreational fisheries) 
                          <br><span style="color:red;">●</span> Number of fisherman and hunters of waterfowls (anglers, professional and amateur fishermen)
                          <br><span style="color:red;">●</span> Status of fish population (Species composition, Age Structure, Biomass kg/ha)
                        </td>
                      
                      
                        <td></td>
                      
                        <td><b>see lakes and rivers</b></td>
                      
                    </tr>
          
              
    
                    <tr>
                      
                        <td>Plants and algae from in-situ aquaculture</td>
                      
                        <td colspan="4"></td>
                      
                      
                    </tr>
                  
                    <tr>
                      
                      
                        <td>Animals from in-situ aquaculture</td>
                      
                        <td colspan="2"><span style="color:green;">●</span> Freshwater aquaculture production (e.g. sturgeon and caviar production)</td>
                      
                      
                        <td></td>
                      
                        <td></td>
                      
                    </tr>
              
                    <tr>
                      
                        <td rowspan="2">Water</td>
                      
                        <td rowspan="2">
                          <div style="float: left;">Surface water for drinking <hr style="margin-bottom: 1.5rem;margin-top: 1.5rem; border-style: solid; border-color: #e0e0e0;"> Ground water for drinking </div>
                          <div style="width: 30%; float: right"><span style="color:red">●</span> Water exploitation index (WEI)</div></td>
                      
                        <!-- <td rowspan="2"></td> -->
                        <td colspan="2"><span style="color:orange;">●</span> Water consumption for drinking<br><span style="color:orange;">●</span> Surface water availability<br><span style="color:green;">●</span> Water abstracted</td>
                        <td></td>
                      
                        <td><span style="color:red">●</span> Nitrate-vulnerable zones</td>
                      
                    </tr>
                  
                    <tr>
                      
                      
                      
                      
                        <td colspan="2"></td>
                      
                        <td><span style="color:orange;">●</span> Ground water bodies <br> <span style="color:orange;">●</span> Ground water abstraction</td>
                      
                        <td></td>
                      
                    </tr>
            
                  
                  
                    <tr>
                      
                        <td rowspan="5">Materials</td>
                      
                        <td rowspan="3">Biomass</td>
                      
                        <td>Fibres and other materials from plants, algae and animals for direct use or processing</td>
                      
                        <td colspan="3"></td>
                      
                        <td><span style="color:green">●</span> Wood produced (tons or volume) by riparian forest <br> <span style="color:green">●</span> Surface of exploited wet forests (e.g. poplars) and reeds</td>
                      
                    </tr>
                  
                  
                    <tr>
                      
                        <td>Materials from plants, algae and animals for agricultural use</td>
                      
                        <td colspan="4"></td>
                      
                    </tr>
                  
                    <tr>
                      
                        <td>Genetic materials from all biota</td>
                      
                        <td colspan="4"></td>
                      
                    </tr>
                  
                
                    <tr>
                      
                        <td rowspan="2">Water</td>
                      
                        <td rowspan="2">
                          <div style="float: left;width: 60%">Surface water for non-drinking purposes <hr style="margin-bottom: 1.5rem;margin-top: 1.5rem; border-style: solid; border-color: #e0e0e0;"> Ground water for non-drinking purposes </div>
                          <div style="width: 30%; float: right"><span style="color:red">●</span> Water exploitation index (WEI)</div></td>
                      
                      
                        <td colspan="2"><span style="color:orange;">●</span> Water use per sector<br><span style="color:orange;">●</span> Surface water availability<br><span style="color:green;">●</span> Water abstracted<br> <span style="color:red">●</span> Volume of water bodies</td>
                      
                        <td></td>
                        <td><span style="color:green">●</span> Surface of flood-prone areas</td>
                      
                    </tr>
                  
                    <tr>
                      
                      
                        <td></td>
                        <td></td>
                      
                        <td><span style="color:orange;">●</span> Ground water bodies <br> <span style="color:orange;">●</span> Ground water abstraction</td>
                      
                        <td></td>
                      
                    </tr>
                  
                </tbody>

                <tbody>
                  <tr>
                    <td rowspan="3">Energy</td>
                    <td rowspan="2">Biomass-based energy
                        sources</td>
                    <td>Plant-based resources</td>
                    <td colspan="2"></td>
                    <td></td>
                    <td>
                      <span style="color:orange;">●</span> Firewood produced byriparian forests
                    </td>
                  </tr>
                  <tr>
                    <td>Animal-based resources</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Mechanical energy</td>
                    <td>Animal-based energy</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="5">Mediation of waste, toxics and other nuisances</td>
                    <td rowspan="2">Mediation by biota</td>
                    <td>Bio-remediation by micro-organisms, algae, plants,
                        and animals</td>
                    <td colspan="2" rowspan="3">
                      <span style="color:orange;">●</span> Indicators on water quality
                        (microbiological data for bathing waters,
                        BOD5 nitrate conc, phosphate conc,
                        oxygen conditions, saprobiological status)<br>
                      <span style="color:orange;">●</span> Nutrient loads <br>
                      <span style="color:orange;">●</span> Ecological status <br>
                      <span style="color:orange;">●</span> Trophic status <br>
                      <span style="color:green;">●</span> Area occupied by
                        riparian forests <br>
                      <span style="color: orange">●</span> Number and efficiency
                        of treatment plants <br>
                      <span style="color: orange">●</span> Waste treated
                    </td>
                    <td rowspan="3">
                      <span style="color: grey">●</span> Indicators on
                        groundwater
                        quality (NO3,
                        pesticide, trace
                        metals, emerging
                        pollutants, etc.
                        evolution in GW)
                    </td>
                    <td rowspan="3">
                      <span style="color: red">●</span> Carbon storage per unit
                          of area <br>
                      <span style="color: red">●</span> Potential mineralization
                        or decomposition <br>
                      <span style="color: orange">●</span> Ecological status <br>
                      <span style="color: orange">●</span>Nutrient concentration <br>
                      <span style="color: orange">●</span>Nutrient retention
                    </td>
                  </tr>
                  <tr>
                    <td>Filtration/sequestration/storage/accumulation by
                      micro-organisms, algae, plants, and animals
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="3">Mediation by ecosystems</td>
                    <td>Filtration/sequestration/storage/accumulation by
                      ecosystems
                    </td>
                  </tr>
                  <tr>
                    <td>Dilution by atmosphere, freshwater and marine ecosystems
                    </td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td>Mediation of smell/noise/visual impacts</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="6">Mediation of flows</td>
                    <td rowspan="2">Mass flows</td>
                    <td>Mass stabilisation and control of erosion rates</td>
                    <td></td>
                    <td></td>
                    <td rowspan="4">
                      <span style="color: grey">●</span> GW level
                        evolution
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Buffering and attenuation of mass flows</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Sediment retention
                    </td>
                    <td>
                      <span style="color: orange">●</span> Sediment retention
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Liquid flows</td>
                    <td>Hydrological cycle and water flow maintenance</td>
                    <td><span style="color: red">Volume of water
                        (or snow)</span></td>
                    <td><span style="color: red">Hydrological flow
                        data</span></td>
                    <td><span style="color: red">Surface of wetlands</span></td>
                  </tr>
                  <tr>
                    <td>Flood protection</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Holding capacity flood risk maps <br>
                      <span style="color: red">●</span> Conservation of river and lakes banks
                    </td>
                    <td>
                      <span style="color: orange">●</span> Water holding capacity
                        of soils<br>
                      <span style="color:green;">●</span> Floodplains areas (and
                        record of annual floods)<br>
                      <span style="color:green;">●</span> Area of wetlands located
                        in flood risk zones <br>
                      <span style="color: red">●</span>
                        Conservation status of
                        riparian wetlands
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Gaseous / air flows</td>
                    <td>Storm protection</td>
                    <td colspan="3"></td>
                    <td>
                      <span style="color: orange">●</span> Conservation status of
                        wetlands
                      <span style="color: red">Area of wetlands,
                            vegetation cover?</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ventilation and transpiration</td>
                    <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="10">
                      Maintenance of
                      physical,
                      chemical,
                      biological
                      conditions
                    </td>
                    <td rowspan="2">
                      Lifecycle maintenance,
                      habitat and gene pool
                      protection
                    </td>
                    <td>Pollination and seed dispersal</td>
                    <td colspan="2"></td>
                    <td rowspan="2">
                      <span style="color: grey">●</span> GW level
                    </td>
                    <td>
                      <span style="color: red">Beekeeping value of wetlands</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Maintaining nursery populations and habitats</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Biodiversity value (Species diversity or
                        abundance, endemics or red list species
                        and spawning location) <br>
                      <span style="color:green;">●</span> Ecological status Morphological status
                    </td>
                    <td><span style="color: red">Biodiversity value?</span></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Pest and disease control</td>
                    <td>Pest control</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Alien species (Introduced riparian and
                        aquatic plants <br>
                      <span style="color: orange">●</span> Number of introduced aquatic invertebrates <br>
                      <span style="color: orange">●</span> Number of introduced vertebrates in
                        rivers and riparian areas
                    </td>
                    <td></td>
                    <td><b>see lakes and rivers</b></td>
                  </tr>
                  <tr>
                      <td>Disease control</td>
                      <td colspan="4"></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Soil formation and
                        composition</td>
                    <td>Weathering processes</td>
                    <td colspan="2">
                      <span style="color: red">●</span> Fluvisols surface
                    </td>
                    <td></td>
                    <td>
                      <span style="color: red">●</span> Hydromorphic soils
                        (Presence/absence) Surface
                        of floodplains
                    </td>
                  </tr>
                  <tr>
                    <td>Decomposition and fixing processes</td>
                    <td colspan="3"></td>
                    <td>
                      <span style="color: red">●</span> Potential mineralization,
                        decomposition, etc.
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Water conditions</td>
                    <td>Chemical condition of freshwaters</td>
                    <td colspan="2">
                      <span style="color:green;">●</span> Chemical status <br>
                      <span style="color: orange">●</span> Ecological status
                    </td>
                    <td rowspan="2">
                      <span style="color: orange">●</span> Indicators of GW quality
                    </td>
                    <td>
                      <span style="color:green;">●</span> Chemical status <br>
                      <span style="color: orange">●</span> Ecological status <br>
                      <span style="color: grey">●</span> Potential of water purification of wetlands
                    </td>
                  </tr>
                  <tr>
                    <td>Chemical condition of salt waters</td>
                    <td colspan="2"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowspan="2">Atmospheric composition
                      and climate regulation
                    </td>
                    <td>Global climate regulation by reduction of greenhouse
                      gas concentrations
                    </td>
                    <td colspan="2">
                      <span style="color: grey">●</span> C sequestration (Annual increase in <br>
                      <span style="color: grey">●</span>
                        Carbon sequestration in living biomass of
                        riparian forest <br>
                      <span style="color: grey">●</span> Carbon sequestered by
                        plantations of Populus <br>
                      <span style="color: grey">●</span> Organic carbon
                        stored in fluvisols)
                    </td>
                    <td>
                      <span style="color: grey">●</span> C sequestration (Evolution of annual volumes of CO2 injected, <br>
                      <span style="color: grey">●</span>
                        Number of sites for
                        CO2 deep
                        injections)
                    </td>
                    <td>see rivers and lakes</td>
                  </tr>
                  <tr>
                    <td>Micro and regional climate regulation</td>
                    <td colspan="2"></td>
                    <td>
                      <span style="color: grey">●</span> GW level
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td rowspan="7">Physical and
                      intellectual
                      interactions
                      with biota,
                      ecosystems,
                      and land-
                      /seascapes
                      [environmen
                      tal settings]
                    </td>
                    <td rowspan="2">Physical and experiential
                      interactions
                    </td>
                    <td>Experiential use of plants, animals and land-
                      /seascapes in different environmental settings
                    </td>
                    <td colspan="2">
                      <span style="color: red">●</span> Number of visitors (to National Parks including lakes or rivers) <br>
                      <span style="color:green;">●</span> National Parks and Natura 2000 sites <br>
                      <span style="color: red">●</span> Known bird watching sites Waterfowl
                    </td>
                    <td></td>
                    <td>
                      <span style="color: red">●</span> Number of visitors (waterfowl hunters and fishermen, <br>
                      <span style="color: red">●</span> Visitors to National Parks or protected areas including wetlands) <br>
                      <span style="color: red">●</span> Known bird watching sites <br>
                      <span style="color: red">●</span> Waterfowl <br>
                      <span style="color: red">●</span> Tourism revenue
                    </td>
                  </tr>
                  <tr>
                      <td>Physical use of land-/seascapes in different
                          environmental settings</td>
                      <td colspan="2">
                        <span style="color: red">●</span> Number of visitors<br>
                        <span style="color: red">●</span> bathing areas and Number beaches <br>
                        <span style="color: red">●</span> Fishing reserves, <br>
                        <span style="color: red">●</span> Fish abundance, <br>
                        <span style="color: red">●</span> Fish monetary value from angling, <br>
                        <span style="color: red">●</span> Number fishing licenses, <br>
                        <span style="color: red">●</span> Quality of fresh waters for fishing
                      </td>
                      <td>
                        <span style="color: red">●</span>
                          Number of
                          visitors (to thermal,
                          mineral and mud
                          springs and
                          beaches, to Natural
                          Reserve areas)
                          speleology sites
                      </td>
                      <td>
                        <span style="color: red">●</span> Number of visitors (waterfowl hunters and fishermen)<br>
                        <span style="color: red">●</span> Number of fishing licenses <br>
                        <span style="color: red">●</span> Tourism revenue
                      </td>
                  </tr>
                  <tr>
                      <td rowspan="5">Intellectual and
                          representative interactions</td>
                      <td>Scientific</td>
                      <td colspan="4">
                        <span style="color: orange">●</span> Monitoring sites (by scientists) <br>
                        <span style="color: grey">●</span> Number of scientific projects, articles, studies <br>
                        <span style="color: red">●</span> Classified sites (world heritage, label European tourism)
                      </td>
                  </tr>
                  <tr>
                      <td>Educational</td>
                      <td colspan="4">
                        <span style="color: orange">●</span> Number of visitors <br>
                        <span style="color:green;">●</span> National Parks and Natura 2000 sites
                      </td>
                  </tr>
                  <tr>
                      <td>Heritage, cultural</td>
                      <td colspan="4">
                        <span style="color: orange">●</span> Number of visitors <br>
                        <span style="color: orange">●</span> Natural heritage and cultural sites  <br>
                        <span style="color: red">●</span> Number of annual cultural activities organise</td>
                  </tr>
                  <tr>
                      <td>Entertainment</td>
                      <td colspan="4">Number of visitors  (surface or number of wetlands located next to a bike path) </td>
                  </tr>
                  <tr>
                      <td>Aesthetic</td>
                      <td colspan="4">
                        <span style="color: orange">●</span> Number of visitors  <br>
                        <span style="color: orange">●</span> Contrasting landscapes (lakes close to mountains)  <br>
                        <span style="color: green;">●</span> Proximity to urban areas of scenic rivers or lake 
                      </td>
                  </tr>
                  <tr>
                    <td rowspan="4">
                      Spiritual, symbolic and other interactions with biota, ecosystems, and land/seascapes [environmen tal settings]
                    </td>
                    <td rowspan="2">Spiritual and/or emblematic </td>
                    <td>Symbolic</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> National species or habitat types
                    </td>
                    <td>
                      <span style="color: orange">●</span> Number of visitors (to places where springs and streams with GW origin made them historic and religious sites
                    </td>
                    <td>
                      <span style="color: orange">●</span> National species or habitat types
                    </td>
                  </tr>
                  <tr>
                    <td>Sacred and/or religious</td>
                    <td colspan="2">
                      <span style="color: red">●</span> sacred/religious sites (catastrophic events, religious places)
                    </td>
                    <td></td>
                    <td>
                      <span style="color: red">●</span> sacred/religious sites (catastrophic events, religious places)
                    </td>
                  </tr>
                  <tr>
                    <td rowspan="2">Other cultural outputs</td>
                    <td>Existence</td>
                    <td colspan="2">
                      <span style="color: orange">●</span> Number of visitors (to National Parks including lakes)  <br>
                      <span style="color: orange">●</span> Number of fishing licenses
                    </td>
                    <td>
                      <span style="color: orange">●</span> Number of visitors (to hot mineral spring waters)
                    </td>
                    <td>
                      <b>See rivers and lakes </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Bequest</td>
                    <td colspan="2">
                      <span style="color: grey">●</span> Number of association registered on animals, plants, environment, naturism
                    </td>
                    <td></td>
                    <td><b>See rivers and lakes</b><br><span style="color: red">Social perception of wetlands</span>  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
                    <!--    <span
                          v-if="policy.code === 'policyUse' || policy.code === 'data'"
                          class="bold-font"
                        >{{indicatorValue.data[policy.code].value}} - </span> -->
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
                    <!--    <span
                          v-if="policy.code === 'policyUse' || policy.code === 'data'"
                          class="bold-font"
                        >{{indicatorValue.data[policy.code].value}} - </span> -->
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
                    <!--    <span
                          v-if="policy.code === 'policyUse' || policy.code === 'data'"
                          class="bold-font"
                        >{{indicatorValue.data[policy.code].value}} - </span> -->
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
                    <!--    <span
                          v-if="policy.code === 'policyUse' || policy.code === 'data'"
                          class="bold-font"
                        >{{indicatorValue.data[policy.code].value}} - </span> -->
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




const bise = {
  "urban": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "code": 'habitat',
            "indicator": {
              "land": {
                "name": "Land annually taken for built-up areas per person (m2/person/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "estat": {
                    value: 1,
                  },
                }
              },
              "soil": {
                "name": "Soil sealing (hs/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "code": "climate",
            "indicator": {
              "number": {
                "name": "Number of combined tropical nights(abnose 20C) and hot days",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "code": "pollution",
            "indicator": {
              "emissions": {
                "name": "Emissions of NO2, PM10",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 2,
                  },
                  "noise": {
                    value: 1,
                  },
                  "ambientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "number-of-annual-occurrences": {
                "name": "Number of annual occurrences of maximum daily 8 hour mean of O3 > 120 µg/m3 (number/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "noise": {
                    value: 1,
                  },
                  "ambientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "number-of24": {
                "name": "Number of annual occurrences of 24 hour mean of PM10 > 50 µg/m3 (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "noise": {
                    value: 1,
                  },
                  "ambientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "number-of-annual-hourly": {
                "name": "Number of annual occurrences of hourly mean of NO2> 200 µg/m3 (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "noise": {
                    value: 1,
                  },
                  "ambientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "number-of-annual-traffic": {
                "name": "Number of annual occurrences of (traffic) noise at levels exceeding 55 db(A) during the day and 50 db(A) during the nights (possibly broken down over the source of noise) (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "noise": {
                    value: 1,
                  },
                  "ambientAirQuality": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "code": "over-exploitation",
            "indicator": {}
          },
          {
            "name": "Introductions of invasive alien species",
            "code": "alien-species",
            "indicator": {
              "invasive-alien": {
                "name": "Number of annual introductions of invasive alien species* (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              }
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "urban-temp": {
                "name": "Urban temperature (°C)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "noise-levels": {
                "name": "Noise levels (dB(A))",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                }
              },
              "percentage-population-exposed-road-noise": {
                "name": "Percentage of population exposed to road noise within urban areas above 55 dB during the day or  above 50 dB during the night (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "percentage-population-exposed-air-pollution": {
                "name": "Percentage of population exposed to air pollution above the standards (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 9,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "concentration-of-air-pollutants": {
                "name": "Concentration of air pollutants NO2, PM10, PM2.5, O3 (μg/m3)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 7,
                  },
                  "data": {
                    value: 2,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "circular": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "concentration-of-nutrients": {
                "name": "Concentration of nutrients and biological oxygen demand in surface water (mg/L) (SEBI 016)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 9,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "bathing-water-quality": {
                "name": "Bathing water quality (quality levels)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "percentage-of-population-urban-waste-water": {
                "name": "Percentage of population connected to urban waste water collection and treatment plants (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "number-of-inHabitats-per-area": {
                "name": "Number of inHabitats per area (number/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                }
              },
              "artificial-area-per-inHabitat": {
                "name": "Artificial area per inHabitat (m2/person)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "": {
                    value: 1,
                  },
                  "": {
                    value: 1,
                  },
                }
              },
              "length-of-road": {
                "name": "Length of the road network per area (km/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "": {
                    value: 1,
                  },
                  "": {
                    value: 1,
                  },
                }
              },
              "percent-of-built-up": {
                "name": "Percent of built-up area (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "weighted-urban-proliferation": {
                "name": "Weighted Urban Proliferation (Urban Permeation Units/m2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "imperviousness": {
                "name": "Imperviousness (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "sites-with-contaminated-soil": {
                "name": "Sites with contaminated soil (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "percentage-of-urban-green": {
                name: "Percentage of urban green space (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "3",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "percentage-of-natural-area": {
                name: "Percentage of natural area (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "percentage-of-agricultural-area": {
                name: "Percentage of agricultural area (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "percentage-of-abandoned-area": {
                name: "Percentage of abandoned area (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "canopy": {
                name: "Canopy coverage (ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "foliage-damage-crown-dieback": {
                name: "Foliage damage crown dieback (number of trees affected)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 0,
                  },
                }
              },
              "connectivity-of-urban-green": {
                name: "Connectivity of urban green spaces (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "fragmentation-of-urban-green-space": {
                name: "Fragmentation of urban green space (Mesh density per pixel)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "number-abundance-bird-species": {
                name: "Number and abundance of bird species (number; number/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                }
              },
              "number-of-lichen-species": {
                name: "Number of lichen species (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                }
              },
              "number-of-invasive-alien-species": {
                name: "Number of invasive alien species (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "percentage-urban-covered-natura": {
                name: "Percentage of urban area covered by Natura 2000 area (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "bulk-density": {
                name: "Bulk density (kg/m3)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "soil-biodiversity": {
                name: "Soil biodiversity (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                }
              },
              "earthworms": {
                name: "Earthworms (number, number/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                }
              },
              "soil-organic-carbon": {
                name: "Soil organic carbon (SOC) (% or g/kg)",
                "bold": true,
                "data": { }
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "available-water-capacity": {
                name: "Available water capacity (index)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
  },
  "crop": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "land": {
                "name": "Land take (%/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "change-in-ecosystem": {
                "name": "Change in ecosystem extent  (%/year) (SEBI004) (AEI10.1)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "intensification-extensification": {
                "name": "Intensification / extensification (AEI12)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 2,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "change-in-climate-parameters": {
                "name": "Change in climate parameters (including drought): long term changes (>=30-year) ",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "past-trend": {
                "name": "Past trend in summer soil moisture content  (l/m3/10 years)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Ndeposition": {
                "name": "N deposition (kg/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 0,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                }
              },
              "Gross-nutrient-balance": {
                "name": "Gross nutrient balance kg/ha/year (SEBI 019) (AEI15)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 8,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Gross-phosphorus-balance": {
                "name": "Gross phosphorus balance (kg/ha UAA/year) (AEI16)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Mineral-fertilizer-consumption)": {
                "name": "Mineral fertilizer consumption (kg/ha/year) (SEBI 019) (AEI5)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Pesticide-use": {
                "name": "Pesticide use (kg active ingredient/ha/year) (AEI06)",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            name: "Over-exploitation",
            "indicator": {
              "Water-abstraction": {
                "name": "Water abstraction (million m3/year) (AEI20)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Human-Appropriation-of-Net-Primary-Production": {
                "name": "Human Appropriation of Net Primary Production (HANPP) (kg C/m2/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            name: "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions-invasive-alien-species": {
                name: "Number of annual introductions of invasive alien species (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Frequency-of-pest": {
                name: "Frequency of pest and disease outbreaks",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                }
              },
            }
          },
          {
            name: "Others",
            "indicator": {
              "Soil-erosion": {
                name: "Soil erosion (tonne/ha/year) (AEI21)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Loss-of-organic-matter": {
                name: "Loss of organic matter [%SOC/year(s)]",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            name: "Environmental quality",
            "indicator": {
              "Nitrogen-concentration-surface-and-groundwater": {
                name: "Nitrogen concentration in surface and groundwater in Nitrogen Vulnerable Zones (mg/l)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Heavy-metal-concentrations": {
                name: "Heavy metal concentrations in soil (mg/kg)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              }
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Grassland-habitat-fragmentation": {
                name: "Grassland habitat fragmentation (meshes/1000 km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Landscape-fragmentation-index": {
                name: "Landscape fragmentation index (index)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                }
              },
              "Crop-diversity": {
                name: "Crop diversity/ 10 km*10km (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Crop-rotation": {
                name: "Crop rotation (functional crop groups) (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Density-semi-natural-elements": {
                name: "Density of semi-natural elements (%/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Connectivity of semi-natural elements (index)": {
                name: "Connectivity of semi-natural elements (index)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Share-fallow-land": {
                name: "Share of fallow land in UAA (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Share-High-Nature-Value-farmland": {
                name: "Share of High Nature Value farmland in agricultural area (%) (SEBI 020) (AEI23)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "4",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Share-organic-farming": {
                name: "Share of organic farming in UAA  (%)  (SEBI 020) (AEI4)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Livestock-density": {
                name: "Livestock density (LU/ha)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Farmland-Bird-Indicator": {
                name: "Farmland Bird Indicator (index) (SEBI 001) (AEI2.4.1)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "12",
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Grassland-Butterfly-Indicator": {
                name: "Grassland Butterfly Indicator (index) (SEBI 001)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Mammals-amphibians-reptiles-agri": {
                name: "Mammals, amphibians, reptiles impacted by changes in agriculture (Red List index)",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: "0",
                  },
                  "sdg": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Wild-pollinators": {
                name: "Wild pollinators (where available) (species richness)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Conservation-status-trends-habitats": {
                name: "Conservation status and trends of habitats of Community interest associated to grassland (%) (SEBI 005)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "8",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Percentage-agroecosystems-covered": {
                name: "Percentage of agroecosystems covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "nature": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "EU-Population-status-trends-bird-cropland-grassland": {
                name: "EU Population status and trends of bird species associated to cropland and grassland (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "6",
                  },
                  "data": {
                    value: 2,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Conservation-status-trends-species-Community-interest-cropland-grassland": {
                name: "Conservation status and trends of species of Community interest associated to cropland and grassland (%) (SEBI 003)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "6",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Soil-organic-carbon": {
                name: "Soil organic carbon (SOC) (% or g/kg)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Soil-pH": {
                name: "Soil  pH (pH)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Soil-erodibility": {
                name: "Soil erodibility [K-factor  (tonne ha h/MJ mm)]",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "5",
                  },
                  "data": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Bulk-density": {
                name: "Bulk density (kg/m3)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "5",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Soil-biodiversity": {
                name: "Soil biodiversity (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Water-availability": {
                name: "Water availability (m3/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Gross-primary-production": {
                name: "Gross primary production (kJ/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Available-water-capacity": {
                name: "Available water capacity (index)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "": {
                name: "",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
  },
  "grass": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "land": {
                "name": "Land take (%/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "change-in-ecosystem": {
                "name": "Change in ecosystem extent  (%/year) (SEBI004) (AEI10.1)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "intensification-extensification": {
                "name": "Intensification / extensification (AEI12)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 2,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "change-in-climate-parameters": {
                "name": "Change in climate parameters (including drought): long term changes (>=30-year) ",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "past-trend": {
                "name": "Past trend in summer soil moisture content  (l/m3/10 years)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Ndeposition": {
                "name": "N deposition (kg/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 0,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                }
              },
              "Gross-nutrient-balance": {
                "name": "Gross nutrient balance kg/ha/year (SEBI 019) (AEI15)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 8,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Gross-phosphorus-balance": {
                "name": "Gross phosphorus balance (kg/ha UAA/year) (AEI16)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Mineral-fertilizer-consumption)": {
                "name": "Mineral fertilizer consumption (kg/ha/year) (SEBI 019) (AEI5)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Pesticide-use": {
                "name": "Pesticide use (kg active ingredient/ha/year) (AEI06)",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            name: "Over-exploitation",
            "indicator": {
              "Water-abstraction": {
                "name": "Water abstraction (million m3/year) (AEI20)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Human-Appropriation-of-Net-Primary-Production": {
                "name": "Human Appropriation of Net Primary Production (HANPP) (kg C/m2/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            name: "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions-invasive-alien-species": {
                name: "Number of annual introductions of invasive alien species (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Frequency-of-pest": {
                name: "Frequency of pest and disease outbreaks",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                }
              },
            }
          },
          {
            name: "Others",
            "indicator": {
              "Soil-erosion": {
                name: "Soil erosion (tonne/ha/year) (AEI21)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Loss-of-organic-matter": {
                name: "Loss of organic matter [%SOC/year(s)]",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            name: "Environmental quality",
            "indicator": {
              "Nitrogen-concentration-surface-and-groundwater": {
                name: "Nitrogen concentration in surface and groundwater in Nitrogen Vulnerable Zones (mg/l)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Heavy-metal-concentrations": {
                name: "Heavy metal concentrations in soil (mg/kg)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              }
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Grassland-habitat-fragmentation": {
                name: "Grassland habitat fragmentation (meshes/1000 km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Landscape-fragmentation-index": {
                name: "Landscape fragmentation index (index)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                }
              },
              "Crop-diversity": {
                name: "Crop diversity/ 10 km*10km (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Crop-rotation": {
                name: "Crop rotation (functional crop groups) (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Density-semi-natural-elements": {
                name: "Density of semi-natural elements (%/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Connectivity of semi-natural elements (index)": {
                name: "Connectivity of semi-natural elements (index)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Share-fallow-land": {
                name: "Share of fallow land in UAA (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Share-High-Nature-Value-farmland": {
                name: "Share of High Nature Value farmland in agricultural area (%) (SEBI 020) (AEI23)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "4",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Share-organic-farming": {
                name: "Share of organic farming in UAA  (%)  (SEBI 020) (AEI4)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Livestock-density": {
                name: "Livestock density (LU/ha)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Farmland-Bird-Indicator": {
                name: "Farmland Bird Indicator (index) (SEBI 001) (AEI2.4.1)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "12",
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Grassland-Butterfly-Indicator": {
                name: "Grassland Butterfly Indicator (index) (SEBI 001)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Mammals-amphibians-reptiles-agri": {
                name: "Mammals, amphibians, reptiles impacted by changes in agriculture (Red List index)",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: "0",
                  },
                  "sdg": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Wild-pollinators": {
                name: "Wild pollinators (where available) (species richness)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Conservation-status-trends-habitats": {
                name: "Conservation status and trends of habitats of Community interest associated to grassland (%) (SEBI 005)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "8",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Percentage-agroecosystems-covered": {
                name: "Percentage of agroecosystems covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "nature": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "EU-Population-status-trends-bird-cropland-grassland": {
                name: "EU Population status and trends of bird species associated to cropland and grassland (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "6",
                  },
                  "data": {
                    value: 2,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Conservation-status-trends-species-Community-interest-cropland-grassland": {
                name: "Conservation status and trends of species of Community interest associated to cropland and grassland (%) (SEBI 003)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "6",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Soil-organic-carbon": {
                name: "Soil organic carbon (SOC) (% or g/kg)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: "2",
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Soil-pH": {
                name: "Soil  pH (pH)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Soil-erodibility": {
                name: "Soil erodibility [K-factor  (tonne ha h/MJ mm)]",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "5",
                  },
                  "data": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Bulk-density": {
                name: "Bulk density (kg/m3)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "5",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Soil-biodiversity": {
                name: "Soil biodiversity (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Water-availability": {
                name: "Water availability (m3/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
              "Gross-primary-production": {
                name: "Gross primary production (kJ/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Available-water-capacity": {
                name: "Available water capacity (index)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "1",
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "": {
                name: "",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
  },
  "forest": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Fragmentation-roads": {
                "name": "Fragmentation by roads and other linear features (index)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "res": {
                    value: 2,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Fragmentation-forest": {
                "name": "Fragmentation by forest cover loss (index) ",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "ResFactsheet": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Forest-cover-change": {
                "name": "Forest cover change and deforestation (ha/year)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 5,
                  },
                  "7eapThree": {
                    value: 2,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "StateEnergy": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Landslides": {
                "name": "Landslides (number/year, area/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Soil-sealing": {
                "name": "Soil sealing (ha/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "Forest-damage-storms": {
                "name": "Forest damage by storms and/or other extreme weather events (damage: ha/year or timber m3/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Change-climate-parameters": {
                "name": "Change in climate parameters (including drought): long term changes (>=30-year) (e.g.: °C, mm, indexes) ",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Number-fires": {
                "name": "Number of fires (number/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Burnt-area": {
                "name": "Burnt area (ha/year)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Change-soil-moisture": {
                "name": "Change in soil moisture (water stress) (indexes)",
                "bold": true,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Drought-heat-tree-mortality": {
                "name": "Drought and heat induced tree mortality, drought stress (area/time unit)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Formation-tropospheric-ozone": {
                "name": "Formation of tropospheric ozone (ground level ozone) (ppb/year)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Deposition-nitrogen": {
                "name": "Deposition of nitrogen, sulphate, sulphur, calcium and magnesium (kg/ha/year)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 4,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Excessive-nutrient": {
                "name": "Excessive nutrient loading: Nitrogen in soil (kg/ha/year), C/N ratio in soil (ratio) ",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Acidification": {
                "name": "Acidification (kg S/ha/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                }
              },
              "Industrial": {
                "name": "Industrial (point) and diffuse soil pollution (heavy metals concentration) (mg/kg/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 0,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "According-EU-Forest-Strategy": {
                "name": "According to the EU Forest Strategy (COM(2013) 659 final) sustainable forest management means using forests and forest land in a way, and at a rate, that maintains their biodiversity, productivity, regeneration capacity, vitality and their potential to fulfil, now and in the future, relevant ecological, economic and social functions, at local, national, and global levels, and that does not cause damage to other ecosystems. For the purpose of MAES the notion of 'over-exploitation' comprises all forest management practices with adverse effects on these objectives, and which can be assessed by an array of indicators embracing relevant aspects of forest condition and forestry practices.",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "partially",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
            }
          },
          {
            "name": "Over-harvesting",
            "indicator": {
              "Long-term-ratio-annual-fellings": {
                "name": "Long term ratio of annual fellings (m3/ha/year) to net annual increment (m3/ha/year) (SEBI 017) See note 2",
                "bold": true,
                "data": {
                  "sum": {
                    value: 6,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "partially",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions": {
                "name": "Number of annual introductions of invasive alien species*  (number/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 2,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "not avaialble for forest sp",
                  },
                  "timeSeriesData": {
                    value: "not avaialble for forest sp",
                  },
                }
              },
            }
          },
          {
            "name": "Other",
            "indicator": {
              "Insect-outbreaks": {
                "name": "Insect outbreaks, pest damage and parasites (damage: ha/year or timber m3/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yesp",
                  },
                }
              },
              "Damage-wildlife-herbivores": {
                "name": "Damage by wildlife and herbivores (damage: ha/year or timber m3/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "partially",
                  },
                  "timeSeriesData": {
                    value: "partially",
                  },
                }
              },
              "Soil-erosion": {
                "name": "Soil erosion (kg/ha/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 4,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "Percentage-forest-designated-protective-forests": {
                "name": "Percentage of forest designated as 'protective forests' (soil, water, other functions and infrastructure and managed resources) (%)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "not harmonised",
                  },
                  "timeSeriesData": {
                    value: "not harmonised",
                  },
                }
              },
              "Percentage-forest-management": {
                "name": "Percentage of forest under management plan or equivalent instruments (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 2,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "country level",
                  },
                  "timeSeriesData": {
                    value: "country level",
                  },
                }
              },
              "Tropospheric-ozone-concentration": {
                "name": "Tropospheric ozone (ground level ozone) concentration (ppb)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Concentration-nitrogen-sulphate-sulphur-calcium-magnesium": {
                "name": "Concentration of nitrogen, sulphate, sulphur, calcium and magnesium (kg/ha)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 4,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Deadwood": {
                "name": "Deadwood (m3/ha) (SEBI 018)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Plant-functional-types": {
                "name": "Plant functional types (typology)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Forest-types": {
                "name": "Forest types (typology)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Forest-age-structure": {
                "name": "Forest age structure (% of forest in age categories)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Seral-diversity": {
                "name": "Seral diversity (typology)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Defoliation": {
                "name": "Defoliation (% of trees)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Discolouration": {
                "name": "Discolouration (% of trees)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Tree-height": {
                "name": "Tree height (m)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "no",
                  },
                }
              },
              "Tree-cover-density": {
                "name": "Tree cover density (%)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                }
              },
              "Tree-crown-size": {
                "name": "Tree crown size (diameter, m)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Forest-fragmentation-connectivity": {
                "name": "Forest fragmentation and connectivity (index) (SEBI 013) (CI)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "res": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Biomass-volume": {
                "name": "Biomass volume (growing stock) (m3/ha) (SEBI 017)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Carbon-stock": {
                "name": "Carbon stock (tonne/ha)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Forest-area": {
                "name": "Forest area (km2)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 7,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "StateEnergy": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Forest-structural-heterogeneity": {
                "name": "Forest structural heterogeneity (index from remote sensing)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Forest-structural-homogeneity": {
                "name": "Forest structural homogeneity (index from remote sensing)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Canopy-volume": {
                "name": "Canopy volume (from remote sensing) (m3)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Naturalness": {
                "name": "Naturalness (index or typology)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "not operational",
                  },
                  "timeSeriesData": {
                    value: "no",
                  },
                }
              },
              "Invasive-alien-species": {
                "name": "Invasive alien species (number or richness) (number of species/area unit)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 2,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "not avaialble for forest sp",
                  },
                  "timeSeriesData": {
                    value: "not avaialble for forest sp",
                  },
                }
              },
              "Leaf-related-indicators": {
                "name": "Leaf-related indicators: size (mm), form (typology), type (typology), anatomy (typology), optical properties (reflectance measurements), wettability traits (g/m2), dry matter content (%), specific leaf area (m2/kg), mass per area (g/m2), carbon content (%), nitrogen content (%), phosphorus content (%), pigment content (%), water content (%)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Pigment-content": {
                "name": "Pigment content (chlorophyll, carotene xanthophyll)  (μg/g)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Content-nitrogen-etc": {
                "name": "Content of: nitrogen, phosphorous, carbon, lignin, cellulose, phenole, plant water content, wax, starch, sugar (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Species-diversity-richness": {
                "name": "Species diversity, richness (number and abundance of species, including vascular plants, vertebrates, etc) (number of species, indexes)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "partially",
                  },
                  "timeSeriesData": {
                    value: "partially",
                  },
                }
              },
              "Phylogenetic-diversity": {
                "name": "Phylogenetic diversity (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Forest-tree-species": {
                "name": "Forest tree species (number of species or species richness), tree sp. composition (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Genetic-variability": {
                "name": "Genetic variability (index; % of forest managed for the conservation and utilization of forest tree genetic resources)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                }
              },
              "Threatened-forest-species": {
                "name": "Threatened forest species (red list index) (SEBI 002) (CI)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 2,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "not avaialble for forest sp",
                  },
                  "timeSeriesData": {
                    value: "not avaialble for forest sp",
                  },
                }
              },
              "Understory-vegetation": {
                "name": "Understory vegetation (species richness) (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Rove-ground-beetles": {
                "name": "Rove and ground beetles (species richness) (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Bryophyte-moss-liverwort-lichen-fungal": {
                "name": "Bryophyte, moss, liverwort, lichen and fungal species richness (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            name: "",
            "indicator": {
              "Percentage-forest-Natura": {
                "name": "Percentage of forest covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 5,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "HD": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Percentage-forest-Nationally": {
                "name": "Percentage of forest covered by Nationally Designated Areas (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 3,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Threatened-forests-related-habitats": {
                "name": "Threatened forests related habitats (Red List index) (%, number, area) (CI)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Conservation-status-trends-habitats": {
                "name": "Conservation status and trends of habitats of Community interest associated to forest (%) (SEBI 005)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 6,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "HD": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Abundance-distribution-common-forest-birds": {
                "name": "Abundance and distribution of common forest birds (index) (SEBI 001) (CI)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 8,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "BD": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Conservation-status-trends-species": {
                "name": "Conservation status and trends of species of Community interest associated to forest (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 6,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "HD": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "EU Population status and trends of bird species of Community interest associated to forest (%)": {
                "name": "EU Population status and trends of bird species of Community interest associated to forest (%)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 4,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "HD": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Soil-biodiversity": {
                "name": "Soil biodiversity  (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes in 2018",
                  },
                }
              },
              "Soil-pH": {
                "name": "Soil pH (pH)",
                "bold": false,
                "data": {
                  "sum": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Soil-organic-carbon": {
                "name": "Soil organic carbon (SOC) (% or g/kg)",
                "bold": true,
                "data": {
                  "sum": {
                    value: 2,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "forestEurope": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Soil-moisture": {
                "name": "Soil moisture (water stress) (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Bulk density (kg/m3)": {
                "name": "Bulk density (kg/m3)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                }
              },
              "Soil-erodibility": {
                "name": "Soil erodibility (K-factor) (tonne ha h/MJ mm)",
                "bold": true,
                "data": {
                  "sum": {
                    value: "4",
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Photosynthesis": {
                "name": "Photosynthesis (e.g. indexes: NDVI (Normalized Difference Vegetation Index), VCI Copernicus (Vegetation Condition Index), fPAR (Fraction of Photosynthetically active radiation), LAI (Leaf Area Index)) (CI)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Chlorophyll-fluorescence": {
                "name": "Chlorophyll fluorescence (remote sensing proxies)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Carbon-sequestration": {
                "name": "Carbon sequestration (Dry matter productivity Copernicus) (tonne/ha/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                }
              },
              "Plant-productivity": {
                "name": "Plant productivity (NPP) (tonne/ha/year)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "yes",
                  },
                }
              },
              "Evapotranspiration": {
                "name": "Evapotranspiration (l/ha/day)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Leaf-respiration": {
                "name": "Leaf respiration (net ecosystem–atmosphere CO2 exchange)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Leaf-phenology": {
                "name": "Leaf phenology type, leaf age, leaf development (measures according to annual cycles)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Plant-canopy-phenology": {
                "name": "Plant and canopy phenology (measures according to annual cycles)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Carbon-dioxide-exchange": {
                "name": "Carbon dioxide exchange and carbon balance (net ecosystem–atmosphere CO2 exchange)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
              "Greening-response": {
                "name": "Greening response (remote sensing proxies)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil-attributes": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Available-water-capacity": {
                "name": "Available water capacity (index)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes",
                  },
                  "timeSeriesData": {
                    value: "no",
                  },
                }
              },
              "Nutrient-availability": {
                "name": "Nutrient availability (nitrogen and phosphorus) (mg/kg)",
                "bold": false,
                "data": {
                  "sum": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "yes (samples)",
                  },
                  "timeSeriesData": {
                    value: "yes (samples)",
                  },
                }
              },
            }
          }
        ]
      }
    },
  },
  "healthland": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Change-surface-area-conversion": {
                "name": "Change of surface area due to conversion (%/year) (SEBI004)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Landscape": {
                "name": "Landscape abandonment (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Change-forest-extent": {
                "name": "Change in forest extent",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Critical-load-exceedance-nitrogen": {
                "name": "Critical load exceedance for nitrogen (eq/ha/y) (SEBI 009)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions-invasive-alien-species": {
                "name": "Number of annual introductions of invasive alien species* (number/year)",
                "bold": false,
                "data": {
                }
              }
            }
          },
          {
            "name": "Other",
            "indicator": {
              "Soil-erosion": {
                "name": "Soil erosion (tonne/ha/year) (AEI21)",
                "bold": false,
                "data": {
                }
              },
              "Soil-sealing": {
                "name": "Soil sealing (ha/year)",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Landscape-fragmentation": {
                "name": "Landscape fragmentation (CI)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  }
                }
              },
              "Threatened-heathlands-related-habitats": {
                "name": "Threatened heathlands related habitats (%, number, area)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Conservation-status-trends-habitats": {
                "name": "Conservation status and trends of habitats of Community interest associated to heathlands (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 7,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "EU-Population-status-trends-bird-species": {
                "name": "EU Population status and trends of bird species associated to heathland (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Natura": {
                "name": "Percentage of heathlands covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Nationally": {
                "name": "Percentage of heathlands covered by Nationally Designated Areas (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Soil-biodiversity": {
                "name": "Soil biodiversity  (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                },
              },
              "Soil-organic-carbon": {
                "name": "Soil organic carbon (SOC) (% or g/kg)",
                "bold": false,
                "data": {
                },
              },
              "Soil-erodibility": {
                "name": "Soil erodibility [K-factor  (t ha h/MJ mm)]",
                "bold": false,
                "data": {
                },
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil-attributes": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Available-water-capacity)": {
                "name": "Available water capacity (index)",
                "bold": false,
                "data": {
                }
              },
              "Soil-nutrients-availability": {
                "name": "Soil nutrients availability (nitrogen & phosphorus) (mg/kg)",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
  },
  "sparse": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Change-surface-conversion": {
                "name": "Change of surface area due to conversion (%) (SEBI 004)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Critical-load": {
                "name": "Critical load exceedance for nitrogen (eq/ha/y) (SEBI 009)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": true,
                "data": {
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions-invasive-alien-species": {
                name: "Number of annual introductions of invasive alien species* (number/year)",
                "bold": false,
                "data": {
                }
              }
            }
          },
          {
            "name": "Other",
            "indicator": {
              "Soil-erosion": {
                name: "Soil erosion (tonne/ha/year) (AEI21)",
                "bold": false,
                "data": {
                }
              },
              "Soil-sealing": {
                name: "Soil sealing (ha/year)",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Landscape-fragmentation": {
                "name": "Landscape fragmentation (CI)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                }
              },
              "Threatened-sparsely-vegetated": {
                "name": "Threatened sparsely vegetated related habitats (%, number, area)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Conservation-status-trends-habitats": {
                "name": "Conservation status and trends of habitats of Community interest associated to heathlands (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 7,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "EU-Population-status-trends-bird-species": {
                "name": "EU Population status and trends of bird species associated to heathland (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Natura": {
                "name": "Percentage of heathlands covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Nationally": {
                "name": "Percentage of heathlands covered by Nationally Designated Areas (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Soil-biodiversity": {
                "name": "Soil biodiversity  (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                },
              },
              "Soil-organic-carbon": {
                "name": "Soil organic carbon (SOC) (% or g/kg)",
                "bold": false,
                "data": {
                },
              },
              "Soil-erodibility": {
                "name": "Soil erodibility [K-factor  (t ha h/MJ mm)]",
                "bold": false,
                "data": {
                },
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil-attributes": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Available-water-capacity)": {
                "name": "Available water capacity (index)",
                "bold": false,
                "data": {
                }
              },
              "Soil-nutrients-availability": {
                "name": "Soil nutrients availability (nitrogen & phosphorus) (mg/kg)",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
  },
  "wetland": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Change-surface-conversion": {
                "name": "Change of surface area due to conversion (%) (SEBI 004)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "Climate-Impact-sensitivity": {
                "name": "Climate Impact and sensitivity (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Exposure-eutrophication": {
                "name": "Exposure to eutrophication (mol nitrogen eq/ha/y)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "Agriculture intensity pressure on wetlands (CI)": {
                "name": "Agriculture intensity pressure on wetlands (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions-invasive-alien-species": {
                "name": "Number of annual introductions of invasive alien species* (number/year)",
                "bold": false,
                "data": {
                }
              }
            }
          },
          {
            "name": "Other",
            "indicator": {
              "Soil-erosion": {
                "name": "Soil erosion (tonne/ha/year) (AEI21)",
                "bold": false,
                "data": {
                }
              },
              "Soil-sealing": {
                "name": "Soil sealing (ha/year)",
                "bold": false,
                "data": {
                }
              },
              "Loss-organic-matter": {
                "name": "Loss of organic matter [%SOC/year(s)]",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Landscape-fragmentation": {
                "name": "Landscape fragmentation (CI)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "res": {
                    value: 1,
                  },
                }
              },
              "Threatened-sparsely-vegetated": {
                "name": "Threatened sparsely vegetated related habitats (%, number, area)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                }
              },
              "Threatened-sparsely-vegetated": {
                "name": "Threatened sparsely vegetated related habitats (%, number, area)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: "0",
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Living-Planet-Index-Mediterranean": {
                "name": "Living Planet Index for Mediterranean wetlands (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                }
              },
              "Number-abundance-wetland ": {
                "name": "Number and abundance of wetland bird species (number/ha)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                }
              },
              "Community-Specialisation-Index": {
                "name": "Community Specialisation Index (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                  "EUwideData": {
                    value: "0",
                  },
                }
              },
              "Status-globally-threatened-wetland-dependent": {
                "name": "Status of globally-threatened wetland-dependent birds/amphibians",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Conservation-status-trends-habitats": {
                "name": "Conservation status and trends of habitats of Community interest associated to heathlands (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 8,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "EU-Population-status-trends-bird-species": {
                "name": "EU Population status and trends of bird species associated to heathland (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Natura": {
                "name": "Percentage of heathlands covered by Natura 2000 (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Percentage-heathlands-Nationally": {
                "name": "Percentage of heathlands covered by Nationally Designated Areas (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Soil-biodiversity": {
                "name": "Soil biodiversity  (DNA-based richness and abundance)",
                "bold": false,
                "data": {
                },
              },
              "Soil-organic-carbon": {
                "name": "Soil organic carbon (SOC) (% or g/kg)",
                "bold": false,
                "data": {
                },
              },
              "Bulk": {
                "name": "Bulk density (kg/m3)",
                "bold": false,
                "data": {
                },
              },
              "Soil-moisture": {
                "name": "Soil moisture (%)",
                "bold": false,
                "data": {
                },
              },
            }
          }
        ]
      }
    },
    "functional-soil": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "n.a.": {
                "name": "n.a.",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
    "functional-soil-attributes": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Available-water-capacity)": {
                "name": "Available water capacity (index)",
                "bold": false,
                "data": {
                }
              },
            }
          }
        ]
      }
    },
  },
  "rivers": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Land": {
                "name": "Land take (ha/year) (conversion from natural to artificial areas in floodplains or riparian areas)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Ecosystem-coverage": {
                "name": "Ecosystem coverage change (%/year) (related to SEBI 004)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "Change-water-temperature": {
                "name": "Change in water temperature (℃/year)",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "0",
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Critical-load-exceedance": {
                "name": "Critical load exceedance for nitrogen (eq/ha/year) (SEBI 009)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Nitrogen-phosphorus-fertilisers": {
                "name": "Nitrogen and phosphorus fertilisers use in the basin (kg/ha/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Gross-nutrient-balance": {
                "name": "Gross nutrient balance (kgN/ha/year; kgP/ha/year) (SEBI 019)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Consumption-pesticides": {
                "name": "Consumption of pesticides (tonne/year)",
                "bold": true,
                "colour": "red",
                "data": {
                  "7eapThree": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Waste-water-collection-treatment": {
                "name": "Waste water collection and treatment rate (%); or discharge of urban waste water (tonne N/year; tonne P/year) ",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "Water-abstractions": {
                "name": "Water abstractions (total or by sector) (m3/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Fish-catch": {
                "name": "Fish catch (tonne/year)*",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introductions": {
                "name": "Number of annual introductions (number/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "Chemical-status": {
                "name": "Chemical status (water) (CI)",
                "bold": false,
                "data": {
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Nitrogen-concentration": {
                "name": "Nitrogen concentration (mgN/L), phosphorus concentration (mgP/L), BOD (mg/L) (SEBI 016)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Organic-pollutants": {
                "name": "Organic pollutants, metals, pesticides concentration",
                "bold": true,
                "colour": "red",
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: "0",
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Bathing-water-quality": {
                "name": "Bathing water quality (quality levels)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Flow-alteration": {
                "name": "Flow alteration (%) (ex. days the environmental flow is not respected in a year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "waterFramework": {
                    value: 1,
                  },
                }
              },
              "Water-Exploitation": {
                "name": "Water Exploitation Index (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Land-cover": {
                "name": "Land cover in the drained area or floodplain (%) (ex. natural areas in floodplains; density of infrastructures in floodplains; artificial land cover or soil sealing in floodplains; agricultural land cover in floodplains; ecosystem coverage)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Density-dams": {
                "name": "Density of dams in the drained area (number/km2)**",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: "0",
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Ecological Status (CI)": {
                "name": "Ecological Status (CI)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Biological-quality-elements": {
                "name": "Biological quality elements (BQEs) collected to assess ecological status (ex. composition and abundance of aquatic flora, benthic invertebrate fauna, fish fauna, phytoplankton)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: "0",
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                }
              },
              "Presence of alien species": {
                "name": "Presence of alien species reported under the EU Regulation (1143/2014) (number)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: "0",
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Proportion-freshwater": {
                "name": "Proportion of freshwater covered by Natura 2000 (%) ",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Proportion-freshwater-Nationally": {
                "name": "Proportion of freshwater covered by Nationally Designated Areas (%)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Threatened-freshwater": {
                "name": "Threatened freshwater related habitats (%, number, area)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "sdg": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Conservation-status": {
                "name": "Conservation status and trends of habitats of Community interest associated to rivers & lakes (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "EU-population-status": {
                "name": "EU population status and trends of bird species associated to rivers & lakes (%) (CI)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 6,
                  },
                  "data": {
                    value: 1,
                  },
                  "biodiversity": {
                    value: 1,
                  },
                  "nature": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
  },
  "marine": {
    "pressure": {
      "details": {
        "class": [
          {
            "name": "Habitat conversion and degradation (land conversion)",
            "indicator": {
              "Extent-loss-habitat": {
                "name": "Extent of loss of habitat (MSFD-D6C4)  (%/year or km2/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Climate change",
            "indicator": {
              "Acidification": {
                "name": "Acidification (rate; per year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Temperature-increase": {
                "name": "Temperature increase (°C/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Sea-level-rise": {
                "name": "Sea level rise (cm/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: "0",
                  },
                  "data": {
                    value: "2",
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Pollution and nutrient enrichement",
            "indicator": {
              "Contaminants": {
                "name": "Contaminants (WFD/MSFD-D8) (tonne/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Nutrient-discharge": {
                "name": "Nutrient discharge (WFD) (N, P, tonne/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Nutrient-release-aquaculture": {
                "name": "Nutrient release from aquaculture (% increase/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Over-exploitation",
            "indicator": {
              "Fish-catch": {
                "name": "Fish catch (tonne/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "CFP": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Fish-mortality": {
                "name": "Fish mortality of commercially exploited fish and shellfish exceeding Fmsy (fishing martality at maximum sustainable yield) (MSFD-D3C1) (rate)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "CFP": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
            }
          },
          {
            "name": "Introductions of invasive alien species",
            "indicator": {
              "Number-annual-introduction": {
                "name": "Number of annual introduction of invasive alien species*  (MSFD-D2C1) (number/year)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Number-newly-introduced-non-indigenous-pecies": {
                "name": "Number of newly introduced non-indigenous species  from aquaculture (number/year)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: "0",
                  },
                  "marine": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                }
              },
            }
          }
        ],
      }
    },
    "environmental": {
      "details": {
        "class": [
          {
            "name": "Environmental quality",
            "indicator": {
              "Chemical-Status": {
                "name": "Chemical Status (WFD)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Oxidized-Orthophosphate-Nitrogen-Phosphorus-BOD": {
                "name": "Oxidized N, Orthophosphate, Nitrogen, Phosphorus, BOD (mg/L)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
              "Clorophyll-a-concentration": {
                "name": "Clorophyll-a concentration (MSFD-D5C2) (µg/l)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Disolved-oxygen": {
                "name": "Disolved oxygen at the bottom of the water column (MSFD-D5C5) (mg/l)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "marine": {
                    value: 1,
                  },
                }
              },
              "Bathing-water-quality": {
                "name": "Bathing water quality (quality levels)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 5,
                  },
                  "data": {
                    value: 2,
                  },
                  "nature": {
                    value: 1,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Contaminants-concentration-seafood": {
                "name": "Contaminants concentration in seafood (MSFD-D9C1) (mg/kg)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Composition-amount-spatial-distribution-litter": {
                "name": "Composition, amount and spatial distribution of litter (MSFD-D10C1) (number of items/m or /km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: "0",
                  },
                  "nature": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "agri": {
                    value: 1,
                  },
                }
              },
              "Spatial-distribution-temporal-extent": {
                "name": "Spatial distribution, temporal extent, and levels of anthropogenic impulsive sound sources (MSFD-D11C1) (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "marine": {
                    value: 1,
                  },
                }
              },
            }
          },
        ]
      }
    },
    "structural": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Ecological status (WFD)": {
                "name": "Ecological status (WFD)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                }
              },
              "Spatial-extent-distribution-physical-loss/disturbance": {
                "name": "Spatial extent and distribution of physical loss/disturbance to seabed (MSFD-D6C1 and D6C2) (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Spatial-extent-adversely-affected-benthic-habitat": {
                "name": "Spatial extent of adversely affected benthic habitat (MSFD-D6C3) (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Extent-loss-benthic-habitat-type": {
                "name": "Extent of loss of benthic habitat type (MSFD-D6C4) (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Extent-adverse-effect-bethic-habitat-type": {
                "name": "Extent of adverse effect on bethic habitat type (MSFD-D6C5)  (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Habitat-extent-condition": {
                "name": "Habitat extent and condition (MSFD-D1C5) (km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "species": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Population-abundance": {
                "name": "Population abundance (MSFD D1C2) (number of individuals/species or tonne/species)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "CFP": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "Abundance-spatial-distribution": {
                "name": "Abundance and spatial distribution of established non-indigenous species, particularly of invasive species, contributing significantly to adverse effects on particular species groups or broad habitat types (MSFD-D2C2) (number of individuals or tonne or km2 per species)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                }
              },
              "Proportion-species-group": {
                "name": "Proportion of the species group or spatial extent of the broad habitat type which is adversely altered due to non-indigenous species, particularly invasive non-indigenous species (MSFD-D2C3) (ratio or km2)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: "0",
                  },
                  "nature": {
                    value: 1,
                  },
                  "marine": {
                    value: 1,
                  },
                }
              },
              "Spawning-Stock-Biomass": {
                "name": "Spawning Stock Biomass (MSFD-D3C2) (tonne)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "CFP": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Age-size-distribution": {
                "name": "Age and size distribution of commercially-exploited species (MSFD-D3C3) (% or number or cm)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 4,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "CFP": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                }
              },
              "BQEs": {
                "name": "Biological quality elements (BQEs) collected to assess ecological status (ex. composition and abundance of aquatic flora, benthic invertebrate fauna, fish fauna, phytoplanktonne)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 1,
                  },
                  "data": {
                    value: 2,
                  },
                  "waterFramework": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                }
              },
              "Presence-invasive-alien-species": {
                "name": "Presence of invasive alien species reported under the EU Regulation (IAS 1143/2014)",
                "bold": false,
                "data": {
                  "policyUse": {
                    value: 2,
                  },
                  "data": {
                    value: 2,
                  },
                  "OtherEnvNoise": {
                    value: 1,
                  },
                  "OtherDirAmbientAirQuality": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
    "monitored": {
      "details": {
        "class": [
          {
            "name": "",
            "indicator": {
              "Natura-2000": {
                "name": "Natura 2000 and Marine protected areas (% surface area)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 8,
                  },
                  "data": {
                    value: 2,
                  },
                  "marine": {
                    value: 1,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Population-status-trends": {
                "name": "Population status and trends of bird species of Community interest associated to  transitional & coastal waters (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 8,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "DGenvReport": {
                    value: 1,
                  },
                  "7eapThree": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "BioSebi": {
                    value: 1,
                  },
                  "ResFactsheet": {
                    value: 1,
                  },
                  "SusEstat": {
                    value: 1,
                  },
                  "estatsdg": {
                    value: 1,
                  },
                  "EUindicatorSDGs": {
                    value: 1,
                  },
                }
              },
              "Conservation": {
                "name": "Conservation status and trends of habitats of Community interest associated to transitional & coastal waters (%)",
                "bold": true,
                "data": {
                  "policyUse": {
                    value: 3,
                  },
                  "data": {
                    value: 2,
                  },
                  "EUwideData": {
                    value: 1,
                  },
                  "trendData": {
                    value: 1,
                  },
                  "DGenvStrategic": {
                    value: 1,
                  },
                  "7eapNine": {
                    value: 1,
                  },
                  "EnvImplementation": {
                    value: 1,
                  },
                }
              },
            }
          }
        ]
      }
    },
  }
};
const biseEco = [
  {
    "code": "pressure_header",
    "name": "Pressure",
    "type": "header",
  },
  {
    "code": "pressure",
    "name": "Pressure on ecosystem",
  },
  {
    "code": "ecosystem_header",
    "name": "Ecosystem condition",
    "type": "header"
  },
  {
    "code": "environmental",
    "name": "Environmental quality",
  },
  {
    "code": "structural",
    "name": "Structural ecosystem attributes (general)",
  },
  {
    "code": "species",
    "name": "Structural ecosystem attributes based on species diversity and abundance",
  },
  {
    "code": "monitored",
    "name": "Structural ecosystem attributes monitored under the EU nature directives"
  },
  {
    "code": "soil",
    "name": "Structural soil attributes"
  },
  {
    "code": "functional-soil",
    "name": "Functional soil attributes"
  },
  {
    "code": "services_header",
    "name": "Ecosystem services",
    "type": "header"
  },
];
const biseHeader = [
  {
    "code": "urban",
    "name": "Urban",
    "abbreviation": "U",
    "colour": "#f35555",
  },
  {
    "code": "crop",
    "name": "Crop land",
    "abbreviation": "C",
    "colour": "#ffb808b5",
  },
  {
    "code": "grass",
    "name": "Grass land",
    "abbreviation": "G",
    "colour": "#8bc34aa6",
  },
  {
    "code": "forest",
    "name": "Forest & woodland",
    "abbreviation": "F",
    "colour": "#026e16c4",
  },
  {
    "code": "healthland",
    "name": "Healthland & shrub",
    "abbreviation": "H",
    "colour": "#460a578c",
  },
  {
    "code": "sparse",
    "name": "Sparse vegetation",
    "abbreviation": "S",
    "colour": "#808080",
  },
  {
    "code": "wetland",
    "name": "Wet land",
    "abbreviation": "W",
    "colour": "#dd6a12ab",
  },
  {
    "code": "rivers",
    "name": "Rivers lakes",
    "abbreviation": "RL",
    "colour": "#008eff8f",
  },
  {
    "code": "marine",
    "name": "Marine (4 types)",
    "abbreviation": "M",
    "colour": "#1853b2a8",
  }
];
const allPolicies = [
  {
    "code": "SUM",
    "name": "SUM",
  },
  {
    "code": "policyUse",
    "name": "Policy use (sum)",
  },
  {
    "code": "data",
    "name": "Data (sum)",
  },
  {
    "code": "biodiversity",
    "name": "Biodiversity Strategy",
  },
  {
    "code": "nature",
    "name": "Nature directives",
  },
  {
    "code": "waterFramework",
    "name": "Water framework directive",
  },
  {
    "code": "marine",
    "name": "Marine directive",
  },
  {
    "code": "CFP",
    "name": "CFP",
  },
  {
    "code": "sdg",
    "name": "SDGs international",
  },
  {
    "code": "OtherEnvNoise",
    "name": "Environmental Noise Directive",
  },
  {
    "code": "OtherDirAmbientAirQuality",
    "name": "Directive 2008/50/EC on ambient air quality and cleaner air for Europe",
  },
  {
    "code": "EUwideData",
    "name": "EU wide data",
  },
  {
    "code": "trendData",
    "name": "Trend data",
  },
  {
    "code": "DGenvStrategic",
    "name": "DG ENV Strategic Plan  2016-2020",
  },
  {
    "code": "DGenvReport",
    "name": "DG ENV Annual Activity Report and KPI",
  },
  {
    "code": "7eapThree",
    "name": "7th EAP three thematic objectives indicators",
  },
  {
    "code": "7eapNine",
    "name": "7th EAP nine objectives  indicators",
  },
  {
    "code": "EnvImplementation",
    "name": "Environmental Implementation Review and KPI",
  },
  {
    "code": "res",
    "name": "Resource Efficiency Scoreboard",
  },
  {
    "code": "circular",
    "name": "Circular Economy monitoring framework",
  },
  {
    "code": "agri",
    "name": "Agri-Environmental indicators",
  },
  {
    "code": "BioSebi",
    "name": "Biodiversity indicators - SEBI",
  },
  {
    "code": "10priorities",
    "name": "10 Commission priorities, impact indicators",
  },
  {
    "code": "ResFactsheet",
    "name": "Resource Efficiency Factsheet European Semester",
  },
  {
    "code": "SusEstat",
    "name": "Sustainable Development indicators (ESTAT)",
  },
  {
    "code": "estatsdg",
    "name": "ESTAT bridge report on SDGs",
  },
  {
    "code": "EUindicatorSDGs",
    "name": "EU indicators for the SDGs",
  },
  {
    "code": "EUwheel",
    "name": "EU Wheel of competitiveness (Dimension 4. Environment)",
  },
  {
    "code": "resilince",
    "name": "Resilience monitoring framework",
  },
  {
    "code": "pilot",
    "name": "Pilot Index on Environmental Pressures (component indicators)",
  },
  {
    "code": "ClimateProgress",
    "name": "Climate Action Progress Report and SWD ('Paris progress report')",
  },
  {
    "code": "StateEnergy",
    "name": "State of the Energy Union -SWD  key indicators- Decarbonisation dimention",
  },
  {
    "code": "forestEurope",
    "name": "Forest Europe",
  },
  {
    "code": "timeSeriesData",
    "name": "Time series data",
  },
  {
    "code": "HD",
    "name": "HD",
  },
  {
    "code": "BD",
    "name": "BD",
  }
];
const pressureOnAllHeaders = {
  "land": {
    "urban": true,
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "intensification": {
    "crop": true,
    "grass": true,
  },
  "forest": {
    "wetland": true,
  },
  "na": {
  },
  "emissions": {
    "urban": true,
  },
  "tropospheric": {
    "forest": true,
  },
  "nitrogen": {
    "crop": true,
    "grass": true,
    "rivers": true,
  },
  "critical": {
    "forest": true,
    "healthland": true,
    "sparse": true,
    "rivers": true,
  },
  "phosphorus": {
    "crop": true,
    "grass": true,
    "rivers": true,
  },
  "long-term": {
    "forest": true,
  },
  "invasive-alien": {
    "urban": true,
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
};
const pressures =  [
  {
    "name": "Habitat conversion and degradation (land conversion)",
    "code": 'habitat',
    "indicator": {
      "land": {
        "name": "Land take* (conversion of the ecosystem type into another type, mostly artificial area)",
        "bold": true,
      },
      "intensification": {
        "name": "Intensification / extensification (AEI12)",
        "bold": false,
      },
      "forest": {
        "name": "Change in forest extent",
        "bold": false,
      },
    }
  },
  {
    "name": "Climate change",
    "code": "climate",
    "indicator": {
      "na": {
        "name": "n.a",
        "bold": false,
      },
    }
  },
  {
    "name": "Pollution and nutrient enrichement",
    "code": "pollution",
    "indicator": {
      "emissions": {
        "name": "Emissions of NO2, PM10, PM2.5",
        "bold": true,
      },
      "tropospheric": {
        "name": "Formation of tropospheric ozone (ground level ozone)",
        "bold": true,
      },
      "nitrogen": {
        "name": "Gross nitrogen balance (SEBI 019) (AEI15)",
        "bold": false,
      },
      "critical": {
        "name": "Critical load exceedance of nitrogen(SEBI 009)",
        "bold": false,
      },
      "phosphorus": {
        "name": "Gross phosphorus balance (AEI16)",
        "bold": false,
      },
    }
  },
  {
    "name": "Over-harvesting in forests",
    "code": "harvesting",
    "indicator": {
      "long-term": {
        "name": "Long term ratio of annual fellings to net annual increment (SEBI 017)",
        "bold": false,
      }
    }
  },
  {
    "name": "Introductions of invasive alien species",
    "code": "alien-species",
    "indicator": {
      "invasive-alien": {
        "name": "Number of annual introductions of invasive alien species** (number/year)",
        "bold": false,
      }
    }
  }
];
const waterEcosystem = [
  {
    "name": "Environmental quality",
    "code": "environmental",
    "indicator": {
      "noise": {
        "name": "Percentage of population exposed to noise",
        "bold": true,
      },
      "pollution": {
        "name": "Percentage of population exposed to air pollution above the standards",
        "bold": true,
      },
      "concentration": {
        "name": "Concentration of air pollutants (NO2, PM10, PM2, O3)",
        "bold": true,
      },
      "connected": {
        "name": "Percentage of population connected to urban waste water collection and treatment plants",
        "bold": true,
      },
      "built": {
        "name": "Percentage built up area",
        "bold": true,
      },
      "tropospheric": {
        "name": "Tropospheric ozone (ground level ozone) concentration",
        "bold": true,
      },
      "nitrogen": {
        "name": "Concentration of nitrogen, sulphate, sulphur, calcium and magnesium (SEBI 009)",
        "bold": true,
      },
      "forest": {
        "name": "Percentage of forest under management plan or equivalent",
        "bold": true,
      },
      "nutrient": {
        "name": "Nutrient and BOD concentration in surface water (SEBI 016)",
        "bold": true,
      },
      "water": {
        "name": "Water Exploitation Index",
        "bold": true,
      },
      "land-cover": {
        "name": "Land cover in the drained area or floodplain",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes (general)",
    "code": "structural",
    "indicator": {
      "fragmentation": {
        "name": "Fragmentation (SEBI 013 and SEBI 014*)",
        "bold": true,
      },
      "green": {
        "name": "Percentage area of urban green space (or percentage of natural area within the city boundaries)",
        "bold": true,
      },
      "farmland": {
        "name": "Share of High Nature Value farmland in agricultural area (SEBI 020) (AEI23)",
        "bold": true,
      },
      "farming": {
        "name": "Share of organic farming in utilised agricultural area (SEBI 020) (AEI4)",
        "bold": true,
      },
      "livestock": {
        "name": "Livestock density",
        "bold": true,
      },
      "deadwood": {
        "name": "Deadwood (SEBI 018)",
        "bold": true,
      },
      "forest": {
        "name": "Forest area",
        "bold": true,
      },
      "biomass": {
        "name": "Biomass volume (growing stock) (SEBI 017)",
        "bold": true,
      },
      "ecological": {
        "name": "Ecological Status",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes based on species diversity and abundance",
    "code": "ecosystem",
    "indicator": {
      "fbi": {
        "name": "Farmland Bird Indicator (SEBI 001) (AEI2.4.1)",
        "bold": true,
      },
      "distribution": {
        "name": "Abundance and distribution of common forest birds (SEBI 001)",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes monitored under the EU nature directives",
    "code": "monitored",
    "indicator": {
      "covered": {
        "name": "Percentage covered by Natura 2000 (SEBI 008) or by Nationally Designated Areas (SEBI 007)",
        "bold": true,
      },
      "status": {
        "name": "Conservation status and trends of species of Community interest (SEBI 003)",
        "bold": true,
      },
      "conservation": {
        "name": "Conservation status and trends of habitats of Community interest (SEBI 005)",
        "bold": true,
      },
      "eu": {
        "name": "EU Population status and trends of bird species of Community interest (SEBI 003)",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural soil indicator",
    "code": "soil",
    "indicator": {
      "carbon": {
        "name": "Soil organic carbon",
        "bold": true,
      },
    }
  },
];
const waterEcosystemOnAllHeaders = {
  "noise": {
    "urban": true,
  },
  "pollution": {
    "urban": true,
  },
  "concentration": {
    "urban": true,
  },
  "connected": {
    "urban": true,
  },
  "built": {
    "urban": true,
  },
  "tropospheric": {
    "forest": true,
  },
  "nitrogen": {
    "forest": true,
  },
  "forest": {
    "forest": true,
  },
  "nutrient": {
    "urban": true,
    "rivers": true,
  },
  "water": {
    "rivers": true,
  },
  "land-cover": {
    "rivers": true,
  },
  "fragmentation": {
    "urban": true,
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "green": {
    "urban": true,
  },
  "farmland": {
    "crop": true,
    "grass": true,
  },
  "farming": {
    "crop": true,
    "grass": true,
  },
  "livestock": {
    "crop": true,
    "grass": true,
  },
  "deadwood": {
    "forest": true,
  },
  "forest": {
    "forest": true,
  },
  "biomass": {
    "forest": true,
  },
  "ecological": {
    "rivers": true,
  },
  "fbi": {
    "crop": true,
    "grass": true,
  },
  "distribution": {
    "forest": true,
  },
  "covered": {
    "urban": true,
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "status": {
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "conservation": {
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "eu": {
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
    "rivers": true,
  },
  "carbon": {
    "urban": true,
    "crop": true,
    "grass": true,
    "forest": true,
    "healthland": true,
    "sparse": true,
    "wetland": true,
  },
};
const marineEcosystem = [
  {
    "name": "Climate change",
    "code": "climate",
    "indicator": {
      "acidification": {
        "name": "Acidification",
        "bold": true,
      },
    }
  },
  {
    "name": "Pollution and nutrient enrichment",
    "code": "enrichment",
    "indicator": {
      "contaminants": {
        "name": "Contaminants (MSFD-D9)",
        "bold": true,
      },
      "discharge": {
        "name": "Nutrient discharge",
        "bold": true,
      },
    }
  },
  {
    "name": "Over-exploitation",
    "code": "over-exploitation",
    "indicator": {
      "fish-catch": {
        "name": "Fish catch",
        "bold": true,
      },
      "mortality": {
        "name": "Fish mortality of commercially exploited fish and shellfish exceeding fishing mortality at maximum sustainable yield (MSFD-D3C1)",
        "bold": true,
      },
    }
  },
  {
    "name": "Introductions of invasive alien species",
    "code": "invasive-alien-species",
    "indicator": {
      "introductions": {
        "name": "Number of annual introductions of invasive alien species (SEBI 010)",
        "bold": true,
      },
    }
  },
  {
    "name": "Environmental quality",
    "code": "quality",
    "indicator": {
      "chemical": {
        "name": "Chemical Status",
        "bold": true,
      },
      "concentrations": {
        "name": "Nutrient and BOD concentrations (SEBI 015 and SEBI 016)",
        "bold": true,
      },
      "bathing": {
        "name": "Bathing water quality",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes (general)",
    "code": "ecosystem-attributes",
    "indicator": {
      "ecological status": {
        "name": "Ecological status",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes based on species diversity and abundance",
    "code": "species-diversity",
    "indicator": {
      "biomass": {
        "name": "Spawning Stock Biomass (MSFD-D3C2)",
        "bold": true,
      },
      "commercially-exploited": {
        "name": "Age and size distribution of commercially-exploited species (MSFD-D3C3)",
        "bold": true,
      },
      "abundance": {
        "name": "Population abundance (MSFD D1C2)",
        "bold": true,
      },
    }
  },
  {
    "name": "Structural ecosystem attributes monitored under the EU nature directives",
    "code": "attributes-monitored",
    "indicator": {
      "habitats": {
        "name": "Conservation status and trends of habitats of Community interest (SEBI 005)",
        "bold": true,
      },
      "trends of species": {
        "name": "Conservation status and trends of species of Community interest (SEBI 003)",
        "bold": true,
      },
      "status and trends": {
        "name": "Population status and trends of bird species of Community interest",
        "bold": true,
      },
      "marine protected": {
        "name": "Percentage of Natura 2000 and marine protected areas",
        "bold": true,
      },
    }
  },
];
const marineEcosystemOnAllHeaders = {
  "acidification": {
    "TC": true,
    "SO": true,
  },
  "contaminants": {
    "TC": true,
    "SO": true,
  },
  "discharge": {
    "TC": true,
    "SO": true,
  },
  "fish-catch": {
    "TC": true,
    "SO": true,
  },
  "mortality": {
    "TC": true,
    "SO": true,
  },
  "introductions": {
    "TC": true,
    "SO": true,
  },
  "chemical": {
    "TC": true,
  },
  "concentrations": {
    "TC": true,
    "SO": true,
  },
  "bathing": {
    "TC": true,
  },
  "ecological status": {
    "TC": true,
  },
  "biomass": {
    "TC": true,
    "SO": true,
  },
  "commercially-exploited": {
    "TC": true,
    "SO": true,
  },
  "abundance": {
    "TC": true,
    "SO": true,
  },
  "habitats": {
    "TC": true,
    "SO": true,
  },
  "trends of species": {
    "TC": true,
    "SO": true,
  },
  "status and trends": {
    "TC": true,
    "SO": true,
  },
  "marine protected": {
    "TC": true,
    "SO": true,
  },
}
const marineHeaders = [
  {
    "code": "SO",
    "name": "Shelf and Open ocean",
    "abbreviation": "SO",
    "colour": "#f35555",
  },
  {
    "code": "TC",
    "name": "Marine inlets and transitional waters and Coastal ecosystems",
    "abbreviation": "TC",
    "colour": "#f35555",
  },
]
const notSelectedColour = 'lightgrey';
const selectedColour = '#f35555';
let displayedClassNames = {};

export default {
  name: 'app',
  data() {
    return {
    bise,
    biseHeader,
    marineHeaders,
    biseEco,
    allPolicies,
    selectedHeaderTemp: null,
    selectedHeader: null,
    selectedEcoTemp: null,
    selectedEco: '',
    selectedItem: null,
    selectedHeaderItem: null,
    selectedEcoItem: [],
    selectedIndicators: {},
    notSelectedColour,
    selectedColour,
    pressures,
    pressureOnAllHeaders,
    waterEcosystem,
    waterEcosystemOnAllHeaders,
    marineEcosystem,
    marineEcosystemOnAllHeaders,
    mustSelectLandOrWater: false,
    arrowsStyle: { header: {}, eco: {} },
    ecoLine: null,
  }
},

  created() {
    this.initArrowStyles();
  },

  methods: {
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

      if(ev.code === 'pressure') {
        // this.manageArrows('colourAllHeaders', ev.code, null);
      } else {
        // this.manageArrows('colourOnlyOne', ev.code, null)
      }

      Object.keys(this.bise).map((value) => {
        result.push(this.bise[value]);
      });
      
      this.ecoLine = ev.code === 'pressure' ? 'pressure' : 'condition';
      this.selectedEcoItem = result.slice();        
    },
    handleEcoPressureLineClick() {
      console.log('happening')
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
