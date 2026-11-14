import createApiClient from "./api.service"
import type { AxiosInstance } from 'axios'
import type { Contact, ContactInput } from './contact.types'

class ContactService {
  api: AxiosInstance;

  constructor(baseURL = "/api/contacts") { 
    this.api = createApiClient(baseURL);
  }

  async getAll(): Promise<Contact[]> { 
    return (await this.api.get<Contact[]>("/")).data;
  }

  async create(data: ContactInput) { 
    return (await this.api.post("/",data)).data;
  }

  async deleteAll() { 
    return (await this.api.delete("/")).data;
  }

  async get(id: string): Promise<Contact> { 
    return (await this.api.get<Contact>(`/${encodeURIComponent(id)}`)).data;
  }

  async update(id: string, data: ContactInput) { 
    return (await this.api.put(`/${encodeURIComponent(id)}`, data)).data;
  }

  async delete(id:string) { 
    return (await this.api.delete(`/${id}`)).data;
  }
};

export default new ContactService()
