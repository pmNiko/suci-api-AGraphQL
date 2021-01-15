import server from "./gqlServer";
import { connect } from "./connect";

connect();

server.listen({ port: 3600 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
