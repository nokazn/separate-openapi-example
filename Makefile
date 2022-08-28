#!/usr/bin/env make -f

.PHONY: join
join:
	cue export ./paths/pet.yml openapi.yml --out yaml --verbose
# cue export openapi.yml --out yaml --verbose

.PHONY: failed-join
failed-join:
	cue export ./paths/pet.yml schemas.yml --out yaml
