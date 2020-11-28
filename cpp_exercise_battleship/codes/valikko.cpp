#include "valikko.h"

valikko::valikko(std::string _valikkonimi)
{
	valikkonimi = _valikkonimi;
	gameover = false;
	shipHits = 0;
	shipLengths = 0;
	ammutut = 0;
}

valikko::~valikko()
{
}

//P‰‰valikko
void valikko::aloita()
{
	int valinta;

	do {
		alku:

		system("cls");

		std::cout << "Laivanupotus-peli\n"
			"  by Aleksi Koivu ja Hannu Karstu\n\n"

			"Valitse:\n"
			"  (1) Uusi peli\n"
			"  (2) Parhaat tulokset\n"
			"  (0) Lopeta peli\n\n";

		std::cin >> valinta;

		std::cin.clear();
		fflush(stdin);

		if (valinta == 1)
		{
			pelilooppi();
		}

		if (valinta == 2)
		{
			highscore();
		}

		if (valinta == 3)
		{
			debugmoodi = true;
			goto alku;
		}

	} while (valinta != 0);

}

//Sis‰lt‰‰ kaikki pelikiertoon kuuluvan
void valikko::pelilooppi()
{
	kentanluonti();
	generoilaivat();

	for (int a = 0; a < 5; a++)
	{
		shipLengths = shipLengths + laivavektori[a].lenght;
	}

	std::cout << "\n\nK‰ynnistet‰‰n peli...\n\n";

	for (int i = 0; i < 5; i++)
	{
		std::cout << "Lataa... Asetetaan laivaa " << i + 1 << std::endl;
		asetalaivat(laivavektori[i].symbol, laivavektori[i].lenght);
	}


	do {
		tulosta();
		arvaus();
		tarkistus();
	} while (gameover == false);

	system("cls");
	highscoretarkastus();
}

//T‰ss‰ metodissa alustetaan kentt‰.piirto taulukon jokaiseen soluun 1. 
void valikko::kentanluonti()
{
	for (int b = 0; b < 10; b++)
	{

		for (int a = 0; a < 10; a++)
		{
			kentta[a][b].piirto = "~ ";
			kentta[a][b].tila = "tyhja";
		}
	}
}

//Tulostetaan kentt‰.piirto taulukko ruudulle.
void valikko::tulosta()
{
	system("cls");
	std::cout << "Kaytetyt ammukset: " << ammutut << "\n\n";
	//std::cout << "K = Highscores" << std::endl << std::endl;

	std::cout << "    A B C D E F G H I J" << std::endl;

		for (int b = 0; b < 10; b++) 
		{

			if (b < 9)
				std::cout << b + 1 << "   ";

			else
				std::cout << b + 1 << "  ";

			for (int a = 0; a < 10; a++) {
				std::cout << kentta[a][b].piirto;
			}
			std::cout << std::endl;
		}
		std::cout << "\n   Merkkien selitykset:\n";

		int koko = laivavektori.size();

		for (int a = 0; a < 5; a++)
		{
			std::cout << "    " << laivavektori[a].symbol << "  ";
			std::cout.width(16);
			std::cout << std::left << laivavektori[a].name;
			std::cout << laivavektori[a].lenght << " ruutua  -  ";
			if (laivavektori[a].destroyed == true)
			{
				std::cout << "tuhottu\n";
			}
			else
			{
				std::cout << laivavektori[a].hits << " osumaa\n";
			}
		}
		
}

//Luodaan 5kpl laivoja, kaikilla omat symbolit ja eri pituus
void valikko::generoilaivat()
{
	laiva lentotukialus = laiva("Lentotukialus", "L ", 5);
	laivavektori.push_back(lentotukialus);

	laiva taistelulaiva = laiva("Tykkilaiva", "T ", 4);
	laivavektori.push_back(taistelulaiva);

	laiva risteilija = laiva("Risteilija", "R ", 3);
	laivavektori.push_back(risteilija);

	laiva havittaja = laiva("Havittaja", "H ", 2);
	laivavektori.push_back(havittaja);

	laiva sukellusvene = laiva("Sukellusvene", "S ", 1);
	laivavektori.push_back(sukellusvene);


	
}

