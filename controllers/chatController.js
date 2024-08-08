

export const getAllChat= async (req, res, next) => {
    console.log("trigered");
    
    res.status(200).json({
        chat : "get all chat"
    })
};
export const createChats= async (req, res, next) => {
    
    res.status(200).json({
        data : "createChats"
    })
};

