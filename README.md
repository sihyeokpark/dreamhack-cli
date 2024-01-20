# dreamhack-cli
> dreamhack-cli는 드림핵 문제 풀이 환경을 더 쉽고 간편하게 설정하는 툴입니다.

## how to use?
1. install package
```bash
npm install -g dreamhack-cli
```
2. config user information
```bash
dh config --email=<email> --password=<password>
```
3. create wargame
```bash
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
  dh help                          Display help for command
```