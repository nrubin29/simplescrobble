# simplescrobble

simplescrobble is a free Last.fm scrobbler with support for advanced features. Check it out at [simplescrobble.com](http://simplescrobble.com) or run your own instance!

**Note**: simplescrobble is no longer supported and I will no longer be hosting it starting on September 1. All the features of simplescrobble--and many more--are available in my new app, Finale, for iOS, Android, and the web. Click [here](https://finale.app) to check it out!

## Features

- Track, artist, album, and playlist search
- Search using the Last.fm or Spotify database
- Custom datetime for scrobbles
- Scrobble entire albums and playlists
- 100% free, ad-free, and open-source, forever

## Running simplescrobble

Running your own instance of simplescrobble is easy! Here's how to do it:

1. [Get a Last.fm API key](https://www.last.fm/api/account/create). It's free.
2. If you'd like to use the Spotify features, [get a Spotify API key](). It's free. If you don't want to use the Spotify features, you should be fine to not provide a key.
3. Clone this repository.
4. Run `yarn install` or `npm install` to install the dependencies.
5. Rename the file `env-sample.ts` to `env.ts` and fill in your API key, API secret, and Spotify client ID.
6. Run `yarn run start` or `npm run start` to run simplescrobble locally.
7. Run `yarn run prod` or `npm run prod` to build a production bundle for simplescrobble. Note that if you are going to deploy your own version of simplescrobble, credit would be greatly appreciated.
