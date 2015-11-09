package com.dndcomp.repository;

import com.dndcomp.domain.Character;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Character entity.
 */
public interface CharacterRepository extends MongoRepository<Character,String> {

}
