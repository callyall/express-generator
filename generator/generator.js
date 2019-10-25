const commands = {
    service:require('./commands/service'),
    middleware:require('./commands/middleware'),
    controller:require('./commands/controller'),
    model:require('./commands/model'),
    init:require('./commands/init'),
    help:{
        execute:()=>{
            let cmds = commands;
            if(args[0] !== undefined){
                for(let k in commands){
                    if(k === args[0]){
                        cmds = {};
                        cmds[k] = commands[k];
                        break;
                    }
                }
            }
            delete cmds.help;
            for(let k in cmds){
                console.log(`***************************************\n${k}:${cmds[k].help}`);
            }
            console.log('***************************************');
        }
    }
};

const args = process.argv;

const command = commands[args[2]];

if(command === undefined){
    throw new Error('No command selected!');
}

args.splice(0,3);

command.execute(args);