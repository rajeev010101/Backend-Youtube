import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile:{
            type: String,
            required: true
        },
        thumbnail:{
            type: String, // cloudinary url
            required: true
        },

        views:{
            type: Number,
            default: 0
        }, 

        isPublished:{
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.type.ObjectId,
            ref: "User"
        },
        title:{
            type: String, //cloudinary
            required: true
        },
        description:{
          type: String, //cloudinary url
          required: true
        },
        duration:{
            type: Number,
            required: true
        },
    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("video", videoSchema)