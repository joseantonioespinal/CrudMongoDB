/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.trabajoFinal.ApiCrud.repository;

import com.trabajoFinal.ApiCrud.model.Persona;
import org.springframework.data.mongodb.repository.MongoRepository;

// Repositorio para MongoDB
public interface PersonaRepository extends MongoRepository<Persona, String> {

    // Métodos CRUD ya incluidos:
    // - save()
    // - findById()
    // - findAll()
    // - deleteById()

    // Ejemplo opcional:
    // List<Persona> findByNombre(String nombre);
}