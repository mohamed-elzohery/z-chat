"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const adjustResults = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const queryStr = JSON.stringify(req.query).replace(/\b(lt|lte|gte|gt|in)\b/g, match => `$${match}`);
    const query = JSON.parse(queryStr);
    //Specify certain keys to do different functions
    const reservedFields = ['select', 'sort', 'page', 'limit'];
    //Exclude fields from filtering query object 
    reservedFields.forEach(field => delete query[field]);
    Object.keys(query).forEach((key) => {
        try {
            query[key] = JSON.parse(query[key]);
        }
        catch (err) {
            console.log(err.message);
        }
    });
    console.log(query);
    //Save find query to a variable
    let findQuery = model.find(query);
    //Set function for select field
    if (req.query.select && typeof req.query.select === 'string') {
        const selectedFields = req.query.select.split(',').join(' ');
        findQuery.select(selectedFields);
    }
    //Set function for sort field
    if (req.query.sort && req.query.sort === 'string') {
        const sortingFilelds = req.query.sort.split(',').join(' ');
        findQuery.sort(sortingFilelds);
    }
    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 2;
    const skip = (page - 1) * limit;
    //Calculate total number of pages
    const allPages = Math.ceil((yield model.countDocuments(query)) / limit);
    let pagination = {};
    //Create pagination object with prev & next page
    if (allPages > 1) {
        if (page == 1) {
            pagination.next = page + 1;
        }
        else if (page == allPages) {
            pagination.prev = page - 1;
        }
        else {
            pagination.prev = page - 1,
                pagination.next = page + 1;
        }
    }
    findQuery.skip(skip).limit(limit);
    //Execute Query
    const allResorces = yield findQuery;
    //Store in response object
    res.results = { count: allResorces.length, allResorces, pagination };
    next();
});
exports.default = adjustResults;
//# sourceMappingURL=adjustResults.js.map