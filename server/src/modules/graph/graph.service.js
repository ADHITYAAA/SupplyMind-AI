import graphRepository from "./graph.repository.js";

class GraphService {

    async execute(query, parameters = {}) {

        return await graphRepository.execute(

            query,

            parameters

        );

    }

}

export default new GraphService();