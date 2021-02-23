const config=require('config')


module.exports=()=>{

    if(!config.get('jwtkey')&&(!config.get('m_pwd'))&&(!config.get('MongoDB_URL'))){
        console.error('Fatal Error','Please set environment variables')
        process.exit(1)
        
        }

}

