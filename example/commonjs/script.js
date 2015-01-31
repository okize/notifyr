var $ = require('jquery');
var notifyr = require('../../dist/jquery.notifyr');

function slowAlert() {
  $('#target').notifyr();
}

window.setTimeout(slowAlert, 2000);

$('#trigger-notification').on('click', function(e) {
  e.preventDefault();
  $("<p role='alert'>Testing aria live.</p>").appendTo($('#notifications'));
});
