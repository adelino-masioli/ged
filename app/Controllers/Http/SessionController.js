'use strict'
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      let token = await auth.attempt(email, password)
      let userdata = await User.findByOrFail('email', email)
      let user = { 'id': userdata.id, 'name': userdata.name, 'email': userdata.email, 'role': userdata.role }
      return { token, user }
    } catch (err) {
      return response.send({ message: 'Usuário ou senha inválidos!' })
    }
  }
}

module.exports = SessionController
