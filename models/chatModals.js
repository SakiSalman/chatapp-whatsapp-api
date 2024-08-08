import mongoose from "mongoose";

/**
 * User Schema Design
 */
const chatSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    reviverId: {
      type: String,
      trim: true,
    },
    message: {
      text: {
        type : String,
        default : ""
      },
      photo: {
        type : String,
        default : ""
      },
      emoji : {
        type : String,
        default : ""
      }
    },
    theme : {
        type : String,
        default : "#d9fdd3"
    },
    status: {
      type: String,
      enum: ["seen", "sent"],
      default : "sent"
    },
    trash : {
      type : Boolean,
      default : false
    }
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("Chat", chatSchema);