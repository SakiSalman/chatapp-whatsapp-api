import Chat from '../models/chatModals.js'
import createError from "../utility/createErroe.js";

export const getAllChat= async (req, res, next) => {
    try {
        const receiverId = req.params.id
    const senderId = req.me._id

    // console.log(receiverId);
    // console.log(senderId);
    
    const getChat = await Chat.find({
        $or: [
            {
                $and: [
                    { senderId: { $eq: senderId } },
                    { receiverId: { $eq: receiverId } }
                ]
            },
            {
                $and: [
                    { senderId: { $eq: receiverId } },
                    { receiverId: { $eq: senderId } }
                ]
            }
        ]
    });

    res.status(200).json({
        chat : getChat,
        statusCode : 200
    })
    
    } catch (error) {
        return next(createError(404, "Server error! please reload app!"))
    }
    
    
};
export const createChats= async (req, res, next) => {
   const {message, receiverId} = req.body
   const senderId = req.me._id

    if (!message || !receiverId || !req.me._id) {
        return next(createError(404, "Server error! please reload app!"))
    }

    const chat = await Chat.create({
        message : {
            text : message
        },
        receiverId : receiverId,
        senderId : senderId
    })
    const getChat = await Chat.find({
        $or: [
            {
                $and: [
                    { senderId: { $eq: senderId } },
                    { receiverId: { $eq: receiverId } }
                ]
            },
            {
                $and: [
                    { senderId: { $eq: receiverId } },
                    { receiverId: { $eq: senderId } }
                ]
            }
        ]
    });
    res.status(200).json({
        data : getChat,
        statusCode : 200
    })
};

