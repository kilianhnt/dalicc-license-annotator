<template>
    <div id="app">
        <v-app>
            <router-view></router-view>
            <v-snackbar v-model="snackbar" color="rgb(66, 185, 131)">{{snackbarText}}</v-snackbar>
        </v-app>
    </div>
</template>

<script>
    import store from '@/store'

    export default {
        name: 'app',
        mounted: function () {
            store.commit('fetchDaliccLicenses')
        },
        computed: {
            snackbar: {
                get: function () {
                    return this.$store.state.snackbar
                },
                set: function (v) {
                    this.$store.commit('setSnackbar', v)
                }
            },
            snackbarText() {
                return this.$store.state.snackbarText
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    a {
        text-decoration: none;
    }

    #title {
        transition: all ease-in-out .3s;
    }

    .abs {
        position: absolute;
    }

    .half {
        width: 50%;
        z-index: 1;
    }

    .left {
        left: 0;
        top: 0;
        bottom: 0;
    }

    .right {
        right: 0;
        top: 0;
        bottom: 0;
    }

    .dark-bg {
        color: #212121;
        background-color: #e2e2e2;
        transition: all ease-in-out .3s;
    }

    .dark {
        color: #42b983;
        background: #fff;
        transition: all ease-in-out .3s;
    }

    .wrapper {
        transition: all ease-in-out .3s;
    }

    .fullscreen {
        display: block;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    #annotator {
        transition: all ease-in-out .3s;
        opacity: 0;
    }

    #content {
        position: absolute;
        padding: 100px 15%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: scroll;
    }

    .theme--light.v-icon {
        color: #42b983;
    }

    .theme--dark.v-card {
        background: #ffffff;
        color: #212121;
    }

    .theme--dark.v-subheader {
        color: #212121;
    }

    .theme--dark.v-icon, .theme--dark.v-input:not(.v-input--is-disabled) input, .theme--dark.v-input:not(.v-input--is-disabled) textarea {
        color: #ffffff !important;
    }

    .dark p, .dark h2 {
        color: #212121;
    }

    button i {
        margin-right: 15px;
    }

    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }

    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @media screen and (max-width: 992px) {
        .half {
            float: left;
            width: 100%;
            position: relative;
            min-height: 500px;
        }
    }

    @media screen and (max-width: 800px) {
        #content {
            padding: 100px 5%;
        }
    }
</style>
