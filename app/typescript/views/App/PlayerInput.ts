import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles  from "../../../styles/App.css";
import {addButtonClickHandler, removeButtonClickHandler} from "../../src/AppLogic";

// FIXME #11 split this App component into a few smaller ones, the card-div and player inputs are good candidates

@Component({
    props: [
        'disabled',
        'player',
        'showRemove',
        'showAdd'
    ],
    methods: {
        addButtonClickHandler: addButtonClickHandler,
        removeButtonClickHandler: removeButtonClickHandler
    },
    template:
        `<div class="${styles.namesContainer}">
            <div class="${styles.nameRow}">
                <input v-if="disabled" type="text" :value="player" class="form-control" readonly/>
                <input v-if="!disabled" type="text" :value="player" class="form-control"/>
                <button v-if="showRemove" v-on:click="removeButtonClickHandler" class="btn ${styles.minusButton}">Remove</button>
                <button v-if="showAdd"  v-on:click="addButtonClickHandler" class="btn ${styles.plusButton}">Add</button>
            </div>
        </div>`
})
export default class PlayerInput extends Vue {
}
