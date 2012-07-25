module.exports = function(req, res) {
  res.json([
    {
      "city" : "bainbridge",
      "endpoint": "http://seeclickfix.com/bainbridge-island/open311/"
    },
    {
      "city" : "baltimore",
      "endpoint": "http://311.baltimorecity.gov/open311/v2/"
    },
    {
      "city" : "bloomington",
      "endpoint": "https://bloomington.in.gov/crm/open311/v2/"
    },
    {
      "city" : "boston",
      "endpoint": "https://mayors24.cityofboston.gov/open311/v2/"
    }
  ]);
}