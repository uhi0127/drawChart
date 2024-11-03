import {Queue} from '../../../modules/Queue.mjs';
import { addEvents } from '../../../modules/addEvent.mjs';

class ChartBtnContainer{
   constructor( id ) {
      this.id = id;
   }

   controlList(){
      const addList = ()=>{
         let lastId = parseInt(document.querySelector("#commonUl_container ul:last-child li:first-child").innerText);
         lastId++;

         document.querySelector("#commonUl_container").insertAdjacentHTML('beforeend', `
            <ul class="commonUl">
                  <li class="commonUl_id">${lastId}</li>
                  <li><input type="text" name="names" /></li>
                  <li><input type="text" name="values" /></li>
            </ul>
         `)
      }

      const deleteList = ()=>{
         const ulQueue = new Queue("ulQuqeue");

         let lastId = parseInt( 
            document.querySelector("#commonUl_container ul:last-child li.commonUl_id")
            .innerText
         );

         document.querySelectorAll("#commonUl_container ul").forEach( ul =>ulQueue.pushItem(ul) )
         const filterUl = ulQueue.qList.filter( ( ul, index ) => index !==lastId-1 );
         const newCommonUlContainer = filterUl.map( ul=> ul.outerHTML );
         document.querySelector("#commonUl_container").innerHTML = newCommonUlContainer.join("");
      }

      const resetList = ()=>{
         document.querySelectorAll("#data_container input").forEach( input =>{
            input.value = "";
         })
      }
      
      // ** 리스트 추가 이벤트
      addEvents.eventListener(document.querySelector("#addListBtn"),"click",addList);
      
      // ** 리스트 삭제 이벤트
      addEvents.eventListener(document.querySelector("#deleteListBtn"),"click",deleteList);
      
      // ** 리스트 초기화 이벤트
      addEvents.eventListener(document.querySelector("#resetListBtn"),"click",resetList);
   }
}

const chartBtn_container = new ChartBtnContainer("chartBtnContainer");
export { chartBtn_container };