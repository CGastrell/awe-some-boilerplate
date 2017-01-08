var InputView = require('../index')
// window.$ = window.jQuery = require('jquery');
// require('jquery-datepicker');

module.exports = InputView.extend({
  render: function () {
    InputView.prototype.render.apply(this, arguments)
    // $(this.el).datepicker();
  }
})
