const mongoose=require('mongoose');

const GroupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive', 'completed'],
    },
    startDate:{
        type:Date,
        default:Date.now,
        validate:{
            validator:function(value){
                return value >= new Date();
            },
            message: `Start date must not be in the past!`
        }
    },
    endDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                return value >= this.startDate;
            },
            message: `End date must be after the start date!`
        }
    },
    catagory:{
        type:String,
        required:true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],    

});


module.exports=mongoose.model('Group',GroupSchema);