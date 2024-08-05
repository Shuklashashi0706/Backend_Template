const userModal = require("../models/user.js");
const connectDb = require("../data/connectDB.js");
connectDb();
const fun = async () => {
  const aggregate = [
    // {
    //   $match: { name: "shashi" },
    // },
    // {
    //   $group: {
    //     _id: "$name",
    //     sum: { $sum: "$age" },
    //   },
    // },
    // {
    //   $project: {
    //     _id: 0,
    //     email: 1,

    //   },
    // },
    {
      $lookup: {
        from: "course",
        localField: "name",
        foreignField: "name",
        as: "result",
      },
    },
    {
      $unwind: {
        path: "$result",
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        course: "$result.course",
      },
    },
  ];
  const resp = await userModal.aggregate(aggregate);
  console.log(resp);
};
fun();
