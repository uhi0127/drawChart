import { addEvents } from '../../modules/addEvent.mjs';

class ControlBoxBtn{
    constructor( id ) {
        this.id = id;
    }

    folding(){
        addEvents.eventListener(document.querySelector("#controlBox_foldingBtn"),"click",(evt)=>{
            document.querySelector("#form_container").classList.toggle("hide");

            if( document.querySelector("#form_container").classList.contains("hide") ){
                evt.currentTarget.innerHTML = "컨트롤박스 열기";
                evt.currentTarget.title = "컨트롤박스 열기";
                
            }else{
                evt.currentTarget.innerHTML = "컨트롤박스 닫기";
                evt.currentTarget.title = "컨트롤박스 닫기";
            }
        })
    }
}

const controlBoxBtn = new ControlBoxBtn("controlBoxBtn");
export { controlBoxBtn };