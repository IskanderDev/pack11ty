const pkg = require('../../../package.json');
const rootUrl = pkg.homepage;
const twitterUrl = `https://twitter.com/${pkg.author.twitter}`;

function isSelf(entry) {
  return (
    entry['wm-property'] === 'repost-of' && entry.url.startsWith(twitterUrl)
  );
}

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    return webmentions
      .filter((entry) => {
        return entry['wm-target'] === `${rootUrl}${url}`;
      })
      .filter((entry) => !isSelf(entry));
  },
  getMyWebmentionsForUrl: (webmentions, url) => {
    if (url === undefined) {
      console.log('No URL for webmention matching');
      return [];
    }
    return webmentions
      .filter((entry) => {
        return entry['wm-target'] === `${rootUrl}${url}`;
      })
      .filter((entry) => isSelf(entry));
  },
  getMyWebmentionsWithoutTarget: (webmentions) => {
    return webmentions.filter((entry) => {
      return entry['wm-target'] === undefined;
    });
  },
  isOwnWebmention: (webmention) => {
    const urls = [rootUrl, twitterUrl];
    const authorUrl = webmention.author ? webmention.author.url : false;
    // check if a given URL is part of this site.
    return authorUrl && urls.includes(authorUrl);
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter((entry) => entry['wm-property'] === mentionType);
  },
};