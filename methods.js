var app = new Vue({
  el: "#app",
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
      upperIndex: 19,
      lowerIndex: 0
    };
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
      return this.info
        .sort(function(a, b) {
          return a.cnt - b.cnt;
        })
        .reverse();
    },
    howMany: function() {
      var length = 0;
      if (this.info) {
        return (length = Object.keys(this.info).length);
      } else {
        return;
      }
    }
  }
});
