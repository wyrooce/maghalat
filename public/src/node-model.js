export class NodeModel {

  constructor (name, id, total, level) {
    this.name     = name;
    this.id       = id;
    this.total    = total;
    this.level    = level || 0;
    this.parent   = "";
    this.children = [];
    this.visible  = true;
    this.icon     = 'fa fa-plus';
    this.expanded = false;
  }

  addChild (child) {
    var child1     = new NodeModel(child.text, child.id, child.total, child.level);
    child1.parent  = this.id;
    child1.visible = false;
    this.children.push(child1);
  }

  findParent (id) {
    if (this.id == id) {
      return this;
    }
    for (var i = 0; i < this.children.length; i++) {
      var obj    = this.children[i];
      var result = obj.findParent(id);
      if (result == null) continue;
      return result;
    }
  }

  hasChildren () {
    return this.children.length > 0;
  }

  toggleNode () {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].visible = !this.children[i].visible;
    }
    this.expanded = !this.expanded;
    if (this.expanded === true) {
      this.icon = 'fa fa-minus';
    }
    else {
      this.icon = 'fa fa-plus';
    }
  }

  openAll () {
    this.visible = true;
    this.expanded = true;
    this.icon = 'fa fa-minus';
    for (var i = 0; i < this.children.length; i++) {
      var obj = this.children[i];
      obj.openAll();
    }
  }

  closeAll () {
    this.visible = false;
    this.expanded = false;
    this.icon = 'fa fa-plus';
    for (var i = 0; i < this.children.length; i++) {
      var obj = this.children[i];
      obj.closeAll();
    }
  }
}
