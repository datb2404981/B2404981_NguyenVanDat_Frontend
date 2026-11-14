export interface Contact {
  _id: string
  name: string
  email: string
  address: string
  phone: string
  favorite: boolean
}

export type ContactInput = Omit<Contact, '_id'>
