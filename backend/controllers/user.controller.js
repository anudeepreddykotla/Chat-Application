import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loggedUserId = req.user._id;

        const loggedUser = await User.findById(loggedUserId);

        if (!loggedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove duplicate friend IDs
        const uniqueFriends = Array.from(new Set(loggedUser.friends.map(id => id.toString())));
        
        const allFriends = await User.find({ _id: { $in: uniqueFriends } }).select("-password");

        res.status(200).json(allFriends);
    } catch (error) {
        console.log("Error in getUsers controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
