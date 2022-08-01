import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

export interface Pagination {
    next?: number ;
    prev?: number ;
}

export interface Results {
    count: number;
    allResorces: Document<Model<any>>[];
    pagination: Pagination;
} 

export interface AdvancedResponse extends Response{
    results: Results;
}

const adjustResults =  (model: Model<any>) => async (req: Request, res: AdvancedResponse, next: NextFunction) => {
    const queryStr = JSON.stringify(req.query).replace(/\b(lt|lte|gte|gt|in)\b/g, match => `$${match}`);
    const query = JSON.parse(queryStr)
 
    //Specify certain keys to do different functions
     const reservedFields = ['select', 'sort', 'page', 'limit'];
 
     //Exclude fields from filtering query object 
     reservedFields.forEach(field=> delete query[field]);

     Object.keys(query).forEach((key) => {
        try{
            query[key] =  JSON.parse(query[key]);
        }catch(err){
            console.log(err.message);
        }
     });

     console.log(query);
 
     //Save find query to a variable
     let findQuery = model.find(query);
 
     
 
     //Set function for select field
     if(req.query.select && typeof req.query.select === 'string'){
         const selectedFields = req.query.select.split(',').join(' ');
         findQuery.select(selectedFields)
     }
 
      //Set function for sort field
      if(req.query.sort && req.query.sort === 'string'){
         const sortingFilelds = req.query.sort.split(',').join(' ');
         findQuery.sort(sortingFilelds)
     }
 
     //Pagination
     const page = parseInt(req.query.page as string, 10) || 1;
     const limit = parseInt(req.query.limit as string, 10) || 2;
     const skip = (page-1) * limit;
 
     //Calculate total number of pages
     const allPages = Math.ceil( await model.countDocuments(query) / limit);
     let pagination: Pagination = {};
     
     //Create pagination object with prev & next page
     if (allPages > 1){
        if(page == 1 ){
            pagination.next = page + 1;
        }else if(page == allPages){
            pagination.prev = page - 1;
        }else{
            pagination.prev = page - 1,
            pagination.next = page + 1
        }
     }
    
     findQuery.skip(skip).limit(limit);
 
     //Execute Query
     const allResorces = await findQuery;

     //Store in response object
     res.results = { count: allResorces.length ,allResorces, pagination};
 
     next();
};

export default adjustResults;