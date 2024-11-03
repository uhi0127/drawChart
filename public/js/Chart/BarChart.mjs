import { data_container } from '../Dom_Architecture/Container/Form_container/Data_container.mjs';
import {Abstract_Chart} from './Abstract_Chart.mjs';

class BarChart extends Abstract_Chart{
   constructor( id ){
      super(id);
   }

   drawChart(p){
      const startPoint = 20;
      
      //** 차트 데이터 파싱
      const createChart = p=>{
         this.datas.qList.forEach( (data, i, list) =>{

            // ** X축 길이
            const XAxisLength = ( 
               (this.fullWidth - this.chartKindsPaddings.RightPadding)
               - ( this.chartKindsPaddings.LeftPadding + this.chartKinds.texts.LeftTextArea )
            );

            const XStep = XAxisLength / list.length;
            
            this.setFontInit(p,20);
            p.textStyle(p.NORMAL);
            this.setStrokeInit(p,"transparent",0);
            p.fill("#222222");
            
            p.text(
               data.names,
               this.modifyPosX( startPoint + 48 + (XStep * i)),
               this.modifyPosY( (-1)*this.chartKindsPaddings.BottomPadding )
            )

            // ** 값 문자로 표시
            p.text(
               data.values,
               this.modifyPosX( startPoint + 48 + (XStep * i)),
               this.modifyPosY( list[i].values * this.scale) - 20
            )
            
            p.fill("#1abc9c");
            this.setStrokeInit(p,"#222222",1);

            p.rect(
               this.modifyPosX(
                  startPoint + 48 + (XStep * i) 
                  - (this.chartKinds.size / 2) 
               ),
               this.modifyPosY( 0),
               this.chartKinds.size,
               this.modifyPosY( 
                  this.fullHeight 
                  - ( 
                     this.chartKindsPaddings.BottomPadding 
                     + this.chartKindsTexts.BottomTextArea 
                  ) 
                  + data.values*this.scale),
               0,0,5,5
            )

            p.fill("#222222");
         });
      }
      
      p.setup = ()=>{

         this.title = {
            value : "",
            textSize : 50
         }

         p.clear();
         this.makeCanvas(p);
         p.strokeWeight(1);
         p.textSize(this.textSize);
         this.drawAxis(p);

         document.getElementById("chartBtn").addEventListener("click", async () => {

            p.clear();

            const dataList = await data_container.madeChart();
            
            p.strokeWeight(1);
            p.textSize(this.textSize);

            const title = {
               value : document.getElementsByName('chartTitle')[0].value,
               textSize : 50
            }

            this.title = title;

            this.drawAxis(p);

            this.makeQueue(dataList);
            createChart(p);
         })
      }
      
      p.draw = ()=>{
      }
   }
   
   makeChart(){ 
      new p5((p)=>this.drawChart(p), "canvas_container");
   }
}

const barChart = new BarChart( 'barChart');
export {barChart};