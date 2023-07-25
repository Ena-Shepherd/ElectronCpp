#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

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
