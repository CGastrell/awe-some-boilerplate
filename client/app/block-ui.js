var $ = require('jquery')

require('block-ui')

var app = require('ampersand-app')

$.blockUI.defaults.message = '<div><img src="/images/orange-loading.gif"><h1>LOADING...</h1></div>'
$.blockUI.defaults.css = {
  zIndex: 2000,
  padding: 0,
  margin: 0,
  width: '30%',
  top: '40%',
  left: '35%',
  textAlign: 'center',
  color: '#FFF',
  border: 'none',
  backgroundColor: '',
  cursor: 'wait'
}

app.extend({
  loadingCount: 0,
  pageLoading: false,
  startLoading: function () {
    return
    if (this.loadingCount === 0) $.blockUI()
    this.loadingCount++
  },
  finishLoading: function () {
    return
    this.loadingCount--
    if (this.loadingCount === 0) $.unblockUI()
  },
  startPageLoading: function () {
    return
    if (this.pageLoading) return
    this.pageLoading = true
    this.startLoading()
  },
  finishPageLoading: function () {
    return
    if (!this.pageLoading) return
    this.pageLoading = false
    this.finishLoading()
  }
})
