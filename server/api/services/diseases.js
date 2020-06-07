const mongoose = require('mongoose');
const Disease = mongoose.model('Diseases');
const S3Service = require('./s3Service')
const s3Service = new S3Service()

const DiseasesService = {
    async getDiseases(req, res) {
        const tags = req.query && req.query.tags;
        const query = tags && { tags: { $in: tags } };

        try{
            const disease = await Disease.find(query);
            res.send({ disease, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async getDisease(req, res) {
        const diseaseId = req.params.diseaseId;

        try{
            const disease = await Disease.findOne({ _id: diseaseId });   
            res.send({ disease, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async createDisease(req, res) {
        const { body: diseaseData } = req;
        try{
            const disease = new Disease(diseaseData);
            if(req.file){
                const amazonResponse = await s3Service.uploadImage(req.file, disease._id);
                // const amazonResponse2 = await s3Service.uploadImage(req.file, disease._id);
                // const amazonResponse3 = await s3Service.uploadImage(req.file, disease._id);
                // const amazonResponse4 = await s3Service.uploadImage(req.file, disease._id);
                // const amazonResponse5 = await s3Service.uploadImage(req.file, disease._id);

                disease.imageURL = amazonResponse.imageURL
                // disease.imageURL2 = amazonResponse2.imageURL
                // disease.imageURL3 = amazonResponse3.imageURL
                // disease.imageURL4 = amazonResponse4.imageURL
                // disease.imageURL5 = amazonResponse5.imageURL
            }
            await disease.save();
            res.send({ disease, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async updateDisease(req, res) {
        const { body: diseaseData } = req;
        try{
            const disease = await Disease.findById(req.params.diseaseId);

            if (!disease) return res.send({
                message: 'The disease does not exist',
                status: 'error'
            });

            await Disease.updateOne({ _id: disease._id }, diseaseData);
            res.send({ disease, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async deleteDisease(req, res) {
        const diseaseId = req.params.diseaseId;
        try{
            const disease = await Disease.findById(diseaseId);

            if (!disease) return res.send({
                message: 'The disease does not exist',
                status: 'error'
            });

            await s3Service.deleteImage(disease.imageURL)
            await disease.remove();
            res.send({ disease, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    }
}

module.exports = DiseasesService;
