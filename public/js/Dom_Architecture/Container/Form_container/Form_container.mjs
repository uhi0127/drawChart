import { radio_Container } from './Radio_Container.mjs';
import { data_container } from './Data_container.mjs';
import { chartBtn_container } from './ChartBtnContainer.mjs';

class Form_container{
    constructor( id ) {
        this.id = id;
    }

    run(){
        // ** radio_Container 접기
        radio_Container.folding();
        
        // ** 라디오 버튼 클릭 => 차트 변경
        radio_Container.checkedChart();

        // ** radio_Container 접기
        data_container.folding();

        // ** 데이터 파싱 후 input 태그 생성
        data_container.createList();
        
        // ** input 입력값 기반으로 json data 생성
        data_container.madeChart();

        // ** 프론트에서 CRUD 기능
        chartBtn_container.controlList();
    }
}

const form_container = new Form_container("form_container");
export { form_container };