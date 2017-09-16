var app = require('./server-config.js');

var port = 4568;
app.set('port', (process.env.PORT || port));
app.listen(app.get('port'), function() {
    console.log('Server now listening on port ', app.get('port'));
});