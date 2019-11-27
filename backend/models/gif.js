const Pool = require('pg').Pool;

const gifSchema = pool.Schema ({
  image :​ ​{ type : image/gif​, required : true },  ​
  title :​ ​{ type: String​ , required :true },
})


model.exports = Pool.models('Gif', gifSchema);