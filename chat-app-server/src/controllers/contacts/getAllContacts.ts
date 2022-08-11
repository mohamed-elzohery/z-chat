import BadRequest from "../../utils/errors/BadRequest";
import asyncHandler from "../../middlewares/asyncHandler";
import User from "../../models/User";
import { AuthenticatedRequest } from "../../middlewares/authGuard";

const getAllContactsData = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
    const allContacts = await User.aggregate([
        {$match: {_id: {$ne: req.user._id}}},
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "receiver",
                as: "receivedMessages",
                pipeline: [
                    {$match: {"sender": req.user._id}},
                    {$sort: {"date": -1}},
                ]
              },
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "sender",
                as: "sentMessages",
                pipeline: [
                    {$match: {"receiver": req.user._id}},
                    {$sort: {"date": -1}},
                ]
              },
        },
        {
            $project: {
                countOfUnseenMessages: {$size: {$filter: {input: "$sentMessages", as: "message" , cond: {$eq: ["$$message.isSeen", false]}}}},
                name: 1,
                photo: 1,
                messages: {$concatArrays: ["$receivedMessages", "$sentMessages"]}
            }
        },
        {
            $unwind: {
                path: "$messages",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $sort: {"messages.date": -1}
        },
        {
            $limit: 20
        },
        {
            $group:{
                _id: "$_id",
                messages: {$push: "$messages"}, 
                name: { $first: "$name" },
                photo: { $first: "$photo" },
                countOfUnseenMessages: {$first: "$countOfUnseenMessages"}
            }
        },
        {
            $project:
            {
                countOfUnseenMessages: 1,
                name: 1,
                photo: 1,
                lastMessage: {$first: "$messages"},
            }
        },
        {
            $sort: {
                "lastMessage.date": -1
            }
        }
    ]);
    res.json({contacts: allContacts});
});


export default getAllContactsData;