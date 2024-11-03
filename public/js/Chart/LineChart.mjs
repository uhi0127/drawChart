import { data_container } from '../Dom_Architecture/Container/Form_container/Data_container.mjs';
import {Abstract_Chart} from './Abstract_Chart.mjs';
import {Queue} from '../modules/Queue.mjs';

class LineChart extends Abstract_Chart{
   constructor( id ){
      super(id);
   }
   
   drawChart(p){
      const labelWidth = new Queue("labelWidth");
      const startPoint = 20;

      //** 차트 데이터 파싱
      const createChart = p =>{
         this.datas.qList.forEach( (data, i, list) =>{
            // ** X축 길이
            const XAxisLength = ( 
               (this.fullWidth - this.chartKindsPaddings.RightPadding) - 
               ( this.chartKindsPaddings.LeftPadding + this.chartKinds.texts.LeftTextArea )
            );

            // ** X축 목록 간의 간격
            const XStep = XAxisLength / list.length;

            const currentXPos = this.modifyPosX( startPoint + 48 + (XStep * i));
            const currentYPos = this.modifyPosY( list[i].values*this.scale);

            const nextXPos = ( i=== list.length - 1) ? ( this.modifyPosX( startPoint + 48 + (XStep * (i))) ) : ( this.modifyPosX( startPoint + 48 + (XStep * (i+1))) );
            const nextYPos = ( i=== list.length - 1) ? (this.modifyPosY( list[i].values)) : (this.modifyPosY( list[i+1].values*this.scale));
            
            this.setFontInit(p,20);
            p.textStyle(p.BOLD);
            this.setStrokeInit(p,"red",0);
            p.fill("black");

            p.text(
               data.names,
               currentXPos,
               this.modifyPosY( (-1)*this.chartKindsPaddings.BottomPadding )
            )
            
            // ** 값 문자로 표시
            p.text(
               data.values,
               currentXPos - p.textWidth(data.values)/2,
               currentYPos - 20
            )

            this.setStrokeInit(p,"lightgray",1);
            // p.line(
            //    currentXPos,
            //    this.modifyPosY(0),
            //    currentXPos,
            //    this.modifyPosY(this.fullHeight - (this.chartKindsPaddings.TopPadding + this.chartTitle.textSize + this.chartKindsPaddings.BottomPadding + this.chartKinds.texts.BottomTextArea) )
            // )
            labelWidth.pushItem( p.textWidth( data.names ) / 2);
            // console.log(labelWidth.qList)
            this.setStrokeInit(p,"#1abc9c",2);
            p.circle(
               currentXPos,
               currentYPos,
               5
            );
            
            // ** 점 사이 서로 연결
            if( i !== list.length -1){
               p.line(
                  currentXPos,
                  currentYPos,
                  nextXPos,
                  nextYPos
               );
            }
            p.fill("#222222");
         });
      }

      p.setup = () => {

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
      
      p.draw = () => {}
   }
   
   makeChart(){
      new p5((p)=>this.drawChart(p), "canvas_container");
   }
}

const lineChart = new LineChart( 'lineChart' );
export {lineChart};