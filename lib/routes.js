module.exports = function(app, detector){

  // render a registration form
  app.get('/', function(req, res) {
    res.render('index');
  });

  // process the number for fraud
  // detection and if it fails
  // try to verify the number
  app.post('/', function(req, res) {
    var number = req.body.number;

    detector.matchesLocation(number, req, function(matches){
      if (matches) {
        res.redirect('/registered');
      } else {
        detector.startVerification(number, function(error, result){
          res.redirect('/confirm?request_id='+result.request_id);
        });
      }
    });
  });

  // show the confirmation page
  // where a user can fill in
  // the code they received via sms
  app.get('/confirm', function(req, res) {
    res.render('confirm', {
      request_id: req.query.request_id
    });
  });

  // process the code provided
  app.post('/confirm', function(req, res) {
    var code = req.body.code;
    var request_id = req.body.request_id;

    detector.checkVerification(request_id, code, function(error, result) {
      if (result.status == '0') {
        res.redirect('/registered');
      } else {
        res.redirect('/confirm');
      }
    });
  });

  // show the page when the
  // user is fully registered
  app.get('/registered', function(req, res) {
    res.render('registered');
  });
};
