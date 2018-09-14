'use strict'
const User = use('App/Models/User')
const E = require('node-exceptions')
const Hash = use('Hash')

class SessionController {
  async store ({ request, response, auth }) {
    try {
      const { email, password } = request.all()

      /* let token = await auth.attempt(email, password)
      let userdata = await User.findByOrFail('email', email)
      let user = { 'id': userdata.id, 'name': userdata.name, 'email': userdata.email, 'role': userdata.role }
      return { token, user } */

      const user = await User.findBy('email', email)
      const passwordValid = await Hash.verify(password, user.password)

      if (!passwordValid) {
        throw new E()
      }

      const token = await auth.generate(user, true)
      // response.status(201).json({ token })
      return token
    } catch (err) {
      return response.send({ message: 'Usuário ou senha inválidos!' })
    }
  }
}

module.exports = SessionController
