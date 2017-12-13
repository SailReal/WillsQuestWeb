import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

export class HeaderTemplate extends PolymerElement {
    constructor() {
        super();
    }

    static get template() {
        return '<h1>Hallo Welt!</h1>';
    }
}