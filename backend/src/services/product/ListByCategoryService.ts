import prismaClient from "../../prisma";

interface CategoryRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({ category_id }:CategoryRequest){

        const findBtCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })

        return findBtCategory;

    }
}

export {ListByCategoryService}