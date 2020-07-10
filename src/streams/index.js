import { Subject } from "rxjs";

const subject = new Subject();

export const indexServices = {
  sendForm: (message) => subject.next({ payload: payload }),
  clearForm: () => subject.next(),
  getFormData: () => subject.asObservable(),
};
