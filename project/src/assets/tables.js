let tables = {
  "marine": `<div class="row full">
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
          <td colspan="2"> <span style="color: orange">●</span> Harvest (ton/a) </td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>Wild animals and their outputs</td>
          <td> <span style="color: orange">●</span> Landings (ton) </td>
          <td></td>
          <td colspan="2"> <span style="color: orange">●</span> Landings (ton) <span style="color: orange">●</span>
          CPUE (ton) </td>
        </tr>
        <tr>
          <td>Plants and algae from in-situ aquaculture</td>
          <td colspan="2"> <span style="color: orange">●</span> Harvest (ton/a) </td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td>Animals from in-situ aquaculture</td>
          <td colspan="3"> <span style="color: orange">●</span> Harvest (ton/a) </td>
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
          <td>Fibres and other materials from plants, algae and animals for direct use or processing</td>
          <td rowspan="2"> <span style="color: orange">●</span> Harvest (ton/a) </td>
          <td colspan="3"> <span style="color: orange">●</span> Landings (ton) <span style="color: orange">●</span>
          Harvest (ton/a) </td>
        </tr>
        <tr>
          <td>Materials from plants, algae and animals for agricultural use</td>
          <td colspan="3"> <span style="color: orange">●</span> Landings (ton) <span style="color: orange">●</span>
          Harvest (ton/a) </td>
        </tr>
        <tr>
          <td>Genetic materials from all biota</td>
          <td colspan="4"> <span style="color: grey">●</span> Patents (no.) <span style="color: grey">●</span>
          Published articles (no.) </td>
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
          <td rowspan="2">Biomass-based energy sources</td>
          <td>Plant-based resources</td>
          <td rowspan="2" colspan="4"></td>
        </tr>
        <tr>
          <td>Animal-based resources</td>
        </tr>
        <tr>
          <td>Mechanical energy</td>
          <td>Animal-based energy</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td rowspan="5">Mediation of waste, toxics and other nuisances</td>
          <td rowspan="2">Mediation by biota</td>
          <td>Bio-remediation by micro-organisms, algae, plants, and animals</td>
          <td rowspan="4" colspan="3"> <span style="color: green;">●</span> Nutrient load to coast
          (ton/a) <br> <span style="color: green;">●</span> HM and POP deposition (ton/a) <br> <span style="color: green;">●</span>
          Oxyrisk </td>
          <td rowspan="4"> <span style="color: green;">●</span> HM and POP deposition (ton/a) <br> <span style="color: green;">●</span>
          Oxyrisk </td>
        </tr>
        <tr>
          <td>Filtration/sequestration/storage/accumulation by micro- organisms, algae, plants, and
          animals</td>
        </tr>
        <tr>
          <td rowspan="3">Mediation by ecosystems</td>
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
          <td rowspan="2" colspan="2"> <span style="color: green;">●</span> Composite indices based on
          extent of selected emerged, submerged and intertidal habitats, coastline slope and coastal
          geomorphology, wave regime, tidal range, relative sea level, storm surge </td>
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
          <td colspan="2">See buffering and attenuation of mass flows</td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td rowspan="2">Gaseous / air flows</td>
          <td>Storm protection</td>
          <td rowspan="2" colspan="4"></td>
        </tr>
        <tr>
          <td>Ventilation and transpiration</td>
        </tr>
        <tr>
          <td rowspan="10">Maintenance of physical, chemical, biological conditions</td>
          <td rowspan="2">Lifecycle maintenance, habitat and gene pool protection</td>
          <td>Pollination and seed dispersal</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>Maintaining nursery populations and habitats</td>
          <td colspan="2"> <span style="color: red">●</span> Submerged and intertidal habitats diversity
          (no.)<br> <span style="color: green;">●</span> Oxygen concentration (%)<br> <span style="color: green;">●</span>
          Turbidity (%)<br> <span style="color: green;">●</span> Species distribution (km2/ha) <br>
          <span style="color: red">●</span> Abundance and richness - at age (ton/a)<br> <span style="color: orange">●</span>
          Extent of marine protected areas (km2/ha)<br> <span style="color: red">●</span> Nursery
          areas (km2/ha) </td>
          <td> <span style="color: green;">●</span> Oxygen concentration (%)<br> <span style="color: green;">●</span>
          Turbidity (%) <br> <span style="color: green;">●</span> Species distribution (km2/ha) <br>
          <span style="color: red">●</span> Abundance and richness - at age (ton/a)<br> <span style="color: orange">●</span>
          Extent of marine protected areas (km2/ha) <br> <span style="color: red">●</span>Nursery
          areas (km2/ha) </td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">Pest and disease control</td>
          <td>Pest control</td>
          <td colspan="4"> <span style="color: red">●</span> Presence (no.) and <br> <span style="color: red">●</span>
          Distribution (km2) of alien species </td>
        </tr>
        <tr>
          <td>Disease control</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td rowspan="2">Soil formation and composition</td>
          <td>Weathering processes</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>Decomposition and fixing processes</td>
          <td colspan="3"> <span style="color: grey">●</span> Nitrogen removal (%) <br> <span style="color: grey">●</span>
          Water residence time (months) <br> <span style="color: grey">●</span> Depth/water residence
          time (m/year) </td>
          <td></td>
        </tr>
        <tr>
          <td rowspan="2">Water conditions</td>
          <td>Chemical condition of freshwaters</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td>Chemical condition of salt waters</td>
          <td colspan="4"> <span style="color: green;">●</span> Nutrient load to coast (ton/yr) <br>
          <span style="color: green;">●</span> HM and POP loading (ton/yr) <br> <span style="color: green;">●</span>
          Oxyrisk </td>
        </tr>
        <tr>
          <td rowspan="2">Atmospheric composition and climate regulation</td>
          <td>Global climate regulation by reduction of greenhouse gas concentrations</td>
          <td colspan="4"> <span style="color: green;">●</span> C stock (tonC) <span style="color: green;">●</span>
          C sequestration (tonC/a) <span style="color: green;">●</span> pH <span style="color: green;">●</span>
          blue C (tonC) <span style="color: green;">●</span> PP(ton C/year) </td>
        </tr>
        <tr>
          <td>Micro and regional climate regulation</td>
          <td colspan="4"></td>
        </tr>
        <tr>
          <td rowspan="7">Physical and intellectual interactions with biota, ecosystems, and land-
          /seascapes [environmental settings]</td>
          <td rowspan="2">Physical and experiential interactions</td>
          <td>Experiential use of plants, animals and land-/seascapes in different environmental settings</td>
          <td colspan="3" rowspan="2"> <span style="color: orange">●</span> Extent of marine protected
          areas (km2/ha) <br> <span style="color: green;">●</span> Presence of iconic/endangered
          species (no.) <br> <span style="color: grey">●</span> In-water activities occurrence (no.)
          <br> <span style="color: grey">●</span> Recreation trips (no./year) </td>
          <td rowspan="2"> <span style="color: orange">●</span> Extent of marine protected areas (km2/ha)
          <br> <span style="color: green;">●</span> Presence of iconic/endangered species (no.) </td>
        </tr>
        <tr>
          <td>Physical use of land-/seascapes in different environmental settings</td>
        </tr>
        <tr>
          <td rowspan="5">Intellectual and representative interactions</td>
          <td>Scientific</td>
          <td rowspan="2" colspan="4"> <span style="color: grey">●</span> Scientific studies (no.) <span style="color: grey">●</span>
          Documentaries, educational publications (no.) <br> <span style="color: grey">●</span> Visits to
          scientific and artistic visits exhibits (no.)
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
          <td rowspan="2" colspan="4"> <span style="color: grey">●</span> Documentaries, educational
          publications (no.) <br> <span style="color: grey">●</span> Visits to scientific and
          artistic visits exhibits (no.) </td>
        </tr>
        <tr>
          <td>Aesthetic</td>
        </tr>
        <tr>
          <td rowspan="2">Spiritual, symbolic and other interactions with</td>
          <td rowspan="2">Spiritual and/or emblematic</td>
          <td>Symbolic</td>
          <td colspan="4" rowspan="2"></td>
        </tr>
        <tr>
          <td>Sacred and/or religious</td>
        </tr>
        <tr>
          <td rowspan="2">biota, ecosystems, and land-/seascapes [environmental settings]</td>
          <td rowspan="2">Other cultural outputs<br> Bequest</td>
          <td>Existence</td>
          <td colspan="4" rowspan="2"> <span style="color: orange">●</span> Extent of marine protected
          areas (km2/ha) <br> <span style="color: green;">●</span> Presence of iconic/endangered
          species (no.) </td>
        </tr>
        <tr>
          <td>Bequest</td>
        </tr>
        </tbody>
      </table>
      <p><i>Table 12: Indicators for ecosystem services delivered by marine ecosystems from the <a href="http://catalogue.biodiversity.europa.eu/uploads/document/file/1230/2ndMAESWorkingPaper.pdf">2nd
          MAES Report</a></i></p>
      </div>
    </div>
    </div>`,
  

  "available": `
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
            <td> <span style="color: green;">●</span> Area and yields of food and feed crops </td>
            <td rowspan="8"> <span style="color: orange;">●</span> Yield <br> <span style="color: orange;">●</span>
              Landings <br> <span style="color: orange;">●</span> Catch per unit effort (where applicable) </td>
          </tr>
          <tr>
            <td>Reared animals and their outputs</td>
            <td>Agro</td>
            <td> <span style="color: green;">●</span> Livestock </td>
          </tr>
          <tr>
            <td>Wild plants, algae and their outputs</td>
            <td>Forest</td>
            <td> <span style="color: green;">●</span> Distribution of wild berries (modelling) </td>
          </tr>
          <tr>
            <td>Wild animals and their outputs</td>
            <td>Forest</td>
            <td> <span style="color: green;">●</span> Population sizes of species of interest </td>
          </tr>
          <tr>
            <td>Plants and algae from in-situ aquaculture</td>
            <td>Water</td>
            <td></td>
          </tr>
          <tr>
            <td>Animals from in-situ aquaculture</td>
            <td>Water</td>
            <td> <span style="color: green;">●</span> Freshwater aquaculture production </td>
          </tr>
          <tr>
            <td><span style="font-style: italic;">Water </span>(Nutrition)</td>
            <td>Water</td>
            <td> <span style="color: green;">●</span> Water abstracted </td>
          </tr>
          <tr>
            <td><span style="font-style: italic;">Biomass </span>(Materials)</td>
            <td>Forest <br> Agro</td>
            <td> <span style="color: green;">●</span> Area and yield of fibre crops<br> <span style="color: green;">●</span>
              Timber production and consumption statistics </td>
          </tr>
          <tr>
            <td><span style="font-style: italic;">Water </span>(Materials)</td>
            <td>Water</td>
            <td> <span style="color: green;">●</span> Water abstracted </td>
            <td></td>
          </tr>
          <tr>
            <td>Plant-based resources</td>
            <td>Forest</td>
            <td> <span style="color: green;">●</span> Fuel wood statistics </td>
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
            <td> <span style="color: green;">●</span> Area occupied by riparian forests <br> <span style="color: orange;">●</span>
              Nitrogen and Sulphur removal (forests) </td>
            <td> <span style="color: green;">●</span> Nutrient load to coast <br> <span style="color: green;">●</span>
              Heavy metals and persistent organic pollutants deposition <br> <span style="color: green;">●</span>Oxyrisk
            </td>
          </tr>
          <tr>
            <td>Mass stabilisation and control of erosion rates</td>
            <td>Forest <br> Agro </td>
            <td> <span style="color: green;">●</span> Soil erosion risk or erosion protection </td>
            <td rowspan="2"> <span style="color: green;">●</span> Coastal protection capacity </td>
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
            <td> <span style="color: green;">●</span> Floodplains areas (and record of annual floods) <br> <span style="color: green;">●</span>
              Area of wetlands located in flood risk zones </td>
            <td rowspan="2"> <span style="color: green;">●</span>Coastal protection capacity </td>
          </tr>
          <tr>
            <td>Storm protection</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Ventilation and transpiration</td>
            <td>Agro</td>
            <td> <span style="color: green;">●</span> Amount of biomass </td>
            <td></td>
          </tr>
          <tr>
            <td>Pollination and seed dispersal</td>
            <td>Agro</td>
            <td> <span style="color: green;">●</span> Pollination potential </td>
            <td></td>
          </tr>
          <tr>
            <td>Maintaining nursery populations and habitats</td>
            <td></td>
            <td> <span style="color: green;">●</span> Share of High Nature Value farmland <br> <span style="color: green;">●</span>
              Ecological Status of water bodies </td>
            <td> <span style="color: green;">●</span> Oxygen concentration <span style="color: green;">●</span>
              Turbidity <br> <span style="color: green;">●</span> Species distribution <span style="color: green;">●</span>
              Extent of marine protected areas </td>
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
            <td> <span style="color: green;">●</span> Share of organic farming <span style="color: green;">●</span>
              Soil organic matter content <span style="color: green;">●</span> Ph of topsoil <span style="color: green;">●</span>
              Cation exchange capacity </td>
            <td></td>
          </tr>
          <tr>
            <td>Decomposition and fixing processes</td>
            <td>Agro</td>
            <td> <span style="color: green;">●</span> Area of nitrogen fixing crops </td>
            <td></td>
          </tr>
          <tr>
            <td>Chemical condition of freshwaters</td>
            <td>Water</td>
            <td> <span style="color: green;">●</span> Chemical status </td>
            <td></td>
          </tr>
          <tr>
            <td>Chemical condition of salt waters</td>
            <td>Marine</td>
            <td></td>
            <td> <span style="color: green;">●</span> Nutrient load to coast <br> <span style="color: green;">●</span>
              HM and POP loading <br> <span style="color: green;">●</span> Oxyrisk </td>
          </tr>
          <tr>
            <td>Global climate regulation by reduction of greenhouse gas concentrations</td>
            <td>Forest</td>
            <td> <span style="color: green;">●</span> Carbon storage and sequestration by forests </td>
            <td> <span style="color: green;">●</span> Carbon stock <span style="color: green;">●</span> Carbon
              sequestration <span style="color: green;">●</span> pH; <span style="color: green;">●</span> Blue carbon
              <br> <span style="color: green;">●</span> Primary production </td>
          </tr>
          <tr>
            <td>Micro and regional climate regulation</td>
            <td>Forest</td>
            <td> <span style="color: orange;">●</span> Forest area </td>
            <td></td>
          </tr>
          <tr>
            <td><span style="font-style: italic;">Physical and experiential interactions</span></td>
            <td rowspan="4">Forest Agro Water Marine</td>
            <td colspan="2"> <span style="color: orange;">●</span> Visitor statistics </td>
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
            <td colspan="2"> <span style="color: green;">●</span> Extent of protected areas </td>
          </tr>
        </tbody>
      </table>
      <p><i>
          Table 14: Available indicators for assessment of ecosystem services across different ecosystems from the <a
            href="http://catalogue.biodiversity.europa.eu/uploads/document/file/1230/2ndMAESWorkingPaper.pdf">2nd MAES
            Report</a>
        </i></p>
    </div>
  </div>
</div>
</div>
  `,
  

  "total": `
  <div class="row">
  <div class="item">
    <div class="jumbotron">
      <table class="table table-bordered center top-border no-empty">
        <thead>
          <tr>
            <th style="min-width: 250px;"></th>
            <th></th>
            <th>Forests</th>
            <th>Agro-ecosystems (cropland and grassland) </th>
            <th>Freshwater ecosystems (rivers, lakes, ground water, and wetlands) </th>
            <th>Marine ecosystems (Marine inlets and transitional waters, coastal zones, shelf ecosystems, and open
              ocean) </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Provisioning services</td>
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
            <td>Regulation and maintenance services</td>
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
            <td>Total number of indicators</td>
            <td style="border-color:#e0e0e0!important;"> </td>
            <td>117</td>
            <td>67</td>
            <td>110</td>
            <td>33</td>
          </tr>
          <tr>
            <td>Share of green indicators</td>
            <td style="color:#308e47;font-size: 2rem;line-height:1;padding: 0;">●</td>
            <td>15%</td>
            <td>27%</td>
            <td>13%</td>
            <td>42%</td>
          </tr>
        </tbody>
      </table>
      <p><i>
        Table 13: Total number and break-down of ecosystem services indicators (Forests Agro-ecosystems, (cropland and grassland), Freshwater ecosystems (rivers, lakes, ground water, and wetlands), Marine Ecosystems) from the <a href="http://catalogue.biodiversity.europa.eu/uploads/document/file/1230/2ndMAESWorkingPaper.pdf">2nd MAES Report</a>
      </i></p>
    </div>
  </div>
</div>
  `,
  
  "urban": `
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
            <td rowspan="2">Parks, gardens, forest, trees, agricultural areas in the commuting zone, wetlands, water
              bodies, waterways, Natura 2000 Sites</td>
            <td rowspan="2">Preferences; potential and direct use</td>
          </tr>
          <tr>
            <td>Scientific
              <hr style=" border-style: inherit; border-color: #e0e0e0;"> Educational
              <hr style=" border-style: inherit; border-color: #e0e0e0;"> Heritage,cultural</td>
            <td>Nature based education</td>
          </tr>
        </tbody>
      </table>
      <p><i>
          Table 18: Indicator framework for measuring the condition of urban ecosystems from the <a href="http://catalogue.biodiversity.europa.eu/uploads/document/file/1340/MAES_report_urban_ecosystems.pdf">4th MAES Report</a>
      </i></p>
    </div>
  </div>
</div>
  `,
  
  "water": `<div class="row full">
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
            <td colspan="2"><span style="color: grey">●</span> Wild plants used in gastronomy, cosmetic, pharmaceutical
              uses (data on industries collecting the plants)</td>
            <td></td>
            <td><b>see lakes and rivers</b></td>
          </tr>
          <tr>
            <td>Wild animals and their outputs</td>
            <td colspan="2"><span style="color:orange">●</span> Fish production (catch in tonnes by commercial and
              recreational fisheries) <br><span style="color:red;">●</span> Number of fisherman and hunters of
              waterfowls (anglers, professional and amateur fishermen) <br><span style="color:red;">●</span> Status of
              fish population (Species composition, Age Structure, Biomass kg/ha) </td>
            <td></td>
            <td><b>see lakes and rivers</b></td>
          </tr>
          <tr>
            <td>Plants and algae from in-situ aquaculture</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td>Animals from in-situ aquaculture</td>
            <td colspan="2"><span style="color:green;">●</span> Freshwater aquaculture production (e.g. sturgeon and
              caviar production)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="2">Water</td>
            <td rowspan="2">
              <div style="float: left;">Surface water for drinking
                <hr style="margin-bottom: 1.5rem;margin-top: 1.5rem; border-style: solid; border-color: #e0e0e0;">
                Ground water for drinking </div>
              <div style="width: 30%; float: right"><span style="color:red">●</span> Water exploitation index (WEI)</div>
            </td> <!-- <td rowspan="2"></td> -->
            <td colspan="2"><span style="color:orange;">●</span> Water consumption for drinking<br><span style="color:orange;">●</span>
              Surface water availability<br><span style="color:green;">●</span> Water abstracted</td>
            <td></td>
            <td><span style="color:red">●</span> Nitrate-vulnerable zones</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td><span style="color:orange;">●</span> Ground water bodies <br> <span style="color:orange;">●</span>
              Ground water abstraction</td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="5">Materials</td>
            <td rowspan="3">Biomass</td>
            <td>Fibres and other materials from plants, algae and animals for direct use or processing</td>
            <td colspan="3"></td>
            <td><span style="color:green">●</span> Wood produced (tons or volume) by riparian forest <br> <span style="color:green">●</span>
              Surface of exploited wet forests (e.g. poplars) and reeds</td>
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
              <div style="float: left;width: 60%">Surface water for non-drinking purposes
                <hr style="margin-bottom: 1.5rem;margin-top: 1.5rem; border-style: solid; border-color: #e0e0e0;">
                Ground water for non-drinking purposes </div>
              <div style="width: 30%; float: right"><span style="color:red">●</span> Water exploitation index (WEI)</div>
            </td>
            <td colspan="2"><span style="color:orange;">●</span> Water use per sector<br><span style="color:orange;">●</span>
              Surface water availability<br><span style="color:green;">●</span> Water abstracted<br> <span style="color:red">●</span>
              Volume of water bodies</td>
            <td></td>
            <td><span style="color:green">●</span> Surface of flood-prone areas</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><span style="color:orange;">●</span> Ground water bodies <br> <span style="color:orange;">●</span>
              Ground water abstraction</td>
            <td></td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td rowspan="3">Energy</td>
            <td rowspan="2">Biomass-based energy sources </td>
            <td>Plant-based resources</td>
            <td colspan="2"></td>
            <td></td>
            <td> <span style="color:orange;">●</span> Firewood produced byriparian forests </td>
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
            <td>Bio-remediation by micro-organisms, algae, plants, and animals</td>
            <td colspan="2" rowspan="3"> <span style="color:orange;">●</span> Indicators on water quality
              (microbiological data for bathing waters, BOD5 nitrate conc, phosphate conc, oxygen conditions,
              saprobiological status)<br> <span style="color:orange;">●</span> Nutrient loads <br> <span style="color:orange;">●</span>
              Ecological status <br> <span style="color:orange;">●</span> Trophic status <br> <span style="color:green;">●</span>
              Area occupied by riparian forests <br> <span style="color: orange">●</span> Number and efficiency of
              treatment plants <br> <span style="color: orange">●</span> Waste treated </td>
            <td rowspan="3"> <span style="color: grey">●</span> Indicators on groundwater quality (NO3, pesticide,
              trace metals, emerging pollutants, etc. evolution in GW) </td>
            <td rowspan="3"> <span style="color: red">●</span> Carbon storage per unit of area <br> <span style="color: red">●</span>
              Potential mineralization or decomposition <br> <span style="color: orange">●</span> Ecological status <br>
              <span style="color: orange">●</span>Nutrient concentration <br> <span style="color: orange">●</span>Nutrient
              retention </td>
          </tr>
          <tr>
            <td>Filtration/sequestration/storage/accumulation by micro-organisms, algae, plants, and animals </td>
          </tr>
          <tr>
            <td rowspan="3">Mediation by ecosystems</td>
            <td>Filtration/sequestration/storage/accumulation by ecosystems </td>
          </tr>
          <tr>
            <td>Dilution by atmosphere, freshwater and marine ecosystems </td>
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
            <td rowspan="4"> <span style="color: grey">●</span> GW level evolution </td>
            <td></td>
          </tr>
          <tr>
            <td>Buffering and attenuation of mass flows</td>
            <td colspan="2"> <span style="color: orange">●</span> Sediment retention </td>
            <td> <span style="color: orange">●</span> Sediment retention </td>
          </tr>
          <tr>
            <td rowspan="2">Liquid flows</td>
            <td>Hydrological cycle and water flow maintenance</td>
            <td><span style="color: red">Volume of water (or snow)</span></td>
            <td><span style="color: red">Hydrological flow data</span></td>
            <td><span style="color: red">Surface of wetlands</span></td>
          </tr>
          <tr>
            <td>Flood protection</td>
            <td colspan="2"> <span style="color: orange">●</span> Holding capacity flood risk maps <br> <span style="color: red">●</span>
              Conservation of river and lakes banks </td>
            <td> <span style="color: orange">●</span> Water holding capacity of soils<br> <span style="color:green;">●</span>
              Floodplains areas (and record of annual floods)<br> <span style="color:green;">●</span> Area of wetlands
              located in flood risk zones <br> <span style="color: red">●</span> Conservation status of riparian
              wetlands </td>
          </tr>
          <tr>
            <td rowspan="2">Gaseous / air flows</td>
            <td>Storm protection</td>
            <td colspan="3"></td>
            <td> <span style="color: orange">●</span> Conservation status of wetlands <span style="color: red">Area of
                wetlands, vegetation cover?</span> </td>
          </tr>
          <tr>
            <td>Ventilation and transpiration</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td rowspan="10"> Maintenance of physical, chemical, biological conditions </td>
            <td rowspan="2"> Lifecycle maintenance, habitat and gene pool protection </td>
            <td>Pollination and seed dispersal</td>
            <td colspan="2"></td>
            <td rowspan="2"> <span style="color: grey">●</span> GW level </td>
            <td> <span style="color: red">Beekeeping value of wetlands</span> </td>
          </tr>
          <tr>
            <td>Maintaining nursery populations and habitats</td>
            <td colspan="2"> <span style="color: orange">●</span> Biodiversity value (Species diversity or abundance,
              endemics or red list species and spawning location) <br> <span style="color:green;">●</span> Ecological
              status Morphological status </td>
            <td><span style="color: red">Biodiversity value?</span></td>
          </tr>
          <tr>
            <td rowspan="2">Pest and disease control</td>
            <td>Pest control</td>
            <td colspan="2"> <span style="color: orange">●</span> Alien species (Introduced riparian and aquatic plants
              <br> <span style="color: orange">●</span> Number of introduced aquatic invertebrates <br> <span style="color: orange">●</span>
              Number of introduced vertebrates in rivers and riparian areas </td>
            <td></td>
            <td><b>see lakes and rivers</b></td>
          </tr>
          <tr>
            <td>Disease control</td>
            <td colspan="4"></td>
          </tr>
          <tr>
            <td rowspan="2">Soil formation and composition </td>
            <td>Weathering processes</td>
            <td colspan="2"> <span style="color: red">●</span> Fluvisols surface </td>
            <td></td>
            <td> <span style="color: red">●</span> Hydromorphic soils (Presence/absence) Surface of floodplains </td>
          </tr>
          <tr>
            <td>Decomposition and fixing processes</td>
            <td colspan="3"></td>
            <td> <span style="color: red">●</span> Potential mineralization, decomposition, etc. </td>
          </tr>
          <tr>
            <td rowspan="2">Water conditions</td>
            <td>Chemical condition of freshwaters</td>
            <td colspan="2"> <span style="color:green;">●</span> Chemical status <br> <span style="color: orange">●</span>
              Ecological status </td>
            <td rowspan="2"> <span style="color: orange">●</span> Indicators of GW quality </td>
            <td> <span style="color:green;">●</span> Chemical status <br> <span style="color: orange">●</span>
              Ecological status <br> <span style="color: grey">●</span> Potential of water purification of wetlands
            </td>
          </tr>
          <tr>
            <td>Chemical condition of salt waters</td>
            <td colspan="2"></td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="2">Atmospheric composition and climate regulation </td>
            <td>Global climate regulation by reduction of greenhouse gas concentrations </td>
            <td colspan="2"> <span style="color: grey">●</span> C sequestration (Annual increase in <br> <span style="color: grey">●</span>
              Carbon sequestration in living biomass of riparian forest <br> <span style="color: grey">●</span> Carbon
              sequestered by plantations of Populus <br> <span style="color: grey">●</span> Organic carbon stored in
              fluvisols) </td>
            <td> <span style="color: grey">●</span> C sequestration (Evolution of annual volumes of CO2 injected, <br>
              <span style="color: grey">●</span> Number of sites for CO2 deep injections) </td>
            <td>see rivers and lakes</td>
          </tr>
          <tr>
            <td>Micro and regional climate regulation</td>
            <td colspan="2"></td>
            <td> <span style="color: grey">●</span> GW level </td>
            <td></td>
          </tr>
          <tr>
            <td rowspan="7">Physical and intellectual interactions with biota, ecosystems, and land- /seascapes
              [environmen tal settings] </td>
            <td rowspan="2">Physical and experiential interactions </td>
            <td>Experiential use of plants, animals and land- /seascapes in different environmental settings </td>
            <td colspan="2"> <span style="color: red">●</span> Number of visitors (to National Parks including lakes or
              rivers) <br> <span style="color:green;">●</span> National Parks and Natura 2000 sites <br> <span style="color: red">●</span>
              Known bird watching sites Waterfowl </td>
            <td></td>
            <td> <span style="color: red">●</span> Number of visitors (waterfowl hunters and fishermen, <br> <span
                style="color: red">●</span> Visitors to National Parks or protected areas including wetlands) <br>
              <span style="color: red">●</span> Known bird watching sites <br> <span style="color: red">●</span>
              Waterfowl <br> <span style="color: red">●</span> Tourism revenue </td>
          </tr>
          <tr>
            <td>Physical use of land-/seascapes in different environmental settings</td>
            <td colspan="2"> <span style="color: red">●</span> Number of visitors<br> <span style="color: red">●</span>
              bathing areas and Number beaches <br> <span style="color: red">●</span> Fishing reserves, <br> <span
                style="color: red">●</span> Fish abundance, <br> <span style="color: red">●</span> Fish monetary value
              from angling, <br> <span style="color: red">●</span> Number fishing licenses, <br> <span style="color: red">●</span>
              Quality of fresh waters for fishing </td>
            <td> <span style="color: red">●</span> Number of visitors (to thermal, mineral and mud springs and beaches,
              to Natural Reserve areas) speleology sites </td>
            <td> <span style="color: red">●</span> Number of visitors (waterfowl hunters and fishermen)<br> <span style="color: red">●</span>
              Number of fishing licenses <br> <span style="color: red">●</span> Tourism revenue </td>
          </tr>
          <tr>
            <td rowspan="5">Intellectual and representative interactions</td>
            <td>Scientific</td>
            <td colspan="4"> <span style="color: orange">●</span> Monitoring sites (by scientists) <br> <span style="color: grey">●</span>
              Number of scientific projects, articles, studies <br> <span style="color: red">●</span> Classified sites
              (world heritage, label European tourism) </td>
          </tr>
          <tr>
            <td>Educational</td>
            <td colspan="4"> <span style="color: orange">●</span> Number of visitors <br> <span style="color:green;">●</span>
              National Parks and Natura 2000 sites </td>
          </tr>
          <tr>
            <td>Heritage, cultural</td>
            <td colspan="4"> <span style="color: orange">●</span> Number of visitors <br> <span style="color: orange">●</span>
              Natural heritage and cultural sites <br> <span style="color: red">●</span> Number of annual cultural
              activities organise</td>
          </tr>
          <tr>
            <td>Entertainment</td>
            <td colspan="4">Number of visitors (surface or number of wetlands located next to a bike path) </td>
          </tr>
          <tr>
            <td>Aesthetic</td>
            <td colspan="4"> <span style="color: orange">●</span> Number of visitors <br> <span style="color: orange">●</span>
              Contrasting landscapes (lakes close to mountains) <br> <span style="color: green;">●</span> Proximity to
              urban areas of scenic rivers or lake </td>
          </tr>
          <tr>
            <td rowspan="4"> Spiritual, symbolic and other interactions with biota, ecosystems, and land/seascapes
              [environmen tal settings] </td>
            <td rowspan="2">Spiritual and/or emblematic </td>
            <td>Symbolic</td>
            <td colspan="2"> <span style="color: orange">●</span> National species or habitat types </td>
            <td> <span style="color: orange">●</span> Number of visitors (to places where springs and streams with GW
              origin made them historic and religious sites </td>
            <td> <span style="color: orange">●</span> National species or habitat types </td>
          </tr>
          <tr>
            <td>Sacred and/or religious</td>
            <td colspan="2"> <span style="color: red">●</span> sacred/religious sites (catastrophic events, religious
              places) </td>
            <td></td>
            <td> <span style="color: red">●</span> sacred/religious sites (catastrophic events, religious places) </td>
          </tr>
          <tr>
            <td rowspan="2">Other cultural outputs</td>
            <td>Existence</td>
            <td colspan="2"> <span style="color: orange">●</span> Number of visitors (to National Parks including
              lakes) <br> <span style="color: orange">●</span> Number of fishing licenses </td>
            <td> <span style="color: orange">●</span> Number of visitors (to hot mineral spring waters) </td>
            <td> <b>See rivers and lakes </b> </td>
          </tr>
          <tr>
            <td>Bequest</td>
            <td colspan="2"> <span style="color: grey">●</span> Number of association registered on animals, plants,
              environment, naturism </td>
            <td></td>
            <td><b>See rivers and lakes</b><br><span style="color: red">Social perception of wetlands</span> </td>
          </tr>
        </tbody>
      </table>
      <p><i>Table 11: Indicators for ecosystem services delivered by freshwater ecosystems (lakes, rivers, groundwater and wetlands) from the <a href="http://catalogue.biodiversity.europa.eu/uploads/document/file/1230/2ndMAESWorkingPaper.pdf">2nd MAES Report</a></i></p>
    </div>
  </div>
</div>`
};

export default tables;