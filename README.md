# Technical test - Borja Leiva 🧑🏻‍💻

Hi there, I'm Borja, nice to meet you! 👋
These are some images of the final state of the UI. You can run it yourself and play around with it!

![Finimize Interest Rate Calculator - Light](https://i.imgur.com/hTZR2KE.png)
![Finimize Interest Rate Calculator - Dark](https://i.imgur.com/sx9Sd1S.png)

## Process & Thoughts

First of all, when I originally tried to run the codebase I was getting an error coming from the server.
It kept on breaking when pulling the fresh code, first I thought, there must be something off with my machine but I then realised that the issue wasn't my machine but that in the original codebase, the root package.json was calling `node server.js` when the server is written in TS and the filename is `server.ts`. So in order to run the api on typescript I installed ts-node and changed the command to run `ts-node server.ts` which fixed the issue.

Once I got that out of the way and had everything working, I worked on the following:

- Get the UI to store users input within state
- Communicate with the api sending the inputed values
- Get the api to receive such data, handle it and return the expected values
  - Took care of CORS
  - Error handling, data validation and formatting
  - Actual savings calculations
- Got the MVP working (initial UI receives input, talks to api, gets data and displays graph correctly)
- Then I started adding some things I thought would make the UX nicer
  - Light and Dark mode
  - Interest rate shown to the user on the slider label so they know exactly what percentage they are in
  - Graph is cool but I may want to quickly see in one go main decade savings
    - So I create a new component
    - And a new container for such predictions (responsive and looks good on mobile too)

Then I refactored some of the code a bit giving it a clearer structure as if this was a project that would continue to be used with new features coming in, so I removed all the files that I thought were not necessary and improved imports, etc to make things easier in the future. I separated concerns by adding new utils that can be re-used in the future like the `queryBuilder` and new helper files with small helper that are tightly coupled to their container / component. I also unit tested the component and containers I created.

Finally I also set up mocha and chai within the api to test the savings endpoint (had to add a long custom command due to ts as well).

## Intention

I could've kept on adding things but I think that the current product and codebase shows the skills I wanted to showcase:

- Got the mvp working as expected
- Added a little design touch and things like the dark mode which I believe would improve the users experience
- Found intial problems (like the ts-node issue) and solved them before starting
- Thought of things like validation, error handling, reusability and maintenance of codebase, etc
- Put the user first and improved the product to, while keeping it simple and clean, give a more informative experience to the user
- Didn't test extenisvely but showed how I can setup test frameworks and some basic unit tests for each type (didn't wanna go into integration / e2e)

I would probably improve the user inputs validation and maybe add a few things here and there (maybbe deboucing the inputs so we make less requests) but overall, for the given timeline, I am pretty happy with the state of the product! 💪😜
