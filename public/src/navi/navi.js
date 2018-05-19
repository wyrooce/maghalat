import { Behavior } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';

export class Navi {
    // @bindable current = null;

    attached(params, navigationInstruction) {
        console.log(navigationInstruction);
    }
}

