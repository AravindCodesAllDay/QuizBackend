const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    teamName : {
        type : String,
        required : true
    },
    score : {
        type : Number 
    },
    time : {
        type : String
    }
})

module.exports = mongoose.model('Team',teamSchema);