//Asetetaan 5kpl laivoja niin, ett‰ ne eiv‰t voi osua toistensa p‰‰lle
void valikko::asetalaivat(std::string _symbol, int _lenght)
{
	//Varmaan aika oksennuksen n‰kˆst‰ koodia
	alku:
	srand(time(NULL));

	int X_Y_Decider = 0; //P‰‰tt‰‰ laivan suunnan
	X_Y_Decider = rand() % 2; // Nollalla se menee poikittain ja ykkˆsell‰ pystyyn

	int ShipPlaceTop = 0; 
	ShipPlaceTop = rand() % (11 - _lenght); //Alussa m‰‰ritet‰‰n miten kaukana laiva voi olla yl‰rajasta (ettei mene ruudukon yli)
	int ShipPlaceTopA = ShipPlaceTop;

	int ShipPlaceSide = 0;
	ShipPlaceSide = rand() % 10; //Toinen suunta voi olla mit‰ vaan 1-10

	// laiva poikittain
	if (X_Y_Decider == 0) {

		//tarkistus
		for (int ShipLenght = 0; ShipLenght < _lenght; ShipLenght++) {
			if ((kentta[ShipPlaceTop][ShipPlaceSide].tila) != "tyhja") {
				goto alku;
			}
			ShipPlaceTop++;
		}

		//piirto
		for (int ShipLenght = 0; ShipLenght < _lenght; ShipLenght++) {
			kentta[ShipPlaceTopA][ShipPlaceSide].tila = _symbol;
			if (debugmoodi == true)
			{
				kentta[ShipPlaceTopA][ShipPlaceSide].piirto = _symbol;
			}
			ShipPlaceTopA++;
		}
	
	}

	// laiva pystyyn
	else {
		//tarkistus
		for (int ShipLenght = 0; ShipLenght < _lenght; ShipLenght++) {
			if ((kentta[ShipPlaceSide][ShipPlaceTop].tila) != "tyhja") {
				goto alku;
			}
			ShipPlaceTop++;
		}

		//piirto
		for (int ShipLenght = 0; ShipLenght < _lenght; ShipLenght++) {
			kentta[ShipPlaceSide][ShipPlaceTopA].tila = _symbol;
			if (debugmoodi == true)
			{
				kentta[ShipPlaceSide][ShipPlaceTopA].piirto = _symbol;
			}
			
			ShipPlaceTopA++;

		}
	}

}

//tarkistaa onko kaikki laivat tuhottu
void valikko::tarkistus()
{	
	if (shipHits == shipLengths)
	{gameover = true;}
}

//Suoritetaan ammunta ja tarkistetaan mihin se osui
void valikko::arvaus()
{
	guess:
	char answer;
	std::cout << "\nMille pystyriville ammutaan? (A-J)" << std::endl;

	std::cin >> answer;

	int x = (int)answer;
	int a = 0;

	std::cin.clear();
	fflush(stdin);

	switch (x) {
	case 65: a = 0; break;
	case 66: a = 1; break;
	case 67: a = 2; break;
	case 68: a = 3; break;
	case 69: a = 4; break;
	case 70: a = 5; break;
	case 71: a = 6; break;
	case 72: a = 7; break;
	case 73: a = 8; break;
	case 74: a = 9; break;
	case 75: highscore(); tulosta(); goto guess;
	default: std::cout << "Error"; goto guess;
	}

	int b;
	std::cout << "Mille vaakariville ammutaan? (1-10)" << std::endl;

	std::cin >> b;
		b = b - 1;
		
		std::cin.clear();
		fflush(stdin);
		
		//Tarkastaa onko soluun ammuttu.
		if (kentta[a][b].tila == "ammuttu")
		{
			std::cout << "Olet jo ampunut tahan ruutuun" << std::endl;
			goto guess;
		}

		ammutut = ammutut + 1;

		if (kentta[a][b].tila != "tyhja")
		{
			std::cout << "\nOsui\n";

			//Jos osui, piirt‰‰ laivan symbolin karttaan.
			kentta[a][b].piirto = kentta[a][b].tila;
			

			//Vertaa taulukossa olevia symboleita laivavektorin symboleihin ja kirjaa osumat.
			for (int i = 0; i < 5; i++)
			{
				if (laivavektori[i].symbol == kentta[a][b].tila)
				{
					laivavektori[i].hits++;
				}

			}

			
		}

		//Jos ei osu, piirt‰‰ kartalle x:n.
		else
		{	
			std::cout << "Ohi";
			kentta[a][b].piirto = "x ";
		}

		kentta[a][b].tila = "ammuttu";

		shipHits = 0;

		//Tarkistaa onko laiva kokonaan tuhottu.
	for (int i = 0; i < 5; i++)
		{
			shipHits = shipHits + laivavektori[i].hits;

			if (laivavektori[i].destroyed == false && laivavektori[i].hits >= laivavektori[i].lenght)
			{
				laivavektori[i].destroyed = true;
				std::cout << laivavektori[i].name << " tuhottu.\n";
			
			}
		}

	std::cout << "\nJatka painamalla mit‰ tahansa n‰pp‰int‰\n";
	char valinta;
	valinta = _getch();


	}

