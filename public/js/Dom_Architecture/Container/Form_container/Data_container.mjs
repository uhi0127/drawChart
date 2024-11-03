import { addEvents } from '../../../modules/addEvent.mjs';
import { SampleData } from '../../../modules/SampleData.mjs';

class Data_container{
   constructor( id ) {
      this.id = id;
   }

   createList(){
      const restUlHTML = [...Array(parseInt(1))].map( ( data, i, a ) =>{
         return(
            `
               <ul class="commonUl">
                  <li class="commonUl_id">${i + 1}</li>
                  <li><input type="text" name="names" /></li>
                  <li><input type="text" name="values" /></li>
               </ul>
            `
         )
      })
      
      document.querySelector("#commonUl_container").innerHTML = restUlHTML.join("");
   }

   folding(){
      addEvents.eventListener(document.querySelector("#data_container_foldingBtn"),"click",(evt)=>{
         evt.currentTarget.classList.toggle("folded");
      })
   }

   madeChart() {

      /**
       * event 추가
       */
      return new Promise( ( resolve, reject ) => { 

         let resultArray = [];
         let chartDataObj = {};

         const ulDomData = document.querySelectorAll("ul.commonUl");

         /**
          * commonUl 순회
          */
         ulDomData.forEach( element => {

            chartDataObj = {
               id: null,
               names: null,
               values: null,
            }

            const liDomData = element.querySelectorAll('li');

            /**
             * commonUl > li 순회
             */
            liDomData.forEach(liElement => {

               if( liElement.classList.contains( 'commonUl_id' ) ) {

                  /**
                   * commonUl_id index 추출
                   */
                  chartDataObj.id = liElement.textContent;

               } else {

                  /**
                   * name과 value 추출
                   */
                  const inputElement = liElement.querySelector('input');
                  const nameData = inputElement.name;
                  const valueData = inputElement.value;

                  chartDataObj[nameData] = valueData;
                  
               }
            });

            resultArray.push( chartDataObj );
         });

         resolve( resultArray );
      })
   }
}

const data_container = new Data_container("data_container");
export { data_container, Data_container };