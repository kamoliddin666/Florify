import Client from '../models/client.mode.js'
import { handleError } from '../helpers/error-handle.js'
import { successRes } from '../helpers/success.response.js'
import { Token } from '../utils/token-service.js'
import {
    confirmSignInClientValidator,
    signInClientValidator,
    signUpClientValidator,
    updateClientValidator
} from '../validation/client.validation.js'

import config from '../config/index.js'
import {generateOTP} from '../helpers/generate-otp.js'
import NodeCache from 'node-cache'
import { transporter } from '../helpers/send-mail.js'

const token = new Token();
const cache = new NodeCache();

export class ClientController {
    async signUp(req, res){
        try{
            const { value, error } = signUpClientValidator(req.body);
            if(error){
                return handleError(res, error, 422)
            }
            
            const existsEmail = await Client.findOne({email: value.email})
            if(existsEmail){
                return handleError(res, 'Email already registered', 409);
            }


            const client = await Client.create(value)
            const payload = {id: client._id}
            const accessToken = await token.generateAccessToken(payload);
            const refreshToken = await token.generateRefreshToken(payload)

            res.cookie('refreshTokenClient', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
            return successRes(res, {
                data: client,
                token: accessToken,
            },201)
 
        }catch(error){
            return handleError(res, error)
        }
    }

    async signIn(req,res){
        try{
            const { value, error } = signInClientValidator(req.body);
            if(error){
                handleError(res, error, 422)
            }
            const email = value.email;
            const client = await Client.findOne({ email });
            if (!client){
                return handleError(res, 'Email not found', 404)
            }
            const otp = generateOTP();
            const mailOptions = {
                from: config.MAIL_USER,
                to: email,
                subject: "client",
                text: otp
            }
            transporter.sendMail(mailOptions, function (error, info){
                if(error){
                    console.log(error)
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
            const { value, error } = confirmSignInClientValidator(req.body)
            if(error){
                return handleError(res, error, 422)
            }
            const { email, otp} = value;

            const client = await Client.findOne({ email });
            if (!client) {
             return handleError(res, "Client not found", 404);
            }
              const cachedOtp = cache.get(email);
           if (!cachedOtp || cachedOtp !== otp) {
             return handleError(res, "OTP is incorrect or expired", 400);
           }

            const payload = { id: client._id };
            const accessToken = await token.generateAccessToken(payload);
            const refreshToken = await token.generateRefreshToken(payload);

            res.cookie('refreshTokenClient', refreshToken, {
            httpOnly: true,
            secure: true,
             maxAge: 30 * 24 * 60 * 60 * 1000 
             });

           return successRes(res, {
             token: accessToken,
             data: client
           }, 200);
        }catch(error){
            return handleError(res, error)
        }
    }


  async newAccessToken(req,res){
    try{
      const refreshToken = req.cookies?.refreshTokenClient;
      console.log(req.cookies)
      if(!refreshToken){
        return handleError(res, 'Refresh token expired', 400);
      }
      const decodedToken = await token.verifyToken(refreshToken, config.REFRESH_TOKEN_KEY)
      if(!decodedToken){
        return handleError(res, 'Invalid token', 400);
      }
      const client = await Client.findById(decodedToken.id)
      if(!client){
        return handleError(res, 'Client not found', 404)
      }
      const payload = {id: client._id};
      const accessToken = await token.generateAccessToken(payload);
      return successRes(res, {
        token: accessToken
      })
    }catch(error){
      return handleError(res, error)
    }
  }

     async logOut(req, res) {
          try {
              const refreshToken = req.cookies?.refreshTokenClient;
              if (!refreshToken) {
                  return handleError(res, 'Refresh token expired', 400);
              }
              const decodedToken = await token.verifyToken(refreshToken, config.REFRESH_TOKEN_KEY);
              if (!decodedToken) {
                  return handleError(res, 'Invalid token', 400);
              }
              const admin = await Client.findById(decodedToken.id);
              if (!admin) {
                  return handleError(res, 'Client not found', 404);
              }
              res.clearCookie('refreshTokenAdmin');
              return successRes(res, {});
          } catch (error) {
              return handleError(res, error);
          }
      }
}