//Avataan highscores.txt ja tulostetaan konsoliin 
void valikko::highscore()
{
	system("cls");
	std::string name;
	int score;

	std::ifstream myFile;

	myFile.open("highscores.txt");

	std::cout.width(20);
	std::cout << std::left << "Nimi" << "Tulos\n\n";

	//	std::cout.width(16);
	//std::cout << std::left << laivavektori[a].name;
	//std::cout << laivavektori[a].lenght << " ruutua  -  ";

	if (myFile.is_open()) {
		for (int i = 0; i < 5; i++)
		{
			myFile >> name >> score;
			std::cout.width(20);
			std::cout << std::left << name << score << "\n";
		}
	}

	/*if (myFile.is_open()) {*/
	/*	while (!myFile.eof()) {
			myFile >> name >> score;
			std::cout << name << " " << score << "\n";
		}*/

	/*	do {
			myFile >> name >> score;
			std::cout << name << " " << score << "\n";
		} while (!myFile.eof());*/



	myFile.close();

	std::cout << "\nJatka painamalla mit‰ tahansa n‰pp‰int‰\n";
	char valinta;
	valinta = _getch();

}

//Tarkastetaan highscoret ja kirjataan tulos txt-tiedostoon
void valikko::highscoretarkastus()
{
	system("cls");

	//Ota t‰m‰ pois

	std::cout << "Voitit, k‰ytetyt ammukset: " << ammutut << std::endl;

	std::string name;
	int score;

	std::fstream myFile;

	struct solu { std::string _name; int _score; };

	solu taulukko[6];

	/*for (int i = 0; i < 6; i++)
	{
		taulukko[i]._name = "tyhja";
		taulukko[i]._score = 0;
	}*/

	myFile.open("highscores.txt");

	if (myFile.is_open())
	{
		int i = 0;

		//Luetaan nykyinen highscores tiedostosta taulukkoon
		while (!myFile.eof()) {
			myFile >> name >> score;
			taulukko[i]._name = name;
			taulukko[i]._score = score;
			i++;
		}

		//Lis‰t‰‰n t‰m‰n hetkinen peli taulukkoon ja...
		taulukko[5]._score = ammutut;
		std::string hsnimi;

		std::cout << "\n\nSyˆt‰ nimesi: ";

		std::cin >> hsnimi;

		taulukko[5]._name = hsnimi;

		//...J‰rjestet‰‰n taulukko
		std::sort(taulukko, taulukko + 6,
			[](solu const& a, solu const& b) -> bool
			{ return a._score < b._score; });

		int listasijoitus = 6;

		std::cout << "\n\n";

		for (int i = 0; i < 6; i++)
		{
			std::cout << taulukko[i]._name << " - " << taulukko[i]._score << "\n";
			if (taulukko[i]._name == hsnimi)
			{
				listasijoitus = (i + 1);
			}
		}

		if (listasijoitus < 6)
		{
			std::cout << "\n\nP‰‰sit listan sijalle " << listasijoitus << " !\n";
		}

		else
		{
			std::cout << "\n\nEt p‰‰ssyt parhaiden listalle.\n";
		}
		

	};

	myFile.close();

	


	myFile.open("highscores.txt", std::ios::out);
	if (myFile.is_open())
	{
		for (int i = 0; i < 5; i++)
		{
			myFile << taulukko[i]._name
				<< " "
				<< taulukko[i]._score << "\n";
		}
	}

	myFile.close();

	std::cout << "\nJatka painamalla mit‰ tahansa n‰pp‰int‰\n";
	char valinta;
	valinta = _getch();

	

}
