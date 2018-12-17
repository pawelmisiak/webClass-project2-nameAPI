var app = new Vue({
  el: "#app",
  data: {
    info: null,
    loading: true,
    errored: false,
    upperIndex: 10,
    lowerIndex: 0,
    selectedEtnic: "All",
    selectedGender: "Any",
    optionsGender: [
      { text: "Any", value: "A" },
      { text: "Female", value: "B" },
      { text: "Male", value: "C" }
    ]
  },
  mounted() {
    axios
      .get("https://data.cityofnewyork.us/resource/g374-eanh.json")
      .then(response => (this.info = response.data))
      .catch(error => console.log(error))
      .finally(() => (this.loading = false));
  },
  computed: {
    sortedInfo: function() {
      return this.info.sort(function(a, b) {
        return b.cnt - a.cnt;
      });
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
        arr.push("All");
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
  }
});
