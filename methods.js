var app = new Vue({
  el: "#app",
  data: {
    info: null,
    loading: true,
    errored: false,
    upperIndex: 9,
    lowerIndex: 0,
    selectedEtnic: "ANY",
    randomName: "",
    selectedGender: "ANY",
    optionsGender: [
      { text: "ANY", value: "A" },
      { text: "FEMALE", value: "B" },
      { text: "MALE", value: "C" }
    ]
  },
  mounted() {
    const BASE_URL = "https://data.cityofnewyork.us/resource/g374-eanh.json";
    // const LIMIT = 3000;
    // const API_KEY = "c40YU5G1fauBzTem5OeXDvxPw";
    axios
      .get(BASE_URL)
      .then(response => (this.info = response.data))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  computed: {
    sortedInfo: function() {
      var temp = this.info.sort(function(a, b) {
        return b.cnt - a.cnt;
      });
      if (this.selectedGender != "ANY") {
        if (this.selectedGender == "MALE") {
          temp = temp.filter(function(el) {
            return el.gndr == "MALE";
          });
        } else {
          temp = temp.filter(function(el) {
            return el.gndr == "FEMALE";
          });
        }
      }
      if (this.selectedEtnic != "ANY") {
        if (this.selectedEtnic == "ASIAN AND PACIFIC ISLANDER") {
          temp = temp.filter(function(el) {
            return el.ethcty == "ASIAN AND PACIFIC ISLANDER";
          });
        } else if (this.selectedEtnic == "BLACK NON HISPANIC") {
          temp = temp.filter(function(el) {
            return el.ethcty == "BLACK NON HISPANIC";
          });
        } else if (this.selectedEtnic == "WHITE NON HISPANIC") {
          temp = temp.filter(function(el) {
            return el.ethcty == "WHITE NON HISPANIC";
          });
        } else if (this.selectedEtnic == "HISPANIC") {
          temp = temp.filter(function(el) {
            return el.ethcty == "HISPANIC";
          });
        }
      }
      return temp;
    },
    howMany: function() {
      var length = 0;
      if (this.info) {
        return (length = Object.keys(this.info).length);
      } else {
        return;
      }
    },
    getEtnic: function() {
      var arr = [];
      if (this.info) {
        arr.push("ANY");
        this.info.forEach(element => {
          arr.push(element.ethcty);
        });
        // console.log(arr);
        var distArr = [...new Set(arr)];
        return distArr;
      } else {
        return;
      }
    }
  },
  methods: {
    createRand: function() {
      var rand = Math.floor(Math.random() * 1000);
      this.randomName = this.info[rand].nm;
      return this.randomName;
    }
  }
});
