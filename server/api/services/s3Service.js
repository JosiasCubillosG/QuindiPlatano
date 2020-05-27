const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')

// Configure AWS with your access and secret key.
const {
	config: {
		AMAZON_PUBLIC_KEY,
		AMAZON_SECRET_KEY,
		BUCKET_NAME
	}
} = require('../config/index');

// Configure AWS to use promise
AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({ accessKeyId: AMAZON_PUBLIC_KEY, secretAccessKey: AMAZON_SECRET_KEY });

// Create an s3 instance
const s3 = new AWS.S3();

module.exports = class S3Service {
	async uploadImage(image, itemID) {
		const pathImage = path.join(__dirname, '../images', image.originalname);
		const uploadImage = fs.createReadStream(pathImage)
		
		let location = '';
		const params = {
			Bucket: BUCKET_NAME,
			Key: `${itemID}-${image.originalname}`,
			Body: uploadImage,
			ACL: 'public-read',
			ContentType: image.mimetype
		};

		try {
			const { Location } = await s3.upload(params).promise();
			location = Location;
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			};
		}

		return {
			status: 'success',
			imageURL: location
		};
	}

	async deleteImage(url) {
		const Key = url.split('/')[3]
		const params = {
			Bucket: BUCKET_NAME,
			Key
		};

		try {
			await s3.deleteObject(params).promise();
			return { status: 'success' };
		} catch (error) {
			return {
				status: 'error',
				message: error.message
			};
		}
	}
};
