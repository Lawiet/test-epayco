import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import string from '@adonisjs/core/helpers/string'
import {
  depositValidator,
  payValidator,
  registerValidator,
  confirmPayValidator,
  balanceValidator
} from '#validators/actions_validator'
import User from '#models/user'
import Wallet from '#models/wallet'
import Bill from '#models/bill'

export default class ActionsController {
  private response(data: any) {
    return {
      status: 200,
      success: true,
      error_code: 0,
      message: '',
      data: data,
    }
  }

  private responseError(message: String, status: number) {
    return {
      status: status,
      success: false,
      error_code: 0,
      message: message,
      data: {},
    }
  }

  public async register({ request }: HttpContext) {
    const output = await request.validateUsing(registerValidator)
    const wallet = new Wallet()
    const user = await User.create(output)
    wallet.userId = user.id
    await wallet.save()

    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Welcome')
        .html(`Welcome <b>${user.name.toUpperCase()} ${user.lastName.toUpperCase()}</b>!`)
    })

    return this.response('User successfully registered')
  }

  public async deposit({ request }: HttpContext) {
    const output = await request.validateUsing(depositValidator)
    const user = await User.query()
      .where('document', output.document)
      .where('phone', output.phone)
      .firstOrFail()
    const wallet = await Wallet.query().where('userId', user.id).firstOrFail()
    wallet.balance = wallet.balance + output.balance
    await wallet.save()

    return this.response('Deposit made successfully')
  }

  public async pay({ request }: HttpContext) {
    const output = await request.validateUsing(payValidator)
    const bill = new Bill()
    const user = await User.query()
      .where('document', output.document)
      .where('phone', output.phone)
      .firstOrFail()
    const wallet = await Wallet.query().where('userId', user.id).firstOrFail()
    if (wallet.balance < output.value) {
      return this.responseError('Insufficient amount', 300)
    }
    bill.walletId = wallet.id
    bill.userId = user.id
    bill.amount = output.value * -1
    bill.token = string.random(6)
    bill.session = string.random(22)
    await bill.save()

    await mail.send((message) => {
      message.to(user.email).subject('Token to pay')
        .html(`Hello <b>${user.name.toUpperCase()} ${user.lastName.toUpperCase()}</b>!<br>
         Your security code is: ${bill.token}, with the session code: ${bill.session}`)
    })

    return this.response({
      userId: user.id,
      walletId: wallet.id,
      amount: output.value,
      token: bill.token,
    })
  }

  public async confirmPay({ request }: HttpContext) {
    const output = await request.validateUsing(confirmPayValidator)
    const bill = await Bill.query()
      .where('token', output.token)
      .where('session', output.sessionCode)
      .firstOrFail()
    if (bill.success) {
      return this.responseError('The bill is paid', 300)
    }
    const wallet = await Wallet.findOrFail(bill.walletId)
    wallet.balance = wallet.balance + bill.amount
    bill.success = true
    await bill.save()
    await wallet.save()

    return this.response('Payment made successfully')
  }

  public async balance({ request }: HttpContext) {
    const output = await request.validateUsing(balanceValidator)
    const user = await User.query()
      .where('document', output.document)
      .where('phone', output.phone)
      .firstOrFail()
    const wallet = await Wallet.query().where('userId', user.id).firstOrFail()

    return this.response(wallet)
  }
}
