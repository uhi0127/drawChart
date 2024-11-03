import { SampleData } from '../modules/SampleData.mjs';
import {Queue} from '../modules/Queue.mjs';

class Abstract_Chart{
    constructor( id ){
        this.id = id;
        this.parentNode = document.querySelector("#canvas_container");
        this.chartKinds = SampleData.areaValue[id];
        this.chartKindsPaddings = { 
            LeftPadding : this.chartKinds.paddings.LeftPadding,
            RightPadding : this.chartKinds.paddings.RightPadding,
            TopPadding : this.chartKinds.paddings.TopPadding,
            BottomPadding : this.chartKinds.paddings.BottomPadding
        };

        this.chartKindsTexts = { 
            LeftTextArea : this.chartKinds.texts.LeftTextArea,
            BottomTextArea : this.chartKinds.texts.BottomTextArea
        };

        this.chartBox = null;
        this.fullWidth = 1200;
        this.fullHeight = this.parentNode.offsetHeight;
        this.chartTitle = null;
        this.textSize = 50;
        this._scale = 1;
        this.datas = new Queue("datas");
    }

    set title ( title ) {
        this.chartTitle = title;
    }

    get scale(){
        return this._scale;
    }

    set scale( scale ){
        this._scale = scale;
    }

    // ** 글자 / 선 색, 굵기 설정
    setStrokeInit = ( p, strokeColor, strokeWeight )=>{
        p.stroke( strokeColor );
        p.strokeWeight( strokeWeight );
    }

    // ** 글자 크기, 정렬 설정
    setFontInit = ( p, fontSize, horizAlign = p.CENTER ,vertAlign = p.CENTER )=>{
        p.textSize(fontSize);
        p.textAlign( horizAlign, vertAlign );
    }

    // ** 차트 label, value Queue
    makeQueue = ( listData = null ) =>{
        if( !listData ) {
            this.datas.initList();
            SampleData.data.forEach( data =>{
                this.datas.pushItem( data );
            });
        } else {
            this.datas.initList();
            listData.forEach( data =>{
                this.datas.pushItem( data );
            });
        }
        
    }

    // ** 캔버스 만들기
    makeCanvas = p =>{
        this.chartBox = p.createCanvas(this.fullWidth, this.fullHeight);
        this.chartBox.id(this.id + "Canvas");
        p.background("white");
    }

    // ** X좌표 보정
    modifyPosX = posX =>{
        return (
            this.chartKindsPaddings.LeftPadding 
            + this.chartKindsTexts.LeftTextArea 
            + posX
        );
    }

    // ** Y좌표 보정
    modifyPosY = posY =>{
        return (
            this.fullHeight
            - ( this.chartKindsPaddings.BottomPadding + this.chartKindsTexts.BottomTextArea )
            + posY*(-1)
        );
    }

    //** X축, Y축, 차트 타이틀
    drawAxis = p =>{
        //** X축 그리기
        const drawXAxis = ()=>{
            p.line(
                this.modifyPosX((-1) * this.chartKindsTexts.LeftTextArea),
                this.modifyPosY( 0 ),
                this.modifyPosX(
                    ( this.fullWidth - this.chartKindsPaddings.RightPadding )
                    - ( this.chartKindsPaddings.LeftPadding - this.chartKindsTexts.LeftTextArea ) 
                ),
                this.modifyPosY( 0 )
            );
        }

        //** Y축 그리기
        const drawYAxis = ()=>{
            p.line(
                this.modifyPosX(0),
                this.modifyPosY( (-1) * this.chartKindsTexts.BottomTextArea ),
                this.modifyPosX(0),
                this.modifyPosY( 500 )
            );
        }

        //** 차트 타이틀
        const chartTitles = () =>{
            this.setFontInit(p,50, p.LEFT,p.CENTER);

            p.text(
                this.chartTitle.value,
                this.modifyPosX( this.chartKindsPaddings.LeftPadding ),
                this.modifyPosY( 
                    this.fullHeight
                    - (this.chartKindsPaddings.BottomPadding + this.chartKindsTexts.BottomTextArea )
                    - ( this.chartKindsPaddings.TopPadding + this.chartTitle.textSize )
                )
            );
        }

        // ** Y축 Step
        const YAxisStep = ()=>{
            this.setFontInit( p, 16, p.RIGHT,p.CENTER );

            this.scale = 5;
            let posY = 0;
            let YIndex = 0;
            while( YIndex < 100 ){
                YIndex++;
                posY = this.scale * YIndex;

                if( ( posY / this.scale ) % 10 === 0  ){
                    p.stroke("black");
                    p.line(
                        this.modifyPosX(-20),
                        this.modifyPosY(posY),
                        this.modifyPosX(
                            ( this.fullWidth - this.chartKindsPaddings.RightPadding ) 
                            - ( this.chartKindsPaddings.LeftPadding + this.chartKindsTexts.LeftTextArea )
                        ),
                        this.modifyPosY(posY)
                    );

                    p.text(
                        YIndex,
                        this.modifyPosX((-1) * this.chartKindsTexts.LeftTextArea),
                        this.modifyPosY(posY)
                    )
                }else if( ( ( posY / this.scale ) % 5 === 0 ) ){
                    p.stroke("lightgray");
                    p.line(
                        this.modifyPosX(-10),
                        this.modifyPosY(posY),
                        this.modifyPosX(
                            ( this.fullWidth - this.chartKindsPaddings.RightPadding ) 
                            - ( this.chartKindsPaddings.LeftPadding + this.chartKindsTexts.LeftTextArea )
                        ),
                        this.modifyPosY(posY)
                    )
                }else{
                    p.stroke("lightgray");
                    p.line(
                        this.modifyPosX(-5),
                        this.modifyPosY(posY),
                        this.modifyPosX(5),
                        this.modifyPosY(posY)
                    )
                }
            }
        }

        drawXAxis();
        drawYAxis();
        YAxisStep();
        chartTitles();
    }
}

export { Abstract_Chart };