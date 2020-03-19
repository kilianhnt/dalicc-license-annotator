import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        readOnly: null,
        daliccLicenses: [],
        daliccLicensesUris: [],
        daliccLicensesAxiosError: false
    },
    mutations: {
        fetchDaliccLicenses: function () {
            const url = 'https://dalicc-virtuoso.poolparty.biz/sparql?default-graph-uri=&query=SELECT+DISTINCT+%3Furi+%3Ftitle+%3Fstatus%0D%0AFROM+%3Chttps%3A%2F%2Fdalicc.net%2Flicense-library%2F%3E%0D%0AFROM+%3Chttps%3A%2F%2Fdalicc.net%2Flicense-library-meta%2F%3E%0D%0AWHERE+%7B%0D%0A++%3Furi+a+odrl%3ASet+.%0D%0A++%3Furi+%3Chttps%3A%2F%2Fdalicc.net%2Flicense%2Fstatus%3E+%3Fstatus%0D%0A++%7B%0D%0A++++%3Furi+dct%3Atitle+%3Ftitle+.%0D%0A++%7D+UNION+%7B%0D%0A++++%3Furi+odrl%3Apermission+%3Fpermission+.%0D%0A++++%3Fpermission+odrl%3Atarget+%3Fcollection+.%0D%0A++++%3Fcollection+a+odrl%3AAssetCollection+.%0D%0A++++%3Fcollection+dct%3Atitle+%3Ftitle+.++%0D%0A++%7D%0D%0A%7D%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
            axios
                .get(url, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.text())
                .then(data => data ? JSON.parse(data) : {})
                .then((out) => {
                    const licenses = out.results.bindings;
                    for (let i = 0; i < licenses.length; i++) {
                        this.state.daliccLicenses.push([licenses[i].title.value, licenses[i].uri.value]);
                    }
                    this.state.daliccLicenses.sort();
                })
                .catch(() => {
                    this.state.daliccLicensesAxiosError = true;
                    axios.get('/sparql.json', {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((data) => {
                        const licenses = data.data.results.bindings;
                        for (let i = 0; i < licenses.length; i++) {
                            this.state.daliccLicenses.push([licenses[i].title.value, licenses[i].uri.value]);
                        }
                        this.state.daliccLicenses.sort();
                    });
                });
        }
    }
})