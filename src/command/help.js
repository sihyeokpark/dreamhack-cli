export default function help() {
  console.log(`
Usage: dh <command> [options]

Commands:
  dh config                        Configure user information
    --email=<email>
    --password=<password>  
  dh create <wargame_link>         Download wargame
    -d --docker                    Build docker image and run container
  dh help                          Display help for command
  `)
}