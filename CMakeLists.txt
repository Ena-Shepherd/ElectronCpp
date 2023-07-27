# /*

#  Author: Yannis STEFANELLI

#  Creation Date: 25-07-2023 16:14:19

#  Description :

# */

cmake_minimum_required(VERSION 3.26)

# Executable name
set(PROJECT_NAME app)
project(${PROJECT_NAME} CXX)

# Source files
file(GLOB SOURCES "./src/*.cpp")

## Include directories
include_directories(
    "HTTPLib"
    "Json/single_include"
)

add_compile_options( -lws2_32 )

add_executable(${PROJECT_NAME} ${SOURCES})

target_link_libraries(${PROJECT_NAME} PRIVATE ws2_32)

# Copy executable from build folder to the project 
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy $<TARGET_FILE:${PROJECT_NAME}> ../
)
