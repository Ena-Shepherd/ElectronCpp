// server.cpp

#include <httplib.h>
#include <iostream>
#include <nlohmann/json.hpp>
#include "listener.h"
#include <fstream>
#include <sstream>
#include <filesystem>
#include <map>

std::map<std::string, std::string> loadEnvFile(const std::string &filename) {
  std::map<std::string, std::string> env;
  std::ifstream file(filename);
  std::string line;
  while (std::getline(file, line)) {
    std::istringstream iss(line);
    std::string key, value;
    if (std::getline(iss, key, '=') && std::getline(iss, value))
      env[key] = value;
    else
      std::cerr << "Error reading line: " << line << std::endl;
  }

  return env;
}

using json = nlohmann::json;
using namespace httplib;

int main() {
  Server svr;

  // Endpoint pour recevoir les requêtes AJAX de l'application Electron
  svr.Post("/api/my-cpp-endpoint", [](const Request& req, Response& res) {
    std::cout << "Requête reçue : " << req.body << std::endl;
    json requestData = json::parse(req.body);
    json responseData = eventListener(requestData.dump());

    // Set the content type and response data
    res.set_header("Content-Type", "application/json");
    res.set_content(responseData.dump(), "application/json");
  });

  std::string currentDir = std::filesystem::current_path().string();
  std::string envFilePath = currentDir + "/.env";
  
  // Port d'écoute du serveur
  auto env = loadEnvFile(envFilePath);
  const int port = std::stoi(env["PORT"]);

  // Lancez le serveur
  std::cout << "Serveur C++ démarré sur le port " << port << std::endl;
  svr.listen("localhost", port);

  return 0;
}