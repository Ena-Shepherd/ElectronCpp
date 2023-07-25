/*

 Author: Yannis STEFANELLI

 Creation Date: 24-07-2023 15:50:48

 Description :

*/

#pragma once
#include <httplib.h>
#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

json eventListener(const std::string& requestData);
