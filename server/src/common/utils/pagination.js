const buildPagination = (total, page, limit) => {

    const totalPages = Math.ceil(total / limit);

    return {

        total,

        page,

        limit,

        totalPages,

        hasNextPage: page < totalPages,

        hasPreviousPage: page > 1,

        nextPage: page < totalPages ? page + 1 : null,

        previousPage: page > 1 ? page - 1 : null

    };

};

export default buildPagination;