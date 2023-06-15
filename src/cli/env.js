const parseEnv = () => {
    for(const valueEnv in process.env) {
        if(valueEnv.search(/^RSS_/) === 0) {
            console.log(`${valueEnv}=${process.env[valueEnv]}`);
        }
    }
};

parseEnv();