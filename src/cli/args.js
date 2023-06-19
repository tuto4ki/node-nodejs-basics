const parseArgs = () => {
    for (let i = 2; i < process.argv.length; i++) {
        if (/^--/.test(process.argv[i])) {
            const value = process.argv[i].slice(2,);
            if (!/^--/.test(process.argv[i + 1]) && i + 1 < process.argv.length) {
                console.log(`${value} is ${process.argv[i + 1]}`);
                i++;
            } else {
                console.log(`${value} is null`);
            }
        }
    }
};

parseArgs();