module.exports = function(app, detector) {

  /**
   * Display the registration form
   */
  app.get('/', function(req, res) {
    res.render('index');
  });

  /**
   * Validate the number. If it fails the initial checks,
   * then start the verification process.
   */
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

  /**
   * Shows the confirmation page where a user can enter
   * the code they received by SMS
   */
  app.get('/confirm', function(req, res) {
    res.render('confirm', {
      request_id: req.query.request_id
    });
  });

  /**
   * Process the verification code provided
   */
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

  /**
   * Confirm that the user is successfully registered
   */
  app.get('/registered', function(req, res) {
    res.render('registered');
  });
};