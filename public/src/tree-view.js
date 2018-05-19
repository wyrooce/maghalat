// import {Behavior} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {NodeModel} from 'node-model';

export class TreeViewCustomElement {
  @bindable val = 11;
//   val = 3;

  constructor () {
//     console.log('val ', this.val);
//     this.init(this.val);
  }

  bind (a){
    console.log('val ', this.val);
    this.init(this.val);
  }

//   attached (a) {
//     console.log('val ', this.val);
//     this.init(this.val);
//   }

  init (a) {
    if (typeof a === 'object') {
      var root = new NodeModel('ریشه', 718);

      for (var i = 0; i < a.length; i++) {
        var obj    = a[i];
        var parent = root.findParent(obj.parent);
        parent.addChild(obj);
      }

      this.nodes = [root];
    }
  }

  openAll () {
    this.nodes[0].openAll();

  }

  closeAll () {
    this.nodes[0].closeAll();

  }

}
