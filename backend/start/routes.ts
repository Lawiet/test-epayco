/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const BillsController = () => import('#controllers/bills_controller')
const WalletsController = () => import('#controllers/wallets_controller')
const ActionsController = () => import('#controllers/actions_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('users', UsersController)
router.resource('bills', BillsController)
router.resource('wallets', WalletsController)

router.post('actions/register', [ActionsController, 'register'])
router.post('actions/deposit', [ActionsController, 'deposit'])
router.post('actions/pay', [ActionsController, 'pay'])
router.post('actions/confirmPay', [ActionsController, 'confirmPay'])
router.post('actions/balance', [ActionsController, 'balance'])
