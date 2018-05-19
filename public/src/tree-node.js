import {Behavior} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';

export class TreeNode {
  @bindable current = null;

  myFunc (node) {
//     return this.cLev(node.level) + node.name + this.cLev(node.level);
    return 15 * node.level;
  }

  cLev (count) {
    let temp = "";
    for (let i = 0; i < +count; i++) {
      temp += "  ";
    }
    return temp;
  }
}

