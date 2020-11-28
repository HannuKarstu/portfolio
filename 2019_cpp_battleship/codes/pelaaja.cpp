#include "pelaaja.h"
int pelaaja::pelaajanumero = 1;


pelaaja::pelaaja()
{
	mypelaajanumero = pelaajanumero;
	std::cout << "Syötä pelaajan " << mypelaajanumero << " nimi: ";
	std::cin >> nimi;
	pelaajanumero++;



	

}

void pelaaja::tulostapelaajanimi()
{
	std::cout << "Pelaajan " << mypelaajanumero << " nimi on " << nimi << std::endl;
}
