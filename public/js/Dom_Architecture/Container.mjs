import { form_container } from './Container/Form_container/Form_container.mjs';
import { canvas_container } from './Container/Canvas_container.mjs';
import { controlBox } from './Container/ControlBoxBtn.mjs';





class Container{
    constructor( id ) {
        this.id = id;
    }

}

const container = new Container("container");
export { container };