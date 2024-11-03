import { data_container } from '../Dom_Architecture/Container/Form_container/Data_container.mjs';
import {Abstract_Chart} from './Abstract_Chart.mjs';
import {SampleData} from '../modules/SampleData.mjs';
import {Queue} from '../modules/Queue.mjs';

class PieChart extends Abstract_Chart{
   constructor( id ){
      super(id);
      this.angles = [];
      this.total = 0;
      this.outerRadius = 350;
      this.innerRadius = 200;

      this.clickedIndex = 0;
      this.lastAngle = 0;
   }
   
   drawChart(p){
      //** 차트 값 파싱
      const createChart = (p)=>{
         const colorList = [ "#062c25","#0c594a","#12866f","#18b394","#1ee0b9","#4be6c7","#78ecd5","#a5f2e3" ];
         
         this.angles = [];
         this.total = 0;
         this.lastAngle = 0;

         this.datas.qList.forEach( data => this.total += parseInt(data.values) );
         this.angles = this.datas.qList.map(v => v.values / this.total * p.TWO_PI);

         // 클릭된 영역의 색상을 라임색으로 변경
         this.angles.forEach( ( angle, i, list ) =>{
            p.noStroke();

            p.fill(colorList[i]);
            
            p.arc(
               0, 
               0, 
               this.outerRadius * 2, 
               this.outerRadius * 2, 
               this.lastAngle, 
               this.lastAngle + angle,
               p.PIE
            );

            this.setFontInit(p,20);
            p.fill("#darkgray");
            // ** 값 문자열 출력
            p.text(
               this.datas.qList[i].values, 
               (this.innerRadius + (this.outerRadius - this.innerRadius)/2) * p.cos( ( this.lastAngle + angle/2 ) ),
               (this.innerRadius + (this.outerRadius - this.innerRadius)/2) * p.sin( ( this.lastAngle + angle/2 ) )
            );
            
            // ** 레이블 문자열 출력
            p.text(
               this.datas.qList[i].names, 
               (this.innerRadius + (this.outerRadius - this.innerRadius)/2) * p.cos( ( this.lastAngle + angle/2 ) ),
               (this.innerRadius + (this.outerRadius - this.innerRadius)/2) * p.sin( ( this.lastAngle + angle/2 ) ) + 30
            );
            
            this.lastAngle += angle;
         })
         p.fill("#222222");
      }
      
      const centerPositioning = p =>{
         if( this.outerRadius*2 > this.chartBox.height * 0.8 ){
            this.outerRadius = this.chartBox.height*0.9/2;
         }
         p.translate(this.chartBox.width / 2, this.chartBox.height / 2);
      }

      p.setup = ()=>{

      //** 차트 타이틀
      const chartTitles = p =>{

         this.setFontInit(p,50, p.LEFT,p.CENTER);
         p.text(
            this.chartTitle.value,
            this.modifyPosX( this.chartKindsPaddings.LeftPadding ),
            this.modifyPosY( this.fullHeight - (this.chartKindsPaddings.BottomPadding + this.chartKindsTexts.BottomTextArea ) - this.chartKindsPaddings.TopPadding - this.chartTitle.textSize)
         );
      }

      this.title = {
         value : "",
         textSize : 50
      }

      p.clear();
      this.makeCanvas(p);
      chartTitles(p);

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

         chartTitles(p)

         this.makeQueue(dataList);
         
         centerPositioning(p);
         createChart(p);

      })
   }
      
      p.draw = ()=>{
      }
      
      p.mousePressed = () =>{
         const mouseX = p.mouseX - p.width / 2;
         const mouseY = p.mouseY - p.height / 2;
         const distance = p.dist(0, 0, mouseX, mouseY);

         if (distance > this.outerRadius || (distance < this.innerRadius)) {
            return; // 클릭이 차트 바깥이나 도넛의 중앙 부분이면 무시 
         }

         let angle = p.atan2(mouseY, mouseX);
         if (angle < 0) angle += p.TWO_PI;

         let currentAngle = 0;
         for (let i = 0; i < this.angles.length; i++) {
            currentAngle += this.angles[i];
            if (angle < currentAngle) {
               this.clickedIndex = i;
               break;
            }
         }
      }
   }
   
   makeChart(){
      new p5((p)=>this.drawChart(p), "canvas_container");
   }
}

const pieChart = new PieChart( 'pieChart' );
export {pieChart};