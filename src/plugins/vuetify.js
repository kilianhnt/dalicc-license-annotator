import Vue from 'vue';
import Vuetify, {VTextarea} from 'vuetify/lib';

Vue.use(Vuetify, {components: {
        VTextarea
    }
});

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#ea4a3c',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
});
