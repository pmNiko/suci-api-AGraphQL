import server from "./gqlServer";

server.listen({ port: 3600 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
