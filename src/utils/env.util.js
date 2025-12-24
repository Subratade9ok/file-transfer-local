export function validateEnv() {
    const requiredVars = ["PORT", "UPLOAD_DIR", "BROWSE_PIN", "SESSION_SECRET"];
    const missingVars = requiredVars.filter(eVar => !(eVar in process.env));

    if (missingVars.length > 0) {
        throw new Error(`Missing environment variables: ${missingVars.join(", ")}`);
    }

    if (isNaN(parseInt(process.env.PORT))) {
        throw new Error("PORT must be a number");
    }

    if (process.env.UPLOAD_DIR.trim() === "") {
        throw new Error("UPLOAD_DIR must not be empty");
    }

    if (process.env.BROWSE_PIN.trim() === "") {
        throw new Error("BROWSE_PIN must not be empty");
    }

    if (process.env.SESSION_SECRET.trim() === "") {
        throw new Error("SESSION_SECRET must not be empty");
    }
}




import dotenv from "dotenv";

export function loadEnvAndValidate() {
    dotenv.config();
    validateEnv();
}
