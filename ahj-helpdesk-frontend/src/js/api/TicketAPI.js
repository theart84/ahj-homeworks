import Entity from './Entity';
import createRequest from './createRequest';

export default class TicketAPI extends Entity {
  list(callback) {
    const options = {
      method: 'GET',
      query: `method=allTickets`,
      callback,
    };
    return createRequest(options);
  }

  get(id, callback) {
    const options = {
      method: 'GET',
      query: `method=ticketById&id=${id}`,
      callback,
    };
    return createRequest(options);
  }

  create(data, callback) {
    const options = {
      method: 'POST',
      query: `method=createTicket`,
      data,
      callback,
    };
    return createRequest(options);
  }

  update(id, data, callback) {
    const options = {
      method: 'POST',
      query: `method=updateById&id=${id}`,
      data,
      callback,
    };
    return createRequest(options);
  }

  delete(id, callback) {
    const options = {
      method: 'GET',
      query: `method=deleteById&id=${id}`,
      callback,
    };
    return createRequest(options);
  }
}
