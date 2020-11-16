import { User } from '../api/services/users.service';
import { Favorite } from '../api/services/favorites.service';

// Of course in any real system we'd be using some database here like
// PostgreSQL or Redshift or maybe some NoSQL solution like DynamoDB or
// Cassandra. I didn't want to impose any database technology here in
// this quick coding challenge. So this module is really simple and
// just keeps things in-memory in plain JavaScript data structures.

class Data {
  users: User[];
  favorites: Favorite[];

  constructor() {
    this.users = [
      {
        id: 'c558d991-8c8e-40d1-af48-2d680d8cd075',
        name: 'Amy Troschinetz',
      },
    ];
    this.favorites = [
      {
        id: '43da97e3-b219-4215-b31c-16171c413b49',
        user_id: 'c558d991-8c8e-40d1-af48-2d680d8cd075',
        link: 'https://www.reddit.com/r/hognosesnakes/',
      },
    ];
  }
}

export default new Data();
