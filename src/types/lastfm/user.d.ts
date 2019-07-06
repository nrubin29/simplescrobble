interface LUser {
  type: 'user';
  id?: string;
  name: string;
  realname: string;
  url: string;
  image: LImage[];
  country: string;
  age: string;
  gender: 'm' | 'f';
  subscriber: '0' | '1';
  playcount: string;
  playlists: string;
  bootstrap: string;
  registered: {
    unixtime: string;
    '#text': string;
  };
}

interface LAuthenticationResponse {
  session: {
    name: string;
    key: string;
  };
}

interface LUserResponse {
  user: LUser;
}
