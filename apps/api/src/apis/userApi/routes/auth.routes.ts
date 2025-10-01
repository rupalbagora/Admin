import express from 'express';
import { register, login ,updateToken,updateProfile, getUserProfile, updateUserInfo,checkUserEmailExists } from '../controllers/auth.controller';
import { validate, validateLogin } from '../middlewares/validate';
import { createUserSchema } from '../validators/user.validator';
import { protect } from '../middlewares/auth.middleware';
import upload from '../../mediaApi/services/multerConfig';

const router = express.Router();
router.post('/', protect,updateToken );
router.post('/register', validate(createUserSchema), register);
router.post('/login', validateLogin, login);
router.put('/profile', protect,upload.single("avatar") , updateProfile);
router.get('/profile', protect ,getUserProfile);
router.get("/check-email", checkUserEmailExists);
router.put('/profile-update', protect ,updateUserInfo);

export default router;
