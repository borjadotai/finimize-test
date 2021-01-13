# Technical test - Borja Leiva 😜

Hi there, I'm Borja, nice to meet you!
First of all, when I originally tried to run the codebase I was getting an error coming from the server.
It kept on breaking when pulling the fresh code, first I thought, there must be something off with my machine but I then realised that the issue wasn't my machine but that in the original codebase, the root package.json was calling `node server.js` when the server is written in TS and the filename is `server.ts`. So in order to run the api on typescript I installed ts-node and changed the command to run `ts-node server.ts` which fixed the issue.
