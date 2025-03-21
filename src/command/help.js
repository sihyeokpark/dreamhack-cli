export default function help() {
  console.log(`
Usage: dh <command> [options]

Commands:
  dh config                        Configure user information
    --email=<email>
    --password=<password>  
  dh create <wargame_link>         Download wargame
    -d --docker                    Build docker image and run container
  dh vm <wargame_link>
    -c --create                    Create VM
    -g --get                       Get VM Info
    -d --delete                    Delete VM
  dh submit <wargame_link>         Submit flag
    --flag=<flag>
  dh help                          Display help for command
  `)
}
