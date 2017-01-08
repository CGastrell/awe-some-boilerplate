var View = require('ampersand-view')
var ButtonView = require('components/formbutton')
var Modalizer = require('components/modalizer')

module.exports = Modalizer.extend({
  initialize: function (options) {
    var self = this
    Modalizer.prototype.initialize.apply(this, arguments)
    this.visible = options.visible || true // like auto open
    this.title = options.title || 'CONFIRM'
    var successFn = options.options.success || function () {}
    var failFn = options.options.fail || function () {}

    var content = new ContentView(options)
    this.bodyView = content.render()

    this.listenTo(content, 'change:show', function (state) {
      if (state.resolve) {
        successFn()
      } else {
        failFn()
      }

      if (!state.show) self.hide()
    })
  }
})

var ContentView = View.extend({
  template: require('./template.hbs'),
  props: {
    resolve: ['boolean', false, false],
    show: ['boolean', true, true],
    msg: ['string', false, 'are you sure?'],
    title: ['string', false, 'CONFIRM']
  },
  bindings: {
    'msg': {type: 'text', hook: 'msg'}
  },
  render: function () {
    var self = this
    this.renderWithTemplate(this)
    var yesBtn = new ButtonView({
      text: 'Yes',
      class: 'btn btn-primary',
      onClick: function () {
        self.resolve = true
        self.show = false
      }
    })

    var noBtn = new ButtonView({
      text: 'Cancel',
      class: 'btn btn-primary',
      onClick: function () {
        self.resolve = false
        self.show = false
      }
    })

    this.renderSubview(yesBtn, this.queryByHook('buttons-container'))
    this.renderSubview(noBtn, this.queryByHook('buttons-container'))
  }
})
