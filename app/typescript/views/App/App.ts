import Vue from 'vue';
import Component from 'vue-class-component'
import * as styles  from "../../../styles/App.css";
import {
    helpButtonClickHandler, playButtonClickHandler,
    addButtonClickHandler, removeButtonClickHandler
} from "../../src/AppLogic";
import Card from '../Card';
import PlayerInput from "./PlayerInput";

@Component({
    components: {
        Card,
        PlayerInput
    },
    props: [
        'username',
        'players',
        'showRemove',
        'showNewPlayerInput'
    ],
    methods: {
        addButtonClickHandler: addButtonClickHandler,
        removeButtonClickHandler: removeButtonClickHandler,
        helpButtonClickHandler: helpButtonClickHandler,
        playButtonClickHandler: playButtonClickHandler
    },
    template:
        `<Card>
            <h1 class="${styles.title}">
                {{title}}
            </h1>
            <button v-on:click="playClicked" class="btn btn-success ${styles.playButton}">Play</button>
            <div class="${styles.namesContainer}">
                <PlayerInput v-for="(player, index) in players"
                             :disabled="true"
                             :player="player.name"
                             :showRemove="showRemove"
                             :showAdd="false"
                             :key="index"
                >
                </PlayerInput>
                <PlayerInput v-if="showNewPlayerInput"
                             :disabled="false"
                              player=""
                             :showRemove="false"
                             :showAdd="true"
                >
                </PlayerInput>
            </div>
            <div class="${styles.indexFooter}">
                <div class="${styles.loginInfo}">
                    Logged in as: {{username}} (<a class="${styles.inlineLink}" :href="logOutUrl">logout</a>)
                </div>
                <button v-on:click="helpButtonClickHandler" class="btn ${styles.helpButton}">Help</button>
            </div>
        </Card>`
})
export default class App extends Vue {
    playClicked = () => {
        playButtonClickHandler();
    };

    get title(): string {
        return 'Learn Duel';
    }

    get logOutUrl(): string {
        return window.location.origin + '/signOut';
    }
}
