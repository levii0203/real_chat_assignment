const cors = require('cors');

/**
 * @returns {Cors[Options]}
 */
module.exports.configureCors = ()=>{
    return cors({
        origin: (origin, callback) => {
            if (!origin || origin === 'null') {
                return callback(null, true);
            }
            const allowedOrigins = ['*'];  // allowing every origins
            if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: [
            'X-Content-Range',
            'Content-Range',
            'X-Forwarded-For'
        ],
        credentials: true,
    })
}

