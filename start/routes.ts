import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.post('/students', 'StudentsController.store')
  Route.post('/servers', 'ServersController.store')
}).middleware('auth')

Route.post('/login', 'AuthController.store')
Route.post('/logout', 'AuthController.destroy')
