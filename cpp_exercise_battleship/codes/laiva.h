#pragma once
#include <string>


class laiva
{
public:
	int lenght;
	std::string symbol;
	std::string name;
	bool destroyed;
	int hits;

	laiva(std::string _name, std::string _symbol, int _lenght);
	~laiva();
};