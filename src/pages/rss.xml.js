import rss from '@astrojs/rss';

let allPosts = import.meta.glob('./posts/*.md', { eager: true });
let posts = Object.values(allPosts);
posts = posts.sort((a, b) => {
  return (
    parseInt(b.url.split('/posts/')[1].split('-')[0]) -
    parseInt(a.url.split('/posts/')[1].split('-')[0])
  );
});

posts.splice(10);

export const get = () =>
  rss({
    title: '码上探索',
    description: '码上探索，探索科技与未来，每周发布，欢迎订阅',
    site: 'https://weekly.nancheng.fun/',
    customData: `<image><url>https://cdn.nancheng.fun/3d-white-abstract-glossy.png</url></image>`,
    items: posts.map((item) => {
      const url = item.url;
      const oldTitle = url.split('/posts/')[1];
      const title =
        '第' + oldTitle.split('-')[0] + '期 - ' + oldTitle.split('-')[1];
      return {
        link: url,
        title,
        description: item.compiledContent(),
        pubDate: item.frontmatter.date,
      };
    }),
  });
