INCLUDE += -lgc

INCLUDE += -I $(PATSCONTRIB) 
INCLUDE += -I ../..

INCLUDE += -IIATS $(PATSCONTRIB)
INCLUDE += -IIATS ../..

PATSCC=patscc
PATSCC2=$(PATSCC) $(INCLUDE) $(INCLUDE_ATS)

CC=gcc
CXX=gcc


PATSCC=$(PATSHOME)/bin/patscc
PATSOPT=$(PATSHOME)/bin/patsopt
ATSCC2JS=/usr/bin/atscc2js
LIBATCC2JS=$(PATSHOMERELOC)/contrib/libatscc/libatscc2js


all: cotest_dats_direct.js wstest_dats_direct.js


%_dats.c: %.dats
	$(PATSOPT) -o $@ -d $<

%_dats.js: %_dats.c
	$(ATSCC2JS) -o $@ -i $<

%_dats_direct.js: %_dats.js
	directcc $< -o $@

clean:
	rm -f *_dats.js *_dats_direct.js

