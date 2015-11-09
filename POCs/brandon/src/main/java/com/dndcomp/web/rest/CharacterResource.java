package com.dndcomp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dndcomp.domain.Character;
import com.dndcomp.repository.CharacterRepository;
import com.dndcomp.web.rest.util.HeaderUtil;
import com.dndcomp.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Character.
 */
@RestController
@RequestMapping("/api")
public class CharacterResource {

    private final Logger log = LoggerFactory.getLogger(CharacterResource.class);

    @Inject
    private CharacterRepository characterRepository;

    /**
     * POST  /characters -> Create a new character.
     */
    @RequestMapping(value = "/characters",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Character> createCharacter(@RequestBody Character character) throws URISyntaxException {
        log.debug("REST request to save Character : {}", character);
        if (character.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new character cannot already have an ID").body(null);
        }
        Character result = characterRepository.save(character);
        return ResponseEntity.created(new URI("/api/characters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("character", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /characters -> Updates an existing character.
     */
    @RequestMapping(value = "/characters",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Character> updateCharacter(@RequestBody Character character) throws URISyntaxException {
        log.debug("REST request to update Character : {}", character);
        if (character.getId() == null) {
            return createCharacter(character);
        }
        Character result = characterRepository.save(character);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("character", character.getId().toString()))
            .body(result);
    }

    /**
     * GET  /characters -> get all the characters.
     */
    @RequestMapping(value = "/characters",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Character>> getAllCharacters(Pageable pageable)
        throws URISyntaxException {
        Page<Character> page = characterRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/characters");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /characters/:id -> get the "id" character.
     */
    @RequestMapping(value = "/characters/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Character> getCharacter(@PathVariable String id) {
        log.debug("REST request to get Character : {}", id);
        return Optional.ofNullable(characterRepository.findOne(id))
            .map(character -> new ResponseEntity<>(
                character,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /characters/:id -> delete the "id" character.
     */
    @RequestMapping(value = "/characters/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        log.debug("REST request to delete Character : {}", id);
        characterRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("character", id.toString())).build();
    }
}
