import type { HttpContext } from '@adonisjs/core/http'
import Wallet from '#models/wallet'
import { registerValidator, updateValidator } from '#validators/wallets_validator'

export default class WalletsController {
  async index() {
    return await Wallet.query().exec()
  }

  public async show({ params }: HttpContext) {
    return await Wallet.findOrFail(params.id)
  }

  public async store({ request }: HttpContext) {
    const output = await request.validateUsing(registerValidator)
    const wallet = await Wallet.create(output)

    return wallet
  }

  public async update({ params, request }: HttpContext) {
    const output = await request.validateUsing(updateValidator)
    const wallet = await Wallet.findOrFail(params.id)
    await wallet?.merge(output).save()

    return wallet
  }

  public async destroy({ params }: HttpContext) {
    const wallet = await Wallet.findOrFail(params.id)
    await wallet.delete()
    return wallet
  }
}
