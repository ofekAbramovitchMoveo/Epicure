import { Dayjs } from 'dayjs'

import { User } from "./user.type"
import { BagDish } from './dish.type'

export type DeliveryDetails = Pick<User, 'fullName' | 'address' | 'phone'>

export type PaymentDetails = {
    cardNumber: string
    nameOnCard: string
    cvv: string
    expiryDate: Dayjs | null
}

export type OrderDetails = {
    _id?: string
    deliveryDetails: DeliveryDetails
    paymentDetails: PaymentDetails
    bag: BagDish[]
    totalPrice: number
    createdAt?: string
    userId: string
}