import { addEvents } from '../../../modules/addEvent.mjs';
import { barChart } from '../../../Chart/BarChart.mjs';
import { pieChart } from '../../../Chart/PieChart.mjs';
import { lineChart } from '../../../Chart/LineChart.mjs';

class Radio_Container{
   constructor( id ) {
      this.id = id;
   }

   checkedChart(){
      document.querySelectorAll(`#chart_selector_container_button_container input[type="radio"]`).forEach( radio =>{
         radio.addEventListener("input",()=>{
            document.querySelector("#canvas_container").innerHTML = "";
            switch( radio.id ){
               case "chart_bar": 
                  barChart.makeChart();
                  break;

               case "chart_line": ;
                  lineChart.makeChart();
                  break;
               
               case "chart_pie": ;
                  pieChart.makeChart();
                  break;
            }
         })
      })
   }

   folding(){
      addEvents.eventListener(document.querySelector("#chart_selector_container_foldingBtn"),"click",(evt)=>{
         evt.currentTarget.classList.toggle("folded");
      })
   }
}

const radio_Container = new Radio_Container("radio_Container");

export { radio_Container };