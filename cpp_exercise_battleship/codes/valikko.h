#pragma once
#include "pelaaja.h"
#include <iostream>
#include <string>
#include "pelikentta.h"
#include <vector>
#include "laiva.h"
#include <time.h>
#include <conio.h>
#include <fstream>
#include <setjmp.h>
#include <algorithm>


class valikko
{
public:

	std::string valikkonimi;
	std::vector<laiva> laivavektori;
	pelikentta kentta[10][10];
	std::vector<std::string> tulosvektori;

	int shipHits;
	int shipLengths;
	int tuhottu;
	int ammutut;

	bool gameover;
	bool debugmoodi = false;

	valikko(std::string _valikkonimi);

	~valikko();

	void aloita();
	void pelilooppi();
	void kentanluonti();
	void tulosta();
	void asetalaivat(std::string _symbol, int _lenght);
	void generoilaivat();

	void tarkistus();

	void arvaus();

	void highscore();

	void highscoretarkastus();
};

