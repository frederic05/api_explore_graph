import dotenv from 'dotenv';
dotenv.config();

      const appParams = {
        PORT        : process.env.PORT,
        ADRESS      : process.env.ADRESS,
        BDname      : process.env.BD,
        BDuserName  : process.env.USERNAME,
        BDpassWord  : process.env.PASSWORD,
        BDhostName  : process.env.HOSTNAME,
        BDdriver    : process.env.DB_DRIVER,
        BDport      : process.env.PORT_DATABASE,
        SECRETKEY   : process.env.SECRETKEY,
        EXPIRE      : process.env.EXPIRE
    } 

export default appParams