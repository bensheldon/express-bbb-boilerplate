module.exports = function(req, res) {
  res.render('index', {
    title: "Boilerplate",
    layout : false
  });
}