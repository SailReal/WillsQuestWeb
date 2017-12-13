import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

export class FooterTemplate extends PolymerElement {
    constructor() {
        super();
    }

    static get template() {
        return '<p>© 2017 by Jonas Reinwald und Julian Raufelder</p>';
    }
}