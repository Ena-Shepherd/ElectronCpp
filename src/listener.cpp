#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Fonction C++ pour traiter les données reçues via la requête AJAX
json processRequest(const json& requestData) {
    
    json responseData;

    if (requestData.contains("key") && requestData["key"] == "ping") {
        responseData["message"] = "Pong !";
    }
    
    responseData["data"] = requestData;
    return responseData;
}

// Point d'entrée pour recevoir les requêtes AJAX
json eventListener(const std::string& requestData) {
    try {
        json requestJson = json::parse(requestData);
        return processRequest(requestJson);
    } catch (const std::exception& e) {
        std::cerr << "Erreur lors du traitement des données JSON : " << e.what() << std::endl;
        json errorResponse;
        errorResponse["error"] = "Erreur lors du traitement des données JSON";
        return errorResponse;
    }
}
