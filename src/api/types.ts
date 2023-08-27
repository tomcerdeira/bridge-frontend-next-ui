export type ICustomer = {
    fullName: string
    email: string
    address: string
    city: string
}

export type IItem = {
    name: string
    unitPrice: number
    description: string
    imgUrl: string
    quantity: number
}

export type IPaymentRequest = {
    amount: number
    customer: ICustomer
    shopId: number
    associatedFlowId: string
    products: IItem[]
}

export const MockResponse_IPaymentRequest: IPaymentRequest = {
    amount: 100,
    customer: {
      fullName: "John Smith",
      email: "john@example.com",
      address: "123 Main St",
      city: "Anytown"
    },
    shopId: 0,
    associatedFlowId: "ObjectId(\"64de37518d54aa9678f72b04\")",
    products: [
      {
        name: "Socks",
        unitPrice: 100,
        description: "Red socks",
        imgUrl: "https://nicharry.com/cdn/shop/products/Red_Product_be8df392-ae5e-4447-9835-f4d01fd9db73.jpg",
        quantity: 1
      }
    ]
}