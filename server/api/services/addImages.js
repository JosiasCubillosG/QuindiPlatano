const mongoose = require('mongoose');
const AddImage = mongoose.model('AddImages');
const S3Service = require('./s3Service')
const s3Service = new S3Service()

const AddImagesService = {
    async getImages(req, res) {
        const tags = req.query && req.query.tags;
        const query = tags && { tags: { $in: tags } };

        try{
            const image = await AddImage.find(query);
            res.send({ image, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async getImage(req, res) {
        const imageId = req.params.imageId;

        try{
            const image = await AddImage.findOne({ _id: imageId });   
            res.send({ image, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async createImage(req, res) {
        const { body: imageData } = req;
        try{
            const image = new AddImage(imageData);
            if(req.file){
                const amazonResponse = await s3Service.uploadImage(req.file, image._id);
                image.imageURL = amazonResponse.imageURL 
            }
            await image.save();
            res.send({ image, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async updateImage(req, res) {
        const { body: imageData } = req;
        try{
            const image = await AddImage.findById(req.params.imageId);

            if (!image) return res.send({
                message: 'The image does not exist',
                status: 'error'
            });

            await AddImage.updateOne({ _id: image._id }, imageData);
            res.send({ image, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async deleteImage(req, res) {
        const imageId = req.params.imageId;
        try{
            const image = await AddImage.findById(imageId);

            if (!image) return res.send({
                message: 'The image does not exist',
                status: 'error'
            });

            await s3Service.deleteImage(image.imageURL)
            await image.remove();
            res.send({ image, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    }
}

module.exports = AddImagesService;
