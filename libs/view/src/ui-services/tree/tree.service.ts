import { Inject, Injectable, Optional } from '@angular/core';
import { ClTreeNode } from '@sadad/component-lib/src/models';

@Injectable()
export class TreeService<T> {

  #node!: ClTreeNode<T>;
  constructor(@Inject('root') public root: ClTreeNode<T>,
              @Optional() @Inject('childId') public childId?: string) {
    this.root = root;
    this.childId = childId;

    this.findNode(this.root, this.childId);
  }

  protected findNode(root: ClTreeNode<T>, id?: string) {
    if (root && root.key == id) {
      this.#node = root;
    }
    else if (root && !root.leaf && root.children?.length) {
      root.children.forEach(x => this.findNode(x, id));
    }
  }

  get node() {
    return this.#node;
  }
}
