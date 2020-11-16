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

## One more thing, for our seniors...

> If you are applying for a senior engineer role, please also fulfill the task below:
>
> Oh my! Requirements changed! Slack just released a new version of their API which allows to send HTML formatted messages! Now, some of us want to have their newsletters sent to slack instead of email! It seems our architecture is a bit too unflexible to easily incorporate this new request. Could you draft a rough diagram of a re-designed service architecture which would allow us to more easily build things like this in the future. For this, you can leave out one of the above stated requirements, choose the one you deem least important.

Essentially we want a multiplexer in the newsletter pipeline. If a user has selected email
notifications, the multiplexer would route the messages to an email sending service. Likewise
if the user has selected slack notifications it would route the messages to a service
that can push out notifications to slack. Keeping the slack and email services separate lets
them do what they do best without complicating their logic with each others' implementation details.

I actually built something like this at UnderArmour Connected Fitness. We called it TNS which stands
for ... Uh... "T Notification Service". I actually forgot what the T stood for. We just always
called it TNS. Anyway it worked like this: All of our microservices use a message queue, Kafka,
to interface with each other. Any service in the cloud could put an event on the queue that would
indicate that a notification needs to be sent out to a user. Notifications could take the form of:

- Email
- SMS
- Push-notifications in our mobile apps

Users could adjust the notification settings to their desired preference. They could choose to get
all of those three kinds of notifications, or none of them.

We then had services TNS-Email, TNS-SMS, and TNS-Push running in the cloud consuming messages
from the queue. Whenever they saw a notification they'd check the package for the user's
notification preferences. We packaged those preferences into the event so that the TNS services
themselves wouldn't have to reach out to the Identity service to get the user's preferences.
This meant that a user might still get a few notifications after they've disabled notifications
because whenever they turn notifications off there might still be a few unprocessed events in the
queue waiting to be ingested by TNS. We felt this wasn't too terrible and made sure that users
were aware that a changed setting may take a little while to "set in". And it meant that we didn't
have to constantly hammer the Identity service when we needed to send out thousands of
notifications a minute for a sustained period of time. Which was pretty common.

In the end we regularly pushed out around 20k notifications and emails every minute, all day long.

[yo]: https://yeoman.io/generators/
[ens]: https://github.com/cdimascio/generator-express-no-stress-typescript
[express]: https://expressjs.com/
