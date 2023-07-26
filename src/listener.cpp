#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// C++ function handling received data via the AJAX request
json processRequest(const json& requestData) {
    
    json responseData;

    if (requestData.contains("key") && requestData["key"] == "ping") {
        responseData["message"] = "Pong !";
    }
    
    responseData["data"] = requestData;
    return responseData;
}

// Entry point to receive AJAX requests
json eventListener(const std::string& requestData) {
    try {
        json requestJson = json::parse(requestData);
        return processRequest(requestJson);
    } catch (const std::exception& e) {
        std::cerr << "Error on handling json data : " << e.what() << std::endl;
        json errorResponse;
        errorResponse["error"] = "Error on handling json data";
        return errorResponse;
    }
}
