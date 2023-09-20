import mongoose from "mongoose"

const ApointmentSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    services: [
      {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        decription: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Appointment", ApointmentSchema)
