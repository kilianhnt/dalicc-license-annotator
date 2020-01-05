<template>
    <div class="home">
        <h1 id="title"><span>DALICC</span><br/>license annotator</h1>
        <div class="half abs right dark-bg">
            <div class="wrapper">
                <div class="bottom-center-box">
                    <h2>Lorem ipsum</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean
                        massa. Cum sociis natoque penatibus et magnis dis.</p>
                        <v-btn @click="goToRead" x-large><v-icon>mdi-security</v-icon> retrieve license information</v-btn>
                </div>
            </div>
        </div>
        <div class="half abs left dark">
            <div class="bottom-center-box">
                <div class="wrapper">
                    <h2>Aliquam lorem ante</h2>
                    <p>ius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
                        ullamcorper
                        ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
                        sem
                        quam semper libero, </p>
                        <v-btn x-large @click="gotToWrite" color="primary" dark style="background: #42b983 !important"><v-icon>mdi-shield-key</v-icon> license your work</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    import store from '@/store'

    export default {
        name: 'Home',
        mounted: function () {
            store.state.readOnly = null;
        },
        methods: {
            goToRead: function (event) {
                store.state.readOnly = true;
                event.currentTarget.closest('.half').style.zIndex = 10;
                event.currentTarget.closest('.half').style.width = "100%";
                document.getElementById('title').style.opacity = 0;
                const wrapper = document.getElementsByClassName('wrapper');
                for (let i=0; i<wrapper.length; i++) {
                    wrapper[i].style.opacity = 0
                }
                setTimeout(function() {router.push('retrieve');}, 300)
            },
            gotToWrite: function (event) {
                store.state.readOnly = false;
                event.currentTarget.closest('.half').style.zIndex = 10;
                event.currentTarget.closest('.half').style.width = "100%";
                document.getElementById('title').style.opacity = 0;
                const wrapper = document.getElementsByClassName('wrapper');
                for (let i=0; i<wrapper.length; i++) {
                    wrapper[i].style.opacity = 0
                }
                setTimeout(function() {router.push('licensing');}, 300)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        text-transform: uppercase;
        text-align: left;
        position: relative;
        z-index: 100;
        color: #212121;
        margin-left: 2em;
        font-size: 3em;
        width: 50%;
    }

    h1 span {
        color: #ea4a3c;
        font-size: 2em;
    }

    h2 {
        margin-bottom: 2em;
    }

    button {
        margin-top: 3em;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .bottom-center-box {
        position: absolute;
        bottom: 20%;
        left: 10%;
        right: 10%;
        margin: 0 auto;
    }
</style>
