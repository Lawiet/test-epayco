import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import Bill from '#models/bill'
import { registerValidator, updateValidator } from '#validators/bills_validator'

export default class BillsController {
  async index() {
    return await Bill.query().exec()
  }

  public async show({ params }: HttpContext) {
    return await Bill.findOrFail(params.id)
  }

  public async store({ request }: HttpContext) {
    const output = await request.validateUsing(registerValidator)
    const bill = await Bill.create(output)
    bill.success = false
    bill.token = string.random(6)
    await bill.save()

    return bill
  }

  public async update({ params, request }: HttpContext) {
    const output = await request.validateUsing(updateValidator)
    const bill = await Bill.findOrFail(params.id)
    await bill?.merge(output).save()

    return bill
  }

  public async destroy({ params }: HttpContext) {
    const bill = await Bill.findOrFail(params.id)
    await bill.delete()
    return bill
  }
}
