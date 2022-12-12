import Entity from './Entity';
import createRequest from './createRequest';

export default class ChatAPI extends Entity {
  create(data, callback) {
    const options = {
      method: 'POST',
      query: '/newuser',
      data,
      callback,
    };
    return createRequest(options);
  }
}
