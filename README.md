# Best Reddits

Keep track of your favorite sub-reddits.

## Quick Start

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## Challenge Solution Explanation

To get started quickly with the problem I immediately went to search the
[yeoman generators index][yo] to look for something that could get me up and
running with NodeJS + TypeScript. That quickly lead me to the
[express-no-stress][ens] generator. I went with this option because I knew that
I wanted to use [ExpressJS][express] for this solution. It's the web server
framework that I'm most familiar with when it comes to NodeJS. It's also very
minimal so it's perfectly suited for this problem.

Once I had generated the scaffolding I quickly started digging into it and
modifying the code to handle some CRUD operations for Users and Favorites.

You'll be able to play around with the app by starting it via `npm run dev` and
then navigating to `http://localhost:3000/api-explorer/` in your browser. You
should be able to exercise all of the implemented endpoints directly from that
webpage. But feel free to use `curl` if you'd prefer:

```shell
curl -X GET "http://localhost:3000/api/v1/users" -H "accept: */*"
```

The entire API is documented using OpenAPI. See `server/common/api.yml` for
details. You can also fetch the spec via the `/spec` endpoint. This was my first
time working with OpenAPI or Swagger but it was pretty familiar to some other
things I've worked with in the past so I picked it up without too much effort.

I also updated the test suite for each controller:

- `test/users.controller.ts`
- `test/favorites.controller.ts`

I had never used `supertest` before and I have to say, it seems pretty cool!
The test suite could certainly be expanded upon though. Right now it's just
testing a few happy paths. I didn't spend the time to implement some tests
for the unhappy paths.

Also I talked about my reasoning for the storage solution I went with in the
file `server/common/data.ts` so be sure to give that a look. I tried to keep
things very simple and lightweight here rather than bolt on production ready
services like a database and task scheduler. Or right, see `server/tasks.ts`
for some of my thoughts on the task scheduler solution I went with as well.

[yo]: https://yeoman.io/generators/
[ens]: https://github.com/cdimascio/generator-express-no-stress-typescript
[express]: https://expressjs.com/
