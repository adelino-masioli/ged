'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator(['User/Create'])
Route.post('sessions', 'SessionController.store').validator(['Session/Create'])

Route.post('passwords', 'ForgotPasswordController.store').validator(['ForgotPassword/ForgotPassword'])
Route.put('passwords', 'ForgotPasswordController.update').validator(['ForgotPassword/ResetPassword'])

Route.group(() => {
  Route.get('/files/:id', 'FileController.show')
  Route.post('/files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([
      [['projects.store'], ['Project/Create']],
      [['projects.update'], ['Project/Update']]
    ]))
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([
      [['projects.tasks.store'], ['Task/Create']],
      [['projects.tasks.update'], ['Task/Update']]
    ]))
}).middleware(['auth'])
