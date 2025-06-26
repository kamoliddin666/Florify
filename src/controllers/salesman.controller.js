import Salesman from '../models/salesman.model.js'
import { handleError } from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { Token } from '../utils/token-service.js'
import {
    signUpSalesmanValidator,
    signInSalesmanValidator,
    confirmSignInSalesmanValidator
} from '../validation/salesman.validation.js'
import config from '../config/index.js'
import { generateOTP } from '../helpers/generate-otp.js'
import NodeCache from 'node-cache'
import { transporter } from '../helpers/send-mail.js'

const token = new Token();
const cache = new NodeCache();

export class SalesmanController {
    async signUp(req, res) {
        try{
            const { value, error } = signUpSalesmanValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const existsPhone = await Salesman.findOne({ phone_number: value.phone_number });
            if (existsPhone) {
            return handleError(res, 'Phone number already registered', 409);
            }
             const existsEmail = await Salesman.findOne({ email: value.email });
            if (existsEmail) {
             return handleError(res, 'Email address already registered', 409);
            }
            const existsUsername = await Salesman.findOne({username: value.username})
            if (existsUsername) {
                return handleError(res, 'Username already registered', 409)
            }
            const salesman = await Salesman.create(value);
            console.log('hello')

            const payload = {id: salesman._id};
            const accessToken = await token.generateAccessToken(payload);
            const refreshToken = await token.generateRefreshToken(payload);
            
            res.cookie('refreshTokenSalesman', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000 
            });
            return successRes(res, {
            data: salesman,
            token: accessToken
            }, 201);
        }catch(error){
            return handleError(res, error)
        }
                
    }

    async signIn(req,res){
        try{
            const { value, error } = signInSalesmanValidator(req.body);
            if(error){
                return handleError(res, error, 422)
            }
            const email = value.email;
            const salesman = await Salesman.findOne({ email });
            if(!salesman){
                return handleError(res, 'Salesman not found', 404)
            }
            const otp = generateOTP();
            const mailOptions = {
            from: config.MAIL_USER,
            to: email, 
            subject: "salesman",
            text: otp
        };
           transporter.sendMail(mailOptions, function (error, info) {
            if(error){
                console.log(error);
                return handleError(res, 'Error on sending to email', 400)
            }else{
                console.log(info)
            }
        })
           cache.set(email, otp, 120)
           return successRes(res, {
           message: "OTP sent successfuly to email"
        })
        }catch(error){
            return handleError(res, error)
        }
    }
    async confirmSignIn(req, res){
        try{
            const { value, error } = confirmSignInSalesmanValidator(req.body);
            if(error){
                return handleError(res, error, 422)
            }
            const { email, otp} = value;

            const salesman = await Salesman.findOne({ email });
            if (!salesman) {
             return handleError(res, "Salesman not found", 404);
            }
              const cachedOtp = cache.get(email);
           if (!cachedOtp || cachedOtp !== otp) {
             return handleError(res, "OTP is incorrect or expired", 400);
           }

            const payload = { id: salesman._id, role: 'salesman'};
            const accessToken = await token.generateAccessToken(payload);
            const refreshToken = await token.generateRefreshToken(payload);

            res.cookie('refreshTokenSalesman', refreshToken, {
            httpOnly: true,
            secure: true,
             maxAge: 30 * 24 * 60 * 60 * 1000 
             });

           return successRes(res, {
             token: accessToken,
             data: salesman
           }, 200);
        }catch(error){
            return handleError(res, error)
        }
    }

    async newAccessToken(req,res){
    try{
      const refreshToken = req.cookies?.refreshTokenSalesman;
      console.log(req.cookies)
      if(!refreshToken){
        return handleError(res, 'Refresh token expired', 400);
      }
      const decodedToken = await token.verifyToken(refreshToken, config.REFRESH_TOKEN_KEY)
      if(!decodedToken){
        return handleError(res, 'Invalid token', 400);
      }
      const salesman = await Salesman.findById(decodedToken.id)
      if(!salesman){
        return handleError(res, 'Salesman not found', 404)
      }
      const payload = {id: salesman._id};
      const accessToken = await token.generateAccessToken(payload);
      return successRes(res, {
        token: accessToken
      })
    }catch(error){
      return handleError(res, error)
    }
  }

    async logOut(req, res){
    try{
      const refreshToken = req.cookies?.refreshTokenSalesman;
      if(!refreshToken) {
        return handleError(res, 'Refresh token epxired', 400);
      }
      const decodedToken = await token.verifyToken(refreshToken, config.REFRESH_TOKEN_KEY);
      if(!decodedToken){
        return  handleError(res, 'Invalid token', 400)
      }
      const salesman = await Salesman.findById(decodedToken.id);
      if(!salesman){
        return handleError (res, 'Salesman not found', 404);
      }
      res.clearCookie('refreshTokenSalesman',{
        httpOnly:true,
        secure:true
      });
      return successRes(res, {})
    }catch(error){
      return handleError(res, error)
    }
  }
}