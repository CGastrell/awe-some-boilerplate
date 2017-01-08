/**
 *
 * @author Facugon <facugon@interactar.com>
 * @version 0.0.1
 *
 * Ampersand View component for rendering Bootstrap Modals
 *
 */
var View = require('ampersand-view')
var template_hbs = require('./template.hbs')
var buttons_hbs = require('./buttons.hbs')

var ButtonsView = View.extend({
  template: buttons_hbs,
  props: {
    'confirmButton': {
      'type': 'string',
      'default': 'CONFIRM'
    }
  },
  bindings: {
    'confirmButton': {
      'hook': 'confirm',
      'type': 'text'
    }
  }
})

module.exports = View.extend({
  initialize: function (options) {
    View.prototype.initialize.apply(this, arguments)
    options = options || {}

    var hiddenFn = this.onHiddenModal
    this.onHiddenModal = options.onHidden || hiddenFn

    var showFn = this.onShowModal
    this.onShowModal = options.onShow || showFn
  },
  template: template_hbs,
  autoRender: true,
  props: {
    'buttons': ['boolean', false, false],
    'class': 'string',
    'bodyView': 'object',
    'title': ['string', false, 'MODAL TITLE'],
    'confirmButton': ['string', false, 'CONFIRM'],
    'visible': ['boolean', false, false]
  },
  bindings: {
    'class': {
      'hook': 'modalizer-class',
      'type': 'attribute',
      'name': 'class'
    },
    'title': {
      'hook': 'title',
      'type': 'text'
    },
    'buttons': {
      hook: 'buttons',
      type: 'toggle'
    }
  },
  render: function () {
    this.renderWithTemplate(this)
    document.body.appendChild(this.el)
    var $modal = $(this.query('.modal'))
    this.$modal = $modal

    this.queryByHook('body')
      .appendChild(this.bodyView.el)

    if (this.buttons) {
      this.renderSubview(
        new ButtonsView({
          'confirmButton': this.confirmButton
        }),
        this.queryByHook('buttons-container')
      )
    }

    this.listenToAndRun(this, 'change:visible', this.toggleVisibility)
  },
  show: function () {
    this.visible = true
  },
  hide: function () {
    this.visible = false
  },
  toggleVisibility: function () {
    var $modal = this.$modal
    function show () {
      $modal.on('hidden.bs.modal', this.onHiddenModal)
      $modal.on('show.bs.modal', this.onShowModal)
      $modal.modal('show')
    }
    function hide () {
      $modal.modal('hide')
      $modal.off('hidden.bs.modal', this.onHiddenModal)
      $modal.off('show.bs.modal', this.onShowModal)
    }

    this.visible ? show.call(this) : hide.call(this)
  },
  onHiddenModal: function (ev) {
  },
  onShowModal: function (ev) {
  },
  remove: function () {
    // var $modal = this.$modal;
    this.hide()
    this.bodyView.remove()
    View.prototype.remove.apply(this, arguments)
  }
})
