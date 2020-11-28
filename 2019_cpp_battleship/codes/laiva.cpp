#include "laiva.h"
#include <iostream>

laiva::laiva(std::string _name, std::string _symbol, int _lenght)
{
	name = _name;
	destroyed = false;
	symbol = _symbol;
	hits = 0;
	lenght = _lenght;
}

laiva::~laiva()
{
}

