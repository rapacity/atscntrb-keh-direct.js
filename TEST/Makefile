DIRECTCC  = ../bin/directcc
NODEJS    = /usr/bin/env node

ATSCC2JS  = atscc2js
CC        = gcc
PATSCC    = patscc
INCLUDE   = $(patsubst %,-I %,$(subst :, ,$(PATSHOMELOCS)))
PATSCC2   = $(PATSCC) $(INCLUDE)

all: cotest_dats_direct.js wstest_dats_direct.js chlink_dats_direct.js ch1test_dats_direct.js

%_dats.c: %.dats
	$(PATSCC2) -ccats -o $@ $<

%_dats.js: %_dats.c
	$(ATSCC2JS) -o $@ -i $<

%_dats_direct.js: %_dats.js
	$(NODEJS) $(DIRECTCC) $< -o $@

clean:
	rm -f *_dats.c *_dats.js *_dats_direct.js

