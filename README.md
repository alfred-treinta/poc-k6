# Prueba de concepto K6
[Documentacion oficial](https://k6.io/docs/getting-started/installation/)

## Instalacion

### Linux
```sh
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo  "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```
### Fedora / CentOS
```sh
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```
### MacOS
```sh
brew install k6
```

### Windows
Si usas Chocolaty package manager:
```sh
choco install k6
```
Si usas Windows package mnager:
```sh
winget install k6
```

## Ejecucion
```sh
sh setEnvAndRun.sh
```