import { tasks } from "../utils/tasks";

const resolvers = {
  Query: {
    tasks: () => tasks,
  },
};

export default resolvers;
