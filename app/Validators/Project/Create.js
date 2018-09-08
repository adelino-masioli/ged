'use strict'

const Antl = use('Antl')

class Create {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Create
