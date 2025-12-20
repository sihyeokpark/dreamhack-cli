# dreamhack-cli
> dreamhack-cli는 드림핵 문제 풀이 환경을 더 쉽고 간편하게 설정하는 툴입니다.

![Alt text](<preview.png>)

## how to use?
1. install package
```sh
npm install -g dreamhack-cli
```
2. config user information
```sh
dh config --email=<email> --password=<password>
```
3. create wargame
```sh
dh create https://dreamhack.io/wargame/challenges/1081 -d
```

## help
```
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
```