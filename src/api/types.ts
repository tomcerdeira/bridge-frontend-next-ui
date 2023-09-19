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

export type CreateUserRequest = {
  email: string
  password: string
}

export type IEntityBase = {
  deletedAt: Date
  updatedAt: Date
  createdAt: Date
}

export type IRole = IEntityBase & {
  name: string
  id: number
}

export type IUser = IEntityBase & {
  id: number
  email: string
  // TODO: add status
}

export type IUserStatus =
  | 'VERIFY'
  | 'FORGOT_PASSWORD'
  | 'OK'

export type UserResponse = {
  role: IRole;
  email: string;
  id: number;
  status: IUserStatus;
  deletedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
};

export type ParsedUser = {
  id: number
  email: string
  role_name: string
}


export const MockResponse_IPaymentRequest: IPaymentRequest = {
    amount: 1800,
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
            unitPrice: 500,
            description: "Red socks paulo",
            imgUrl: "https://nicharry.com/cdn/shop/products/Red_Product_be8df392-ae5e-4447-9835-f4d01fd9db73.jpg",
            quantity: 10,
          },
          {
            name: "T-Shirt",
            unitPrice: 250,
            description: "Blue t-shirt",
            imgUrl: "data:image/jpeg;base64,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",
            quantity: 2,
          },
          {
            name: "Jeans",
            unitPrice: 600,
            description: "Classic denim jeans",
            imgUrl: "https://prototypearg.vtexassets.com/arquivos/ids/223078-800-auto?v=638120725749430000&width=800&height=auto&aspect=true",
            quantity: 1,
          },
          {
            name: "Sneakers",
            unitPrice: 800,
            description: "White sneakers",
            imgUrl: "https://thursdayboots.com/cdn/shop/products/1024x1024-Men-Premier-White-101322-3.4.jpg?v=1666896034",
            quantity: 3,
          },
          {
            name: "Hat",
            unitPrice: 50,
            description: "Black cap",
            imgUrl: "https://i.ebayimg.com/images/g/WPIAAOSw0W5aS742/s-l1600.jpg",
            quantity: 5,
          },
    ]
}