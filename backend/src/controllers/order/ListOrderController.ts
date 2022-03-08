import { Request, Response } from "express";

import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController{
    async handle(req: Request, res: Response){

        const listOrder = new ListOrderService()

        const order = await listOrder.execute()

        return res.json(order)

    }
}

export {ListOrderController}