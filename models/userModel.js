import mongoose from "mongoose";

/**
 * User Schema Design
 */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
    },
    isActivate: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// export model
export default mongoose.model("User", userSchema);