HEAD 		 := $(shell git rev-parse HEAD)
DOCKER_IMAGE := kirandasika30/resume-ui


all: build run

.PHONY: static
static:
	ng build --prod
	cp -a dist/resume-upload-ui/. static
	rm -rf dist

.PHONY: build
build:
	static
	go build -o server

.PHONY: run
run:
	./server

.PHONY: clean
clean:
	rm -rf static >> /dev/null
	rm main >> /dev/null

.PHONY: release 
release: static
	CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -installsuffix cgo -o main .
	docker build -t $(DOCKER_IMAGE):latest -f Dockerfile .
	docker push $(DOCKER_IMAGE):latest 
	make clean

.PHONY: kube
kube:
	kubectl apply -f templates/deployment.yml
	kubectl apply -f templates/service.yml

