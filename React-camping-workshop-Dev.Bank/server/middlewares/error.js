const handleErrors = (err,req,res,next)=>{
    //code body
    res.status(err.statusCode || 500).json({message:err.message || "Something went wrong"})
};
module.exports = handleErrors;