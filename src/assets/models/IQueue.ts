import {Service} from "./Service";

export interface IQueue {
  id?: string,
  name: string,
  surname: string,
  middleName: string,
  email: string,
  phoneNumber: string,
  data: string,
  time: string,
  checkNumber: string,
  service: Service,
}
