#include <iostream>
#include <string>
#include <conio.h>
#include <fstream>
#include "pelaaja.h"
#include "valikko.h"
#include "pelikentta.h"
#include "laiva.h"
#include <iomanip>

int main()
{
	setlocale(LC_ALL, "Finnish");

	valikko pelivalikko("laivanupotus");

	//pelivalikko.highscoretarkastus();
	
	pelivalikko.aloita();

	return 0;

}

