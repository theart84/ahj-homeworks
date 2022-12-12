import Post from './Post';
import templateEngine from './TemplateEngine';

export default class Widget {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.bindToDOM();
    this.registerEvents();
    this.skeletonScreen();
    this.fetchData();
    this.connectWorker();
  }

  registerEvents() {}

  bindToDOM() {
    this.container.appendChild(templateEngine.generate(this.markup()));
    this.messageContainer = this.container.querySelector('.widget__content');
  }

  connectWorker() {
    if (navigator.serviceWorker) {
      window.addEventListener('load', async () => {
        try {
          await navigator.serviceWorker.register('./service.worker.js', { scope: './' });
          console.log('Service worker is register!');
        } catch (e) {
          console.log(e);
        }
      });
    }
  }

  skeletonScreen() {
    const template = `
      <div class="post--skeleton" data-post-id="82e31745-55b1-1af2-456e-64a1993e3a81">
        <div class="post__header--skeleton">
            <h2 class="post__title--skeleton skeleton-animation"></h2>
        </div>
        <div class="post__body--skeleton">
          <div class="post__image-wrapper--skeleton skeleton-animation">
            <img class="post__image--skeleton skeleton-animation" src="#" alt="">
          </div>
          <div class="post__text-container--skeleton">
            <p class="post__text--skeleton skeleton-animation"></p>
            <p class="post__text--skeleton skeleton-animation"></p>
            <p class="post__text--skeleton skeleton-animation"></p>
          </div>
        </div>
      </div>
    `;
    for (let i = 0; i < 3; i++) {
      this.messageContainer.insertAdjacentHTML('afterbegin', template);
    }
  }

  async fetchData() {
    const request = await fetch('https://ahj-loading-styling.herokuapp.com/posts');
    const response = await request.json();
    this.messageContainer.textContent = '';
    this.addPost(response);
  }

  addPost(data) {
    const { posts } = data;
    posts.forEach((post) => {
      const newPost = new Post(post);
      this.messageContainer.appendChild(templateEngine.generate(newPost.markup()));
    });
  }

  markup() {
    return {
      type: 'div',
      attr: {
        class: ['widget'],
      },
      content: [
        {
          type: 'div',
          attr: {
            class: ['widget__header'],
          },
          content: [
            {
              type: 'h1',
              attr: {
                class: ['widget__title'],
              },
              content: 'My Widget',
            },
          ],
        },
        {
          type: 'div',
          attr: {
            class: ['widget__content'],
          },
          content: '',
        },
      ],
    };
  }
}
