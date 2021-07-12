up:
	docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up

up-prod:
	docker-compose up

down: 
	docker-compose down
