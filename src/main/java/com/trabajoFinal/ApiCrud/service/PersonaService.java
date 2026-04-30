
package com.trabajoFinal.ApiCrud.service;

import com.trabajoFinal.ApiCrud.model.Persona;
import com.trabajoFinal.ApiCrud.repository.PersonaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public List<Persona> listarTodas() {
        return personaRepository.findAll();
    }

    public Persona guardar(Persona persona) {
        if (persona.getId() != null && persona.getId().trim().isEmpty()) {
            persona.setId(null);
        }
        return personaRepository.save(persona);
    }

    public Persona obtenerPorId(String id) {
        return personaRepository.findById(id).orElse(null);
    }

    public void eliminar(String id) {
        personaRepository.deleteById(id);
    }
}