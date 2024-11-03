import { addEvents } from '../../../modules/addEvent.mjs';
class Chart_controller {
   constructor( id ) {
      this.id = id;
      
   }

   folding(){
      addEvents.eventListener(document.querySelector("#controller_container_foldingBtn"),"click",(evt)=>{
         document.querySelector("#controller_container_foldingBtn").classList.toggle("folded");
      })
   }
}

const chart_controller = new Chart_controller("chart_controller");
export { chart_controller };