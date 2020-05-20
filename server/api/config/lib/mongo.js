class MongoLib {
    constructor(Model){
        this.Model = Model;
    }

    getAll(query) {
        return {};
    }

    get(id){
        return this.Model.findOne({ _id: id });
    
    }

    create(data){
        return this.Model.insertOne(data);
    }

    update(id, data){
        return this.Model.updateOne({ _id: id }, { $set: data },{ upset: true });
    }

    delete(id){
        return this.Model.deleteOne({ _id: ObjectId(id) });
    }
}

module.exports = MongoLib;
