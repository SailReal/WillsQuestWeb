import Vue from 'vue';
import Component from 'vue-class-component'
import MyFooter from "./MyFooter";

@Component({
    components: {
        MyFooter
    },
    template: '<div><p>{{greeting}}</p><MyFooter/></div>'
})
export default class App extends Vue {
    get greeting(): string {
        return 'Hello from App';
    }
}