
import app from './app.js';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_API 
});

app.listen(process.env.PORT, () =>{
    console.log(`server running on port ${process.env.PORT}`);
})