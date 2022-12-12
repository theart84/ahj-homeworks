export default class Post {
  constructor(post) {
    this.post = post;
  }

  markup() {
    return {
      type: 'div',
      attr: {
        class: ['post'],
        'data-post-id': this.post.id,
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['post__header'],
          },
          content: {
            type: 'h2',
            attr: {
              class: ['post__title'],
            },
            content: this.post.title,
          },
        },
        {
          type: 'div',
          attr: {
            class: ['post__body'],
          },
          content: [
            {
              type: 'div',
              attr: {
                class: ['post__image-wrapper'],
              },
              content: {
                type: 'img',
                attr: {
                  class: ['post__image'],
                  src: this.post.bodyImage,
                },
                content: '',
              },
            },
            {
              type: 'p',
              attr: {
                class: ['post__text'],
              },
              content:
                this.post.body.length > 150 ? `${this.post.body.slice(0, 150)}...` : this.post.body,
            },
          ],
        },
      ],
    };
  }
}
