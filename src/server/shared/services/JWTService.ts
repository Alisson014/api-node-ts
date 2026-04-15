import jwt from "jsonwebtoken";


interface IJWTData {
    uid: number,
}

const sign = (data: IJWTData) => {
    if (!process.env.JWT_SECRETE) return "JWT_SECRETE_NOT_FOUND";
    
    return jwt.sign(data, process.env.JWT_SECRETE, {expiresIn: "24h"});
};

const verify = (token: string): IJWTData | "JWT_SECRETE_NOT_FOUND" | "INVALID_TOKEN" | undefined => {
    if (!process.env.JWT_SECRETE) return "JWT_SECRETE_NOT_FOUND";

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE);

        if (typeof decoded === "string"){
            return "INVALID_TOKEN";
        }

        return decoded as IJWTData;
        
    } catch (e: unknown) {
        if (e instanceof Error){
            return "INVALID_TOKEN";
        }
    }


};


export const JWTService = {
    sign,
    verify,
};

