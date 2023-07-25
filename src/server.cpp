// server.cpp

#include <httplib.h>
#include <iostream>
#include <nlohmann/json.hpp>
#include "listener.h"

using json = nlohmann::json;
using namespace httplib;

int main() {
  Server svr;

  // Endpoint pour recevoir les requêtes AJAX de l'application Electron
  svr.Post("/api/my-cpp-endpoint", [](const Request& req, Response& res) {
    std::cout << "Requête reçue : " << req.body << std::endl;
    json requestData = json::parse(req.body);
    json responseData = myCppFunction(requestData.dump());

    // Set the content type and response data
    res.set_header("Content-Type", "application/json");
    res.set_content(responseData.dump(), "application/json");
  });

  // Port d'écoute du serveur
  const int port = 444;

  // Lancez le serveur
  std::cout << "Serveur C++ démarré sur le port " << port << std::endl;
  svr.listen("localhost", port);

  return 0;
